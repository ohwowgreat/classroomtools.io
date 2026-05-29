import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

export type ResearchModel = 'with-feed' | 'against-feed' | 'both'
export type ToolStatus = 'live' | 'coming-soon'

export interface Tool {
  slug: string
  name: string
  tagline: string
  description: string
  researchModel: ResearchModel
  researchNote: string
  externalUrl?: string
  status: ToolStatus
}

export function getTools(): Tool[] {
  const dir = path.join(process.cwd(), 'content/tools')
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.yaml'))

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const data = yaml.load(raw) as Omit<Tool, 'slug'>
    return { slug: path.basename(file, '.yaml'), ...data }
  })
}

export const researchModelLabel: Record<ResearchModel, string> = {
  'with-feed': 'Teaching with the feed',
  'against-feed': 'Teaching against the feed',
  both: 'Both models',
}

export const researchModelColor: Record<ResearchModel, string> = {
  'with-feed': 'feed',
  'against-feed': 'archive',
  both: 'stone',
}
