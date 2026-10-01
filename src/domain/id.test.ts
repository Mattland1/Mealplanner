import { afterEach, describe, expect, it, vi } from 'vitest'
import { createId } from './id'

afterEach(() => vi.unstubAllGlobals())

describe('createId', () => {
  it('uses randomUUID when the browser provides it', () => {
    vi.stubGlobal('crypto', { randomUUID: () => 'native-id' })
    expect(createId()).toBe('native-id')
  })

  it('creates a UUID when randomUUID is unavailable on plain HTTP', () => {
    vi.stubGlobal('crypto', {})
    expect(createId()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
  })
})
