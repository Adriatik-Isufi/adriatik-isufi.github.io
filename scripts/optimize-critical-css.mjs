import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Critters from 'critters'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const outDir = path.join(root, 'out')

async function htmlFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const absolute = path.join(directory, entry.name)
      if (entry.isDirectory()) return htmlFiles(absolute)
      return entry.name.endsWith('.html') ? [absolute] : []
    }),
  )
  return nested.flat()
}

async function main() {
  const mediaDir = path.join(outDir, '_next', 'static', 'media')
  const latinFont = (await fs.readdir(mediaDir)).find((file) => file.endsWith('-s.p.woff2'))
  const fontPreload = latinFont
    ? `<link rel="preload" as="font" href="/_next/static/media/${latinFont}" type="font/woff2" crossorigin>`
    : ''

  const optimizer = new Critters({
    path: outDir,
    publicPath: '/',
    preload: 'swap',
    pruneSource: false,
    compress: true,
    logLevel: 'warn',
  })

  const files = await htmlFiles(outDir)
  await Promise.all(
    files.map(async (file) => {
      const html = await fs.readFile(file, 'utf8')
      let optimized = await optimizer.process(html)
      if (fontPreload && !optimized.includes(`/_next/static/media/${latinFont}`)) {
        // Put the preload first: the inlined critical CSS is intentionally
        // sizeable, so appending this at the end of <head> discovers it late.
        optimized = optimized.replace('<head>', `<head>${fontPreload}`)
      }
      await fs.writeFile(file, optimized)
    }),
  )

  console.log(`[optimize-critical-css] optimized ${files.length} exported HTML files`)
}

main().catch((error) => {
  console.error('[optimize-critical-css] failed:', error)
  process.exit(1)
})
