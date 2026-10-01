import type { AppState } from '../domain/model'
import { migrateRecipeCatalog } from './seed'

interface RemoteState {
  state: AppState
  revision: number
  updatedAt: string
}

export interface SyncResult {
  state: AppState
  source: 'local' | 'remote'
  revision: number
}

async function readRemote(): Promise<RemoteState | null> {
  const response = await fetch('/api/state', { headers: { accept: 'application/json' } })
  if (response.status === 404) return null
  if (!response.ok) throw new Error(`Sync failed with status ${response.status}`)
  return response.json() as Promise<RemoteState>
}

async function writeRemote(state: AppState, expectedRevision: number): Promise<Response> {
  return fetch('/api/state', {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ state, expectedRevision })
  })
}

export async function synchronizeState(local: AppState): Promise<SyncResult> {
  local = migrateRecipeCatalog(local)
  let remote = await readRemote()
  if (remote) remote = { ...remote, state: migrateRecipeCatalog(remote.state) }
  if (!remote) {
    const response = await writeRemote(local, 0)
    if (!response.ok) throw new Error(`Initial sync failed with status ${response.status}`)
    remote = await response.json() as RemoteState
    return { state: local, source: 'local', revision: remote.revision }
  }

  if (Date.parse(remote.state.updatedAt) > Date.parse(local.updatedAt)) {
    return { state: remote.state, source: 'remote', revision: remote.revision }
  }

  const response = await writeRemote(local, remote.revision)
  if (response.ok) {
    const saved = await response.json() as RemoteState
    return { state: local, source: 'local', revision: saved.revision }
  }

  if (response.status !== 409) throw new Error(`Sync failed with status ${response.status}`)
  remote = await readRemote()
  if (!remote) throw new Error('The synchronized state disappeared during conflict resolution.')
  remote = { ...remote, state: migrateRecipeCatalog(remote.state) }

  if (Date.parse(local.updatedAt) > Date.parse(remote.state.updatedAt)) {
    const retry = await writeRemote(local, remote.revision)
    if (!retry.ok) throw new Error('Could not resolve a synchronization conflict.')
    const saved = await retry.json() as RemoteState
    return { state: local, source: 'local', revision: saved.revision }
  }
  return { state: remote.state, source: 'remote', revision: remote.revision }
}
