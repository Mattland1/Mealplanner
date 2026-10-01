import type { InboxItem, InboxKind } from '../domain/model'

export interface InboxSubmission {
  kind: InboxKind
  title: string
  note: string
  url: string
  file?: File
}

async function errorMessage(response: Response): Promise<string> {
  const body = await response.json().catch(() => ({})) as { error?: string }
  return body.error ?? `The inbox request failed with status ${response.status}.`
}

export async function loadInbox(): Promise<InboxItem[]> {
  const response = await fetch('/api/inbox', { headers: { accept: 'application/json' } })
  if (!response.ok) throw new Error(await errorMessage(response))
  return response.json() as Promise<InboxItem[]>
}

export async function submitInboxItem(submission: InboxSubmission): Promise<InboxItem> {
  const body = new FormData()
  body.set('kind', submission.kind)
  body.set('title', submission.title)
  body.set('note', submission.note)
  body.set('url', submission.url)
  if (submission.file) body.set('file', submission.file)

  const response = await fetch('/api/inbox', { method: 'POST', body })
  if (!response.ok) throw new Error(await errorMessage(response))
  return response.json() as Promise<InboxItem>
}

export async function deleteInboxItem(id: string): Promise<void> {
  const response = await fetch(`/api/inbox/${encodeURIComponent(id)}`, { method: 'DELETE' })
  if (!response.ok) throw new Error(await errorMessage(response))
}

export function inboxFileUrl(id: string): string {
  return `/api/inbox/${encodeURIComponent(id)}/file`
}
