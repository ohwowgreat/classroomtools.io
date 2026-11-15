import Link from 'next/link'
import { getTools, getStats } from '@/data/tools'
import ToolIndex from '@/components/ToolIndex'
import FeedbackForm from '@/components/FeedbackForm'
import styles from '@/components/ToolIndex.module.css'

export default function HomePage() {
  const stats = getStats()
  return (
    <div className={`index-wrap ${styles.home}`}>
      <section className={styles.hero}>
        <h1>Built in a real classroom.<br /><span>Shared with yours.</span></h1>
        <div className={styles.intro}>
          <p>Some come straight from <Link href="/research">Teaching After the Feed</Link>. Others are simply useful. Every one began as a real classroom problem.</p>
          <p className={styles.facts}>
            <span><strong>{stats.total}</strong> tools</span>
            <span><i aria-hidden="true" /><strong>{stats.live}</strong> live</span>
            <span><strong>{stats.openRepos}</strong> open source</span>
          </p>
        </div>
      </section>
      <ToolIndex tools={getTools()} />
      <section className={styles.research} aria-labelledby="research-title">
        <div className={styles.sectionHeading}>
          <h2 id="research-title">Two ways to shape a lesson.</h2>
          <Link className={styles.textLink} href="/research">Read the research <span aria-hidden="true">→</span></Link>
        </div>
        <div className={styles.researchPair}>
          <article>
            <span className={`${styles.model} ${styles['model-with-feed']}`}>With the feed</span>
            <h3>Discover through connections.</h3>
            <p>Adjacency, contrast, and discovery. Students meet examples before explanations.</p>
          </article>
          <article>
            <span className={`${styles.model} ${styles['model-against-feed']}`}>Against the feed</span>
            <h3>Return to a shared reference.</h3>
            <p>A stable archive. Students revisit, compare, and build on what they have seen.</p>
          </article>
        </div>
      </section>
      <section className={styles.suggest} id="suggest" aria-labelledby="suggest-title">
        <div>
          <h2 id="suggest-title">Suggest a tool</h2>
          <p>New tools come from real classroom problems. Describe something that feels broken, repetitive, or missing. Not every idea becomes a tool, but every idea is read.</p>
        </div>
        <FeedbackForm githubRepo="ohwowgreat/classroomtools.io" defaultType="feature" />
      </section>
    </div>
  )
}
