import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Provision with the owner's existing login once. Routine deploys need Pages
// permission only and never list/create/migrate databases with the CI token.
const wrangler = resolve('node_modules/wrangler/bin/wrangler.js')
const run = (...args) => execFileSync(process.execPath, [wrangler, ...args], {
  encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'], env: { ...process.env, CI: 'true' },
})
const config = JSON.parse(readFileSync('wrangler.jsonc', 'utf8'))
const preview = process.env.GITHUB_REF_NAME && process.env.GITHUB_REF_NAME !== 'main'
const provision = process.argv.includes('--provision')
if (provision) {
  config.env ??= {}
  config.env.preview ??= { d1_databases: [{
    binding: 'PAINTING_DB', database_name: 'classroomtools-painting-notes-preview',
    migrations_dir: 'migrations/painting-notes',
  }] }
  for (const target of [config, config.env.preview]) {
    const binding = target.d1_databases[0]
    const databases = () => JSON.parse(run('d1', 'list', '--json'))
    let database = databases().find(item => item.name === binding.database_name)
    if (!database) {
      process.stdout.write(run('d1', 'create', binding.database_name, '--location', 'apac', '--update-config=false'))
      database = databases().find(item => item.name === binding.database_name)
    }
    if (!database?.uuid) throw new Error('The Painting Notes database could not be provisioned.')
    binding.database_id = database.uuid
    writeFileSync('wrangler.jsonc', JSON.stringify(config, null, 2) + '\n')
    const migrationConfig = { ...config, pages_build_output_dir: resolve('out'),
      d1_databases: [{ ...binding, migrations_dir: resolve(binding.migrations_dir) }] }
    delete migrationConfig.env
    writeFileSync('wrangler.deploy.json', JSON.stringify(migrationConfig, null, 2) + '\n')
    process.stdout.write(run('d1', 'migrations', 'apply', binding.database_name, '--remote', '--config', 'wrangler.deploy.json'))
  }
}
const binding = (preview ? config.env?.preview : config)?.d1_databases?.[0]
if (!binding?.database_id) throw new Error('Run npm run setup:storage with the owner Cloudflare login before deploying.')
// Pages deploys must discover the standard wrangler.jsonc path themselves.
// Its top-level bindings serve production; env.preview isolates other branches.
console.log(`Public painting storage bound: ${binding.database_name}`)
