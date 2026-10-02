import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { inspectUpload } from './uploads'

describe('inspectUpload', () => {
  it('accepts UTF-8 text with a text extension', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'savor-upload-'))
    try {
      const path = join(directory, 'upload')
      await writeFile(path, 'A safe household note.\n')
      await expect(inspectUpload(path, 'note.txt')).resolves.toEqual({
        extension: '.txt', mimeType: 'text/plain; charset=utf-8'
      })
    } finally {
      await rm(directory, { recursive: true, force: true })
    }
  })

  it('rejects active SVG content even when the sender calls it an image', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'savor-upload-'))
    try {
      const path = join(directory, 'upload')
      await writeFile(path, '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>')
      await expect(inspectUpload(path, 'photo.png')).resolves.toBeNull()
    } finally {
      await rm(directory, { recursive: true, force: true })
    }
  })
})
