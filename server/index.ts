import Fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import { randomUUID } from 'node:crypto'
import { DatabaseSync } from 'node:sqlite'
import { createReadStream, createWriteStream, existsSync, mkdirSync, unlinkSync } from 'node:fs'
import { basename, dirname, extname, join, resolve } from 'node:path'
import { pipeline } from 'node:stream/promises'
import { fileURLToPath } from 'node:url'
import { createHouseholdAuth } from './auth.js'

interface SyncPayload {
  state: unknown
  expectedRevision: number
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dataDirectory = process.env.SAVOR_DATA_DIR
  ? resolve(process.env.SAVOR_DATA_DIR)
  : join(root, 'data')
mkdirSync(dataDirectory, { recursive: true })
const inboxDirectory = join(dataDirectory, 'inbox')
mkdirSync(inboxDirectory, { recursive: true })

const database = new DatabaseSync(join(dataDirectory, 'savor.sqlite'))
database.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS household_state (
    household_id TEXT PRIMARY KEY,
    payload TEXT NOT NULL,
    revision INTEGER NOT NULL,
    updated_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS inbox_entries (
    id TEXT PRIMARY KEY,
    kind TEXT NOT NULL,
    title TEXT NOT NULL,
    note TEXT NOT NULL,
    url TEXT NOT NULL,
    file_name TEXT,
    stored_name TEXT,
    mime_type TEXT,
    size INTEGER,
    created_at TEXT NOT NULL
  );
`)

const readStatement = database.prepare(
  'SELECT payload, revision, updated_at FROM household_state WHERE household_id = ?'
)
const insertStatement = database.prepare(
  'INSERT INTO household_state (household_id, payload, revision, updated_at) VALUES (?, ?, 1, ?)'
)
const updateStatement = database.prepare(
  'UPDATE household_state SET payload = ?, revision = revision + 1, updated_at = ? WHERE household_id = ? AND revision = ?'
)
const listInboxStatement = database.prepare(
  `SELECT id, kind, title, note, url, file_name, mime_type, size, created_at
   FROM inbox_entries ORDER BY created_at DESC`
)
const readInboxFileStatement = database.prepare(
  'SELECT file_name, stored_name, mime_type FROM inbox_entries WHERE id = ?'
)
const insertInboxStatement = database.prepare(
  `INSERT INTO inbox_entries
   (id, kind, title, note, url, file_name, stored_name, mime_type, size, created_at)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
)
const deleteInboxStatement = database.prepare(
  'DELETE FROM inbox_entries WHERE id = ?'
)

function readState() {
  const row = readStatement.get('default') as { payload: string; revision: number; updated_at: string } | undefined
  if (!row) return null
  return { state: JSON.parse(row.payload), revision: row.revision, updatedAt: row.updated_at }
}

function isAppState(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== 'object') return false
  const state = value as Record<string, unknown>
  return Array.isArray(state.recipes) && Array.isArray(state.plan) &&
    Array.isArray(state.shoppingList) && typeof state.weekStart === 'string' &&
    typeof state.updatedAt === 'string'
}

const app = Fastify({ logger: true, bodyLimit: 2_000_000 })
await app.register(fastifyCookie)
await app.register(fastifyMultipart, {
  limits: { files: 1, fields: 8, fileSize: 15 * 1024 * 1024 }
})
const auth = createHouseholdAuth()

app.get('/api/health', async () => ({ ok: true }))

app.get('/api/auth/status', async (request) => ({
  enabled: auth.enabled,
  authenticated: auth.authenticated(request)
}))

app.post<{ Body: { password?: string } }>('/api/auth/login', async (request, reply) => {
  if (!auth.enabled) return { authenticated: true }
  if (!auth.login(request.body?.password ?? '', reply)) {
    return reply.code(401).send({ error: 'That is not the pack password. Try another secret woof.' })
  }
  return { authenticated: true }
})

app.post('/api/auth/logout', async (_request, reply) => {
  auth.logout(reply)
  return { authenticated: false }
})

app.addHook('preHandler', async (request, reply) => {
  if ((request.url.startsWith('/api/state') || request.url.startsWith('/api/inbox')) && !auth.authenticated(request)) {
    return reply.code(401).send({ error: 'Ginny needs the pack password first.' })
  }
})

app.get('/api/state', async (_request, reply) => {
  const current = readState()
  if (!current) return reply.code(404).send({ error: 'Ginny has not fetched a synchronized plan yet.' })
  return current
})

app.put<{ Body: SyncPayload }>('/api/state', async (request, reply) => {
  const { state, expectedRevision } = request.body ?? {}
  if (!isAppState(state) || !Number.isInteger(expectedRevision) || expectedRevision < 0) {
    return reply.code(400).send({ error: 'Ginny could not make sense of that synchronization payload.' })
  }

  const current = readState()
  if (!current) {
    if (expectedRevision !== 0) return reply.code(409).send({ error: 'Revision conflict.', current: null })
    insertStatement.run('default', JSON.stringify(state), state.updatedAt as string)
    return reply.code(201).send(readState())
  }

  if (current.revision !== expectedRevision) {
    return reply.code(409).send({ error: 'Revision conflict.', current })
  }

  const result = updateStatement.run(JSON.stringify(state), state.updatedAt as string, 'default', expectedRevision)
  if (result.changes !== 1) return reply.code(409).send({ error: 'Revision conflict.', current: readState() })
  return readState()
})

