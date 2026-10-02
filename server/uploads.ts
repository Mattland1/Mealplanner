import { readFile } from 'node:fs/promises'

export interface SafeUploadType {
  extension: string
  mimeType: string
}

function startsWith(bytes: Buffer, signature: number[]): boolean {
  return signature.every((value, index) => bytes[index] === value)
}

function isUtf8Text(bytes: Buffer): boolean {
  if (bytes.includes(0)) return false
  try {
    new TextDecoder('utf-8', { fatal: true }).decode(bytes)
    return true
  } catch {
    return false
  }
}

export async function inspectUpload(path: string, originalName: string): Promise<SafeUploadType | null> {
  const bytes = await readFile(path)
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) return { extension: '.jpg', mimeType: 'image/jpeg' }
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return { extension: '.png', mimeType: 'image/png' }
  if (bytes.subarray(0, 6).toString('ascii') === 'GIF87a' || bytes.subarray(0, 6).toString('ascii') === 'GIF89a') {
    return { extension: '.gif', mimeType: 'image/gif' }
  }
  if (bytes.subarray(0, 4).toString('ascii') === 'RIFF' && bytes.subarray(8, 12).toString('ascii') === 'WEBP') {
    return { extension: '.webp', mimeType: 'image/webp' }
  }
  if (bytes.subarray(0, 2).toString('ascii') === 'BM') return { extension: '.bmp', mimeType: 'image/bmp' }
  if (bytes.subarray(4, 8).toString('ascii') === 'ftyp') {
    const brand = bytes.subarray(8, 12).toString('ascii')
    if (['heic', 'heix', 'hevc', 'hevx', 'mif1'].includes(brand)) {
      return { extension: '.heic', mimeType: 'image/heic' }
    }
  }
  if (bytes.subarray(0, 5).toString('ascii') === '%PDF-') {
    return { extension: '.pdf', mimeType: 'application/pdf' }
  }

  const lowerName = originalName.toLowerCase()
  if ((lowerName.endsWith('.txt') || lowerName.endsWith('.md')) && isUtf8Text(bytes)) {
    return {
      extension: lowerName.endsWith('.md') ? '.md' : '.txt',
      mimeType: 'text/plain; charset=utf-8'
    }
  }
  return null
}
