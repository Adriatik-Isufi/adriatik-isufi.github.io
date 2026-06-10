// Generates web-friendly versions of the success-story images and the OG share image.
// Runs automatically before `next build` (see the "build" script in package.json),
// so new full-size photos dropped into public/Success are optimized on every deploy.
//
// Outputs (git-ignored, regenerated at build time):
//   public/optimized/thumbs/<name>.webp  – 160px square, for the story circles
//   public/optimized/stories/<name>.webp – max 1080px wide, for the fullscreen viewer
//   public/og-image.jpg                  – 1200x630 social share image

import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const publicDir = path.join(root, 'public')
const thumbsDir = path.join(publicDir, 'optimized', 'thumbs')
const storiesDir = path.join(publicDir, 'optimized', 'stories')

async function isUpToDate(src, out) {
  try {
    const [srcStat, outStat] = await Promise.all([fs.stat(src), fs.stat(out)])
    return outStat.mtimeMs >= srcStat.mtimeMs
  } catch {
    return false
  }
}

async function optimizeStoryImage(src) {
  const name = path.basename(src).replace(/\.(jpe?g|png|webp)$/i, '.webp')
  const thumbOut = path.join(thumbsDir, name)
  const storyOut = path.join(storiesDir, name)
  let done = 0

  if (!(await isUpToDate(src, thumbOut))) {
    await sharp(src)
      .resize(160, 160, { fit: 'cover', position: 'attention' })
      .webp({ quality: 70 })
      .toFile(thumbOut)
    done++
  }
  if (!(await isUpToDate(src, storyOut))) {
    await sharp(src)
      .resize({ width: 1080, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(storyOut)
    done++
  }
  return done
}

async function main() {
  await fs.mkdir(thumbsDir, { recursive: true })
  await fs.mkdir(storiesDir, { recursive: true })

  // All images referenced in data/stories.json (covers /Success plus one-offs like /partnership.webp)
  const storiesJson = JSON.parse(await fs.readFile(path.join(root, 'data', 'stories.json'), 'utf8'))
  const sources = [...new Set(storiesJson.stories.map((s) => s.image).filter(Boolean))]

  let generated = 0
  let missing = 0
  for (const rel of sources) {
    const src = path.join(publicDir, rel.replace(/^\//, ''))
    try {
      await fs.access(src)
    } catch {
      console.warn(`[optimize-images] WARNING: ${rel} referenced in stories.json but not found`)
      missing++
      continue
    }
    generated += await optimizeStoryImage(src)
  }

  // OG share image (1200x630) from the hero photo
  const ogSrc = path.join(publicDir, 'hero-new-bg.jpeg')
  const ogOut = path.join(publicDir, 'og-image.jpg')
  if (!(await isUpToDate(ogSrc, ogOut))) {
    await sharp(ogSrc)
      .resize(1200, 630, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 82 })
      .toFile(ogOut)
    generated++
  }

  console.log(
    `[optimize-images] ${sources.length} story images checked, ${generated} files (re)generated` +
      (missing ? `, ${missing} MISSING` : '')
  )
}

main().catch((err) => {
  console.error('[optimize-images] failed:', err)
  process.exit(1)
})