function presentInboxEntry(row: Record<string, unknown>) {
  return {
    id: row.id,
    kind: row.kind,
    title: row.title,
    note: row.note,
    url: row.url,
    fileName: row.file_name,
    mimeType: row.mime_type,
    size: row.size,
    createdAt: row.created_at
  }
}

app.get('/api/inbox', async () =>
  (listInboxStatement.all() as Record<string, unknown>[]).map(presentInboxEntry)
)

app.post('/api/inbox', async (request, reply) => {
  const fields: Record<string, string> = {}
  const id = randomUUID()
  let upload: { fileName: string; storedName: string; mimeType: string; size: number } | null = null

  try {
    for await (const part of request.parts()) {
      if (part.type === 'field') {
        fields[part.fieldname] = String(part.value).trim()
        continue
      }

      const extension = extname(part.filename).slice(0, 12)
      const storedName = `${id}${extension}`
      const target = join(inboxDirectory, storedName)
      await pipeline(part.file, createWriteStream(target, { flags: 'wx' }))
      if (part.file.truncated) {
        unlinkSync(target)
        return reply.code(413).send({ error: 'That treasure is too heavy. Ginny can carry files up to 15 MB.' })
      }
      upload = {
        fileName: basename(part.filename).slice(0, 240),
        storedName,
        mimeType: part.mimetype || 'application/octet-stream',
        size: part.file.bytesRead
      }
    }

    const kind = ['recipe', 'photo', 'idea', 'other'].includes(fields.kind) ? fields.kind : 'other'
    const title = (fields.title || upload?.fileName || '').slice(0, 160)
    const note = (fields.note || '').slice(0, 10_000)
    const url = (fields.url || '').slice(0, 2_000)
    if (!title && !note && !url && !upload) {
      return reply.code(400).send({ error: 'Give Ginny something to carry: a title, note, link, or file.' })
    }

    const createdAt = new Date().toISOString()
    insertInboxStatement.run(
      id, kind, title, note, url,
      upload?.fileName ?? null, upload?.storedName ?? null,
      upload?.mimeType ?? null, upload?.size ?? null, createdAt
    )
    const created = (listInboxStatement.all() as Record<string, unknown>[]).find((row) => row.id === id)
    return reply.code(201).send(presentInboxEntry(created!))
  } catch (error) {
    if (upload?.storedName) {
      try { unlinkSync(join(inboxDirectory, upload.storedName)) } catch { /* already absent */ }
    }
    request.log.error(error)
    return reply.code(400).send({ error: 'Ginny dropped that item before it reached the box.' })
  }
})

app.get<{ Params: { id: string } }>('/api/inbox/:id/file', async (request, reply) => {
  const row = readInboxFileStatement.get(request.params.id) as { file_name: string; stored_name: string; mime_type: string } | undefined
  if (!row?.stored_name) return reply.code(404).send({ error: 'Ginny could not sniff out that file.' })
  const path = join(inboxDirectory, row.stored_name)
  if (!existsSync(path)) return reply.code(404).send({ error: 'Ginny could not sniff out that file.' })
  const encodedName = encodeURIComponent(row.file_name).replace(/'/g, '%27')
  reply.header('Content-Disposition', `inline; filename*=UTF-8''${encodedName}`)
  reply.type(row.mime_type || 'application/octet-stream')
  return reply.send(createReadStream(path))
})

app.delete<{ Params: { id: string } }>('/api/inbox/:id', async (request, reply) => {
  const row = readInboxFileStatement.get(request.params.id) as { stored_name: string | null } | undefined
  if (!row) return reply.code(404).send({ error: 'That treasure is no longer in Ginny’s drop box.' })
  deleteInboxStatement.run(request.params.id)
  if (row.stored_name) {
    try { unlinkSync(join(inboxDirectory, row.stored_name)) } catch { /* metadata is already removed */ }
  }
  return reply.code(204).send()
})

const webRoot = join(root, 'dist')
if (existsSync(webRoot)) {
  await app.register(fastifyStatic, { root: webRoot })
  app.setNotFoundHandler((request, reply) => {
    if (request.raw.url?.startsWith('/api/')) return reply.code(404).send({ error: 'Not found.' })
    return reply.sendFile('index.html')
  })
}

const port = Number(process.env.PORT ?? 4173)
await app.listen({ host: process.env.HOST ?? '0.0.0.0', port })

async function close() {
  await app.close()
  database.close()
  process.exit(0)
}
process.on('SIGINT', close)
process.on('SIGTERM', close)
