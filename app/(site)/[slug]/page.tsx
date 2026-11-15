import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTools, getTool } from '@/data/tools'
import { ToolStatus, ToolModel, ToolScreenshot } from '@/components/ToolMeta'
import FeedbackForm from '@/components/FeedbackForm'
import styles from '@/components/ContentPages.module.css'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getTools().map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tool = getTool(slug)
  if (!tool) return {}
  return { title: `${tool.name} | classroomtools.io`, description: tool.description }
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params
  const tool = getTool(slug)
  if (!tool) notFound()

  const related = getTools()
    .filter((t) => t.slug !== tool.slug && t.screenshot)
    .sort((a, b) => {
      const score = (t: typeof tool) =>
        (t.researchModel === tool.researchModel ? 2 : 0) + (t.category === tool.category ? 1 : 0)
      return score(b) - score(a)
    })
    .slice(0, 3)
  const domain = tool.externalUrl?.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <div className={`index-wrap ${styles.page}`}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/#tools">Tools</Link><span aria-hidden="true">/</span><span aria-current="page">{tool.name}</span>
      </nav>
      <section className={styles.toolHero} aria-labelledby="tool-title">
        <div className={styles.toolCopy}>
          <div className={styles.meta}><ToolStatus tool={tool} /><ToolModel tool={tool} /></div>
          <h1 id="tool-title">{tool.name}</h1>
          <p className={styles.toolTagline}>{tool.tagline}</p>
          <p className={styles.toolDescription}>{tool.description}</p>
          {tool.externalUrl || tool.githubUrl ? <div className={styles.toolActions}>
            {tool.externalUrl ? <a className={`${styles.button} ${styles.primary}`} href={tool.externalUrl} target="_blank" rel="noopener noreferrer">Open {tool.name} <span aria-hidden="true">↗</span></a> : null}
            {tool.githubUrl ? <a className={`${styles.button} ${tool.externalUrl ? '' : styles.primary}`} href={tool.githubUrl} target="_blank" rel="noopener noreferrer">Source on GitHub <span aria-hidden="true">↗</span></a> : null}
          </div> : null}
          {domain ? <p className={styles.domain}>{domain} · free</p> : null}
        </div>
        <div className={styles.toolVisual}><ToolScreenshot tool={tool} /></div>
      </section>

      <section className={`${styles.section} ${styles.connection}`} aria-labelledby="connection-title">
        <div><p className={styles.context}>Teaching After the Feed</p><h2 id="connection-title">Research connection</h2></div>
        <div className={styles.connectionCopy}>
          <p>{tool.researchNote}</p>
          <Link className={styles.textLink} href="/research">Read the research <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      {related.length > 0 ? <section className={styles.section} aria-labelledby="related-title">
        <div className={styles.sectionHeading}>
          <h2 id="related-title">Related tools</h2>
          <Link className={styles.textLink} href="/#tools">Browse all tools <span aria-hidden="true">→</span></Link>
        </div>
        <div className={styles.relatedList}>
          {related.map(item => <Link key={item.slug} href={`/${item.slug}`} className={styles.relatedRow}>
            <div className={styles.relatedImage}><ToolScreenshot tool={item} lazy /></div>
            <div className={styles.relatedCopy}><h3>{item.name}</h3><p>{item.tagline}</p></div>
            <div className={styles.relatedMeta}><ToolStatus tool={item} /><ToolModel tool={item} /></div>
            <span className={styles.relatedArrow} aria-hidden="true">→</span>
          </Link>)}
        </div>
      </section> : null}

      <section className={`${styles.section} ${styles.feedback}`} aria-labelledby="feedback-title">
        <div><h2 id="feedback-title">Something broken?<br />Something missing?</h2><p>Input from the classroom shapes what gets built next.</p></div>
        <FeedbackForm githubRepo={tool.githubUrl ? tool.githubUrl.replace('https://github.com/', '') : 'ohwowgreat/classroomtools.io'} />
      </section>
    </div>
  )
}
