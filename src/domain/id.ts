/**
 * Creates a collision-resistant local identifier without requiring a secure
 * browser context. `crypto.randomUUID` is unavailable when the app is opened
 * from a phone over plain HTTP, which is a supported deployment mode.
 */
export function createId(): string {
  const webCrypto = globalThis.crypto
  if (typeof webCrypto?.randomUUID === 'function') return webCrypto.randomUUID()

  const bytes = new Uint8Array(16)
  if (typeof webCrypto?.getRandomValues === 'function') {
    webCrypto.getRandomValues(bytes)
  } else {
    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = Math.floor(Math.random() * 256)
    }
  }

  // Mark the fallback as an RFC 4122 version 4 UUID.
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const value = [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('')
  return `${value.slice(0, 8)}-${value.slice(8, 12)}-${value.slice(12, 16)}-${value.slice(16, 20)}-${value.slice(20)}`
}
