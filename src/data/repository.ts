import type { AppState } from '../domain/model'
import { initialState, migrateRecipeCatalog } from './seed'

const DB_NAME = 'savor-meal-planner'
const STORE = 'app-state'
const KEY = 'current'

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = () => request.result.createObjectStore(STORE)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function loadState(): Promise<AppState> {
  const db = await openDatabase()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE, 'readonly')
    const request = transaction.objectStore(STORE).get(KEY)
    request.onsuccess = () => resolve(migrateRecipeCatalog(request.result ?? structuredClone(initialState)))
    request.onerror = () => reject(request.error)
  })
}

export async function saveState(state: AppState): Promise<void> {
  const db = await openDatabase()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE, 'readwrite')
    transaction.objectStore(STORE).put(state, KEY)
    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error)
  })
}

export function exportState(state: AppState): void {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `savor-backup-${new Date().toISOString().slice(0, 10)}.json`
  link.click()
  URL.revokeObjectURL(link.href)
}

export async function importState(file: File): Promise<AppState> {
  const parsed = JSON.parse(await file.text()) as AppState
  if (!Array.isArray(parsed.recipes) || !Array.isArray(parsed.plan) || !Array.isArray(parsed.shoppingList)) {
    throw new Error('Ginny sniffed this file, but it does not look like a meal-planner backup.')
  }
  return migrateRecipeCatalog(parsed)
}
