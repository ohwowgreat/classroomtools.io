import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync, readFileSync, realpathSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { execFileSync } from 'node:child_process'

test('routine deploy configuration works offline and isolates preview storage', () => {
  const directory = mkdtempSync(join(tmpdir(), 'classroomtools-deploy-check-'))
  // Fixture IDs only. This test never calls Cloudflare or creates resources.
  const production = { binding: 'PAINTING_DB', database_name: 'fixture-production', database_id: 'fixture-production-id', migrations_dir: 'migrations/painting-notes' }
  const preview = { ...production, database_name: 'fixture-preview', database_id: 'fixture-preview-id' }
  const config = { name: 'fixture', pages_build_output_dir: 'out', d1_databases: [production], env: { preview: { d1_databases: [preview] } } }
  try {
    writeFileSync(join(directory, 'wrangler.jsonc'), JSON.stringify(config))
    for (const [branch, expected] of [['main', production], ['design-exploration', preview]]) {
      execFileSync(process.execPath, [resolve('scripts/prepare-pages-deploy.mjs')], {
        cwd: directory, env: { PATH: process.env.PATH, GITHUB_REF_NAME: branch }, stdio: 'pipe',
      })
      const generated = JSON.parse(readFileSync(join(directory, 'wrangler.deploy.json'), 'utf8'))
      assert.equal(generated.d1_databases[0].database_id, expected.database_id)
      assert.equal(generated.env, undefined)
      assert.equal(generated.pages_build_output_dir, join(realpathSync(directory), 'out'))
      assert.deepEqual(JSON.parse(readFileSync(join(directory, 'wrangler.jsonc'), 'utf8')), config)
    }
  } finally { rmSync(directory, { recursive: true, force: true }) }
})
