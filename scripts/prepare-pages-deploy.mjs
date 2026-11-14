import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Reuse the deploy job's existing Cloudflare credential; never print its value.
const wrangler = resolve('node_modules/wrangler/bin/wrangler.js')
const run = (...args) => execFileSync(process.execPath, [wrangler, ...args], {
  encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'], env: { ...process.env, CI: 'true' },
})
const config = JSON.parse(readFileSync('wrangler.jsonc', 'utf8'))
const name = process.env.GITHUB_REF_NAME && process.env.GITHUB_REF_NAME !== 'main'
  ? 'classroomtools-painting-notes-preview' : 'classroomtools-painting-notes'
const databases = () => JSON.parse(run('d1', 'list', '--json'))
let database = databases().find(item => item.name === name)
if (!database) {
  process.stdout.write(run('d1', 'create', name, '--location', 'apac', '--update-config=false'))
  database = databases().find(item => item.name === name)
}
if (!database?.uuid) throw new Error('The public Painting Notes database could not be provisioned.')
config.pages_build_output_dir = resolve('out')
config.d1_databases = [{
  binding: 'PAINTING_DB', database_name: name, database_id: database.uuid,
  migrations_dir: resolve('migrations/painting-notes'),
}]
writeFileSync('wrangler.deploy.json', JSON.stringify(config, null, 2) + '\n')
process.stdout.write(run('d1', 'migrations', 'apply', name, '--remote', '--config', 'wrangler.deploy.json'))
console.log(`Public painting storage ready: ${name}`)
