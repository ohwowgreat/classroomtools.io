/**
 * Deploys the static export (out/) to Alibaba OSS.
 *
 * Required env vars (set in .env.local or CI secrets):
 *   OSS_REGION          e.g. oss-ap-southeast-1
 *   OSS_ACCESS_KEY_ID
 *   OSS_ACCESS_KEY_SECRET
 *   OSS_BUCKET          e.g. classroomtools-io
 *
 * Usage: node scripts/oss-deploy.mjs
 */

import OSS from 'ali-oss'
import { readdir, readFile, stat } from 'fs/promises'
import { join, relative } from 'path'
import { lookup as mimeLookup } from 'mime-types'
import { config } from 'dotenv'

config({ path: '.env.local' })

const { OSS_REGION, OSS_ACCESS_KEY_ID, OSS_ACCESS_KEY_SECRET, OSS_BUCKET } = process.env

if (!OSS_REGION || !OSS_ACCESS_KEY_ID || !OSS_ACCESS_KEY_SECRET || !OSS_BUCKET) {
  console.error(`
Missing required env vars. Add these to .env.local:

  OSS_REGION=oss-ap-southeast-1
  OSS_ACCESS_KEY_ID=...
  OSS_ACCESS_KEY_SECRET=...
  OSS_BUCKET=classroomtools-io
`)
  process.exit(1)
}

const client = new OSS({
  region: OSS_REGION,
  accessKeyId: OSS_ACCESS_KEY_ID,
  accessKeySecret: OSS_ACCESS_KEY_SECRET,
  bucket: OSS_BUCKET,
})

const outDir = join(process.cwd(), 'out')

async function* walk(dir) {
  for (const entry of await readdir(dir)) {
    const full = join(dir, entry)
    const s = await stat(full)
    if (s.isDirectory()) yield* walk(full)
    else yield full
  }
}

let uploaded = 0
let failed = 0

for await (const filePath of walk(outDir)) {
  const key = relative(outDir, filePath).replace(/\\/g, '/')
  const mime = mimeLookup(filePath) || 'application/octet-stream'

  try {
    await client.put(key, filePath, {
      headers: {
        'Content-Type': mime,
        // Cache HTML pages briefly; cache assets aggressively
        'Cache-Control': key.endsWith('.html') ? 'public, max-age=60' : 'public, max-age=31536000, immutable',
      },
    })
    console.log(`  ✓ ${key}`)
    uploaded++
  } catch (err) {
    console.error(`  ✗ ${key}: ${err.message}`)
    failed++
  }
}

console.log(`\nDone — ${uploaded} uploaded, ${failed} failed.`)
if (failed > 0) process.exit(1)
