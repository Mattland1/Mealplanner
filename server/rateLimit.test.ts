import { describe, expect, it, vi } from 'vitest'
import { enforceRateLimit } from './rateLimit'

describe('enforceRateLimit', () => {
  it('rejects requests over the per-client limit', () => {
    const request = { ip: `test-${crypto.randomUUID()}` }
    const reply = {
      header: vi.fn().mockReturnThis(),
      code: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis()
    }
    expect(enforceRateLimit(request as never, reply as never, 'test', 1, 60_000)).toBe(true)
    expect(enforceRateLimit(request as never, reply as never, 'test', 1, 60_000)).toBe(false)
    expect(reply.code).toHaveBeenCalledWith(429)
  })
})
