/**
 * Visual proof that the announcement popup never crops the flyer.
 * Generates marked images (portrait / landscape / square / wide / tall),
 * opens them in the same CSS the popup uses, screenshots at phone + desktop.
 *
 *   node scripts/announcement-fit-test/run.mjs
 */
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import puppeteer from 'puppeteer-core'

const root = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(root, 'out')
const chrome =
  process.env.CHROME_PATH ||
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

const FIXTURES = [
  { id: 'portrait', w: 724, h: 1024, fill: '#0b3d91', note: 'VKU-like 3:4' },
  { id: 'landscape', w: 1920, h: 1080, fill: '#0f766e', note: '16:9 banner' },
  { id: 'square', w: 1000, h: 1000, fill: '#7c2d12', note: '1:1' },
  { id: 'wide', w: 2000, h: 400, fill: '#6b21a8', note: '5:1 ultra-wide' },
  { id: 'tall', w: 400, h: 2000, fill: '#9a3412', note: '1:5 ultra-tall' },
  { id: 'real-vku', file: path.join(root, '../../public/announcements/VKU-26-27-August-2026.webp'), note: 'real August flyer' },
]

const VIEWPORTS = [
  { id: 'phone', w: 390, h: 844 },
  { id: 'desktop', w: 1440, h: 900 },
]

function markerSvg(w, h, fill, label) {
  const fs = Math.max(22, Math.round(Math.min(w, h) * 0.045))
  const pad = Math.max(28, Math.round(fs * 1.4))
  return Buffer.from(`
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${fill}"/>
  <rect x="10" y="10" width="${w - 20}" height="${h - 20}" fill="none" stroke="#fff" stroke-width="10"/>
  <rect x="24" y="24" width="${w - 48}" height="${h - 48}" fill="none" stroke="#facc15" stroke-width="4" stroke-dasharray="12 8"/>
  <text x="${w / 2}" y="${pad}" text-anchor="middle" font-size="${fs}" font-family="Arial Black, Arial" fill="#fff">TOP</text>
  <text x="${w / 2}" y="${h - pad + fs * 0.35}" text-anchor="middle" font-size="${fs}" font-family="Arial Black, Arial" fill="#fff">BOTTOM</text>
  <text x="${pad}" y="${h / 2}" text-anchor="middle" font-size="${fs}" font-family="Arial Black, Arial" fill="#fff" transform="rotate(-90 ${pad} ${h / 2})">LEFT</text>
  <text x="${w - pad}" y="${h / 2}" text-anchor="middle" font-size="${fs}" font-family="Arial Black, Arial" fill="#fff" transform="rotate(90 ${w - pad} ${h / 2})">RIGHT</text>
  <text x="36" y="48" font-size="${Math.round(fs * 0.7)}" font-family="Arial" fill="#facc15">TL</text>
  <text x="${w - 36}" y="48" text-anchor="end" font-size="${Math.round(fs * 0.7)}" font-family="Arial" fill="#facc15">TR</text>
  <text x="36" y="${h - 28}" font-size="${Math.round(fs * 0.7)}" font-family="Arial" fill="#facc15">BL</text>
  <text x="${w - 36}" y="${h - 28}" text-anchor="end" font-size="${Math.round(fs * 0.7)}" font-family="Arial" fill="#facc15">BR</text>
  <text x="${w / 2}" y="${h / 2 - 8}" text-anchor="middle" font-size="${Math.round(fs * 1.2)}" font-family="Arial Black, Arial" fill="#fff">${label}</text>
  <text x="${w / 2}" y="${h / 2 + fs}" text-anchor="middle" font-size="${Math.round(fs * 0.7)}" font-family="Arial" fill="#facc15">${w}×${h} — if you cannot read TOP/BOTTOM/LEFT/RIGHT, it cropped</text>
</svg>`)
}

