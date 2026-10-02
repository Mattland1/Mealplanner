import type { FastifyReply, FastifyRequest } from 'fastify'

interface RateLimitEntry {
  count: number
  resetAt: number
}

const entries = new Map<string, RateLimitEntry>()
const MAX_TRACKED_CLIENTS = 10_000

function pruneExpired(now: number) {
  if (entries.size < MAX_TRACKED_CLIENTS) return
  for (const [key, entry] of entries) {
    if (entry.resetAt <= now) entries.delete(key)
  }
  if (entries.size >= MAX_TRACKED_CLIENTS) entries.clear()
}

export function enforceRateLimit(
  request: FastifyRequest,
  reply: FastifyReply,
  scope: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now()
  pruneExpired(now)
  const key = `${scope}:${request.ip}`
  const current = entries.get(key)
  const entry = !current || current.resetAt <= now
    ? { count: 1, resetAt: now + windowMs }
    : { ...current, count: current.count + 1 }
  entries.set(key, entry)

  reply.header('RateLimit-Limit', String(limit))
  reply.header('RateLimit-Remaining', String(Math.max(0, limit - entry.count)))
  reply.header('RateLimit-Reset', String(Math.ceil(entry.resetAt / 1000)))
  if (entry.count <= limit) return true

  reply.header('Retry-After', String(Math.max(1, Math.ceil((entry.resetAt - now) / 1000))))
  reply.code(429).send({ error: 'Too many requests. Give Ginny a moment to catch her breath.' })
  return false
}
