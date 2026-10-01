export interface AuthStatus {
  enabled: boolean
  authenticated: boolean
}

export async function getAuthStatus(): Promise<AuthStatus> {
  const response = await fetch('/api/auth/status', { headers: { accept: 'application/json' } })
  if (!response.ok) throw new Error('Ginny cannot reach the home server.')
  return response.json() as Promise<AuthStatus>
}

export async function login(password: string): Promise<void> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ password })
  })
  if (!response.ok) {
    const body = await response.json().catch(() => ({})) as { error?: string }
    throw new Error(body.error ?? 'Ginny could not open the doggy door.')
  }
}

export async function logout(): Promise<void> {
  await fetch('/api/auth/logout', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: '{}'
  })
}