function pageHtml(src, caption) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${caption}</title>
<style>
  html, body { margin: 0; height: 100%; background: #111; }
  .overlay {
    position: fixed; inset: 0;
    display: flex; align-items: center; justify-content: center;
    padding: 1rem;
    background: rgba(0,0,0,.6);
  }
  /* Mirrors announcement-popup.tsx image-only chrome */
  .modal {
    position: relative;
    z-index: 10;
    min-width: 0;
    width: fit-content;
    max-width: 100%;
    overflow: hidden;
    border-radius: 1.5rem;
    box-shadow: 0 25px 50px rgba(0,0,0,.45);
  }
  .modal img {
    display: block;
    height: auto;
    width: auto;
    max-height: calc(100dvh - 2rem);
    max-width: min(42rem, calc(100vw - 2rem));
    object-fit: contain;
  }
  .caption {
    position: fixed; left: 8px; bottom: 8px;
    color: #fff; font: 12px/1.3 Arial; background: rgba(0,0,0,.7);
    padding: 6px 8px; border-radius: 6px; z-index: 2;
  }
</style>
</head>
<body>
  <div class="overlay">
    <div class="modal"><img src="${src}" alt="${caption}"/></div>
  </div>
  <div class="caption">${caption}</div>
</body>
</html>`
}

async function main() {
  await fs.promises.rm(outDir, { recursive: true, force: true })
  await fs.promises.mkdir(outDir, { recursive: true })

  for (const f of FIXTURES) {
    if (f.file) {
      await fs.promises.copyFile(f.file, path.join(outDir, `${f.id}.webp`))
      f.src = `${f.id}.webp`
    } else {
      const file = `${f.id}.png`
      await sharp(markerSvg(f.w, f.h, f.fill, f.id.toUpperCase())).png().toFile(path.join(outDir, file))
      f.src = file
    }
  }

  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://127.0.0.1')
    if (url.pathname === '/' || url.pathname === '/index.html') {
      const id = url.searchParams.get('id') || 'portrait'
      const f = FIXTURES.find((x) => x.id === id) || FIXTURES[0]
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
      res.end(pageHtml(`/${f.src}`, `${f.id} · ${f.note}`))
      return
    }
    const file = path.join(outDir, path.basename(url.pathname))
    if (!file.startsWith(outDir) || !fs.existsSync(file)) {
      res.writeHead(404)
      res.end()
      return
    }
    const ext = path.extname(file)
    res.writeHead(200, {
      'content-type': ext === '.webp' ? 'image/webp' : 'image/png',
    })
    fs.createReadStream(file).pipe(res)
  })

  await new Promise((r) => server.listen(0, '127.0.0.1', r))
  const { port } = server.address()
  const browser = await puppeteer.launch({
    executablePath: chrome,
    headless: true,
    args: ['--hide-scrollbars'],
  })

  let failed = 0
  try {
    for (const vp of VIEWPORTS) {
      const page = await browser.newPage()
      await page.setViewport({ width: vp.w, height: vp.h, deviceScaleFactor: 1 })
      for (const f of FIXTURES) {
        await page.goto(`http://127.0.0.1:${port}/?id=${f.id}`, { waitUntil: 'networkidle0' })
        await page.waitForSelector('img')
        await page.waitForFunction(() => {
          const img = document.querySelector('img')
          return img && img.complete && img.naturalWidth > 0
        })
        const metrics = await page.evaluate(() => {
          const img = document.querySelector('img')
          const r = img.getBoundingClientRect()
          return {
            naturalW: img.naturalWidth,
            naturalH: img.naturalHeight,
            boxW: r.width,
            boxH: r.height,
            x: r.x,
            y: r.y,
            vw: window.innerWidth,
            vh: window.innerHeight,
          }
        })
        const naturalAspect = metrics.naturalW / metrics.naturalH
        const boxAspect = metrics.boxW / metrics.boxH
        const aspectErr = Math.abs(boxAspect - naturalAspect) / naturalAspect
        const right = metrics.x + metrics.boxW
        const bottom = metrics.y + metrics.boxH
        const inView =
          metrics.x >= -0.5 &&
          metrics.y >= -0.5 &&
          right <= metrics.vw + 0.5 &&
          bottom <= metrics.vh + 0.5
        const ok = aspectErr < 0.02 && inView
        if (!ok) failed++
        console.log(
          `${ok ? 'PASS' : 'FAIL'} ${vp.id}-${f.id}  ${metrics.boxW.toFixed(0)}x${metrics.boxH.toFixed(0)}  aspect ${boxAspect.toFixed(3)} vs ${naturalAspect.toFixed(3)}  err ${(aspectErr * 100).toFixed(1)}%  inView=${inView}`
        )
        const shot = path.join(outDir, `${vp.id}-${f.id}.png`)
        await page.screenshot({ path: shot })
      }
      await page.close()
    }
  } finally {
    await browser.close()
    server.close()
  }
  if (failed) {
    console.error(`\n${failed} case(s) failed`)
    process.exit(1)
  }
  console.log('\nAll aspect-ratio cases passed — nothing cropped.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
