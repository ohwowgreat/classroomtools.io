import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '@/components/ContentPages.module.css'

export const metadata: Metadata = {
  title: 'Research | classroomtools.io',
  description: 'Teaching After the Feed: action research on attention, image, and instruction.',
}

const questions = [
  'How do feed-like and archive-first instructional models affect student attention, comprehension, transfer, and revision?',
  'Which teacher moves matter most within each model?',
  'When does teaching with the feed support learning, and when does teaching against the feed better support depth and transfer?',
]

export default function ResearchPage() {
  return (
    <div className={`index-wrap ${styles.page}`}>
      <section className={styles.researchHero} aria-labelledby="research-title">
        <div className={styles.researchTitle}>
          <p className={styles.context}>Action research · 2024 – ongoing</p>
          <h1 id="research-title">Teaching<br /><span>After the Feed</span></h1>
        </div>
        <div className={styles.researchIntro}>
          <p>Students today encounter most information through algorithmically ranked surfaces: feeds, recommendation queues, search results. These surfaces share a logic: novelty over return, rapid connection-making, compression of context, engagement over depth. The lesson does not share that logic. This is not a problem of attention spans. It is a problem of structural legibility.</p>
          <p>When students sit down in class, they bring a perceptual habit shaped by systems optimised for salience. The lesson asks for something different: sustained looking, accumulation, return. Most teaching assumes that structure is self-evident. This research asks whether it is, and what happens when teachers design for it explicitly.</p>
        </div>
      </section>

      <nav className={styles.contents} aria-label="On this page">
        <span>On this page</span>
        <a href="#inquiry">The inquiry</a><a href="#models">Instructional models</a><a href="#questions">Research questions</a><a href="#details">Presentations & status</a>
      </nav>

      <div className={styles.quote}>
        <p className={styles.context}>A starting point</p>
        <figure>
          <blockquote>&ldquo;The less we teach, the more <span>something else does.</span>&rdquo;</blockquote>
          <figcaption>Venkatesh Rao, <em>Deep Teaching</em> (2025)</figcaption>
        </figure>
      </div>

      <section className={`${styles.section} ${styles.inquiry}`} id="inquiry" aria-labelledby="inquiry-title">
        <article>
          <h2 id="inquiry-title">The inquiry</h2>
          <p>This is an action research study conducted by Doğan Arslanoğlu, in one A-Level course. The same learning goals and assessment lenses are applied across two instructional cycles, each built around a different structural model. The question is not which model is better in the abstract. It is which teacher moves matter, under what conditions, and what students actually do with each.</p>
        </article>
        <article>
          <h2>The tools</h2>
          <p>The tools on this site are built directly from the research. Each one emerged from a concrete classroom problem: students moving too fast, students not returning to prior material, students unable to articulate what they noticed before reaching for interpretation. The tools make the structural logic of the lesson visible and operable.</p>
          <Link className={styles.textLink} href="/#tools">Browse the tools <span aria-hidden="true">→</span></Link>
        </article>
      </section>

      <section className={`${styles.section} ${styles.models}`} id="models" aria-labelledby="models-title">
        <div className={styles.sectionHeading}><h2 id="models-title">Two ways to shape a lesson.</h2><span className={styles.context}>Instructional models</span></div>
        <div className={styles.modelPair}>
          <article>
            <span className={`${styles.model} ${styles['model-with-feed']}`}>Model A · With the feed</span>
            <h3>The lesson is shaped like a curated discovery.</h3>
            <p>Teacher-designed sequences that borrow the structural logic of the feed: adjacency, contrast, incremental reveal, without handing control to a platform. Students encounter examples before they receive explanations.</p>
          </article>
          <article>
            <span className={`${styles.model} ${styles['model-against-feed']}`}>Model B · Against the feed</span>
            <h3>The lesson is shaped like a library, not a queue.</h3>
            <p>Archive-first structures that resist novelty in favour of return, reuse, and accumulation. Students begin from a stable reference bank and revisit prior material before new material is introduced.</p>
          </article>
        </div>
      </section>

      <section className={`${styles.section} ${styles.questions}`} id="questions" aria-labelledby="questions-title">
        <div className={styles.sectionHeading}><h2 id="questions-title">Research questions</h2></div>
        <ol className={styles.questionList}>{questions.map(question => <li key={question}><p>{question}</p></li>)}</ol>
      </section>

      <section className={`${styles.section} ${styles.researchDetails}`} id="details" aria-label="Presentations and status">
        <article>
          <h2>Presentations</h2>
          <p className={styles.detailMeta}>Workshop · 2026</p>
          <h3>Course Design in an Age of Algorithmic Attention</h3>
          <p className={styles.detailCopy}>A practical workshop for teachers building lesson microsites with AI tools. Covers the structural mismatch between the lesson and the feed, demos of Close Reader and Constellation Board, and an 18-minute build session.</p>
        </article>
        <article>
          <h2>Status</h2>
          <p className={styles.detailCopy}>Proposal accepted. Research design in revision following committee feedback. One teacher, one A-Level course. Same learning goals and assessment lenses across both cycles.</p>
          <a className={styles.textLink} href="https://efficient-baseball-8a1.notion.site/Teaching-After-the-Feed-Research-Workspace-341f011a8af28132ba70d4213bc02712?pvs=74" target="_blank" rel="noopener noreferrer">Research Workspace <span aria-hidden="true">↗</span></a>
        </article>
      </section>
    </div>
  )
}
