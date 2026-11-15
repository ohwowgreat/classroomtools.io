import type { Tool } from '@/data/tools'
import { researchModelLabel } from '@/data/tools'
import styles from './ContentPages.module.css'

export function ToolStatus({ tool }: { tool: Tool }) {
  const label = { live: 'Live', testing: 'Testing', 'coming-soon': 'In development' }[tool.status]
  return <span className={`${styles.status} ${styles[`status-${tool.status}`]}`}><i aria-hidden="true" />{label}</span>
}

export function ToolModel({ tool }: { tool: Tool }) {
  return <span className={`${styles.model} ${styles[`model-${tool.category === 'education' ? 'practical' : tool.researchModel}`]}`}>
    {tool.category === 'education' ? 'Classroom infrastructure' : researchModelLabel[tool.researchModel]}
  </span>
}

export function ToolScreenshot({ tool, lazy = false }: { tool: Tool; lazy?: boolean }) {
  const src = tool.screenshotLg || tool.screenshot
  if (!src) return <div className={styles.placeholder}>
    <svg width="56" height="56" viewBox="0 0 40 40" fill="none" aria-hidden="true"><circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.3" /><path d="M20 11v10l6 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
    <span>In development</span>
  </div>
  return <picture>
    {tool.slug === 'lms' ? <source media="(prefers-color-scheme: dark)" srcSet="/shots/lms-lg-dark.jpg" /> : null}
    <img src={src} alt={`${tool.name} interface`} width="960" height="600" loading={lazy ? 'lazy' : 'eager'} />
  </picture>
}
