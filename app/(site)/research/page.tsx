import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Research | classroomtools.io',
  description: 'Teaching After the Feed: action research on attention, image, and instruction.',
}

export default function ResearchPage() {
  return (
    <div className="wrap">

      {/* Editorial hero */}
      <section className="pt-14 pb-12 max-w-[780px]">
        <p className="eyebrow mb-[14px]">Action research · 2024 – ongoing</p>
        <h1 className="font-serif font-normal tracking-[-0.01em] leading-[1.1] text-[clamp(34px,5vw,52px)]">
          Teaching After the Feed
        </h1>
        <p className="lede mt-[18px] text-[16px] max-w-[640px]">
          Students today encounter most information through algorithmically ranked surfaces:
          feeds, recommendation queues, search results. These surfaces share a logic: novelty
          over return, rapid connection-making, compression of context, engagement over depth.
          The lesson does not share that logic. This is not a problem of attention spans. It is
          a problem of structural legibility.
        </p>
        <p className="sec mt-3 max-w-[640px]">
          When students sit down in class, they bring a perceptual habit shaped by systems
          optimised for salience. The lesson asks for something different: sustained looking,
          accumulation, return. Most teaching assumes that structure is self-evident. This
          research asks whether it is, and what happens when teachers design for it explicitly.
        </p>
      </section>

      {/* Quote */}
      <section className="sect">
        <div className="max-w-[640px] mx-auto text-center">
          <p className="quote-q font-serif font-normal">
            &ldquo;The less we teach, the more something else does.&rdquo;
          </p>
          <p className="ter mt-[10px]">Venkatesh Rao, <em>Deep Teaching</em> (2025)</p>
        </div>
      </section>

      {/* The inquiry */}
      <section className="sect">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px]">
          <div>
            <p className="eyebrow mb-2">The inquiry</p>
            <p className="sec">
              This is an action research study conducted by Doğan Arslanoğlu, in one A-Level
              course. The same learning goals and assessment lenses are applied across two
              instructional cycles, each built around a different structural model. The
              question is not which model is better in the abstract. It is which teacher moves
              matter, under what conditions, and what students actually do with each.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-2">The tools</p>
            <p className="sec">
              The tools on this site are built directly from the research. Each one emerged
              from a concrete classroom problem: students moving too fast, students not
              returning to prior material, students unable to articulate what they noticed
              before reaching for interpretation. The tools make the structural logic of the
              lesson visible and operable. <Link href="/#tools">Browse the tools →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="sect">
        <div className="text-center mb-[30px] flex flex-col gap-[10px]">
          <p className="eyebrow">Instructional models</p>
          <h2>Two ways to shape a lesson.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="card !p-[22px]" style={{ borderTop: '2px solid var(--c-feed)' }}>
            <span className="chip chip-feed">Model A · With the feed</span>
            <h3 className="mt-[10px]">The lesson is shaped like a curated discovery.</h3>
            <p className="sec mt-[5px]">
              Teacher-designed sequences that borrow the structural logic of the feed:
              adjacency, contrast, incremental reveal, without handing control to a platform.
              Students encounter examples before they receive explanations.
            </p>
          </div>
          <div className="card !p-[22px]" style={{ borderTop: '2px solid var(--c-archive)' }}>
            <span className="chip chip-archive">Model B · Against the feed</span>
            <h3 className="mt-[10px]">The lesson is shaped like a library, not a queue.</h3>
            <p className="sec mt-[5px]">
              Archive-first structures that resist novelty in favour of return, reuse, and
              accumulation. Students begin from a stable reference bank and revisit prior
              material before new material is introduced.
            </p>
          </div>
        </div>
      </section>

      {/* Research questions */}
      <section className="sect">
        <p className="eyebrow mb-3">Research questions</p>
        <div className="grid gap-px rounded-2xl overflow-hidden border" style={{ background: 'var(--border)', borderColor: 'var(--border)' }}>
          {[
            'How do feed-like and archive-first instructional models affect student attention, comprehension, transfer, and revision?',
            'Which teacher moves matter most within each model?',
            'When does teaching with the feed support learning, and when does teaching against the feed better support depth and transfer?',
          ].map((q, i) => (
            <div key={i} className="grid [grid-template-columns:auto_1fr] gap-[14px] items-start p-4" style={{ background: 'var(--surface)' }}>
              <span
                className="mono grid place-items-center w-6 h-6 rounded-full text-[11px] font-semibold mt-[1px]"
                style={{ color: 'var(--accent)', background: 'color-mix(in srgb, var(--accent) 11%, transparent)' }}
              >
                {i + 1}
              </span>
              <p className="sec">{q}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Presentations + status */}
      <section className="sect">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="card !p-[22px]">
            <p className="eyebrow">Presentations</p>
            <p className="ter mono mt-3">Workshop · 2026</p>
            <h3 className="mt-1">Course Design in an Age of Algorithmic Attention</h3>
            <p className="ter mt-1">
              A practical workshop for teachers building lesson microsites with AI tools.
              Covers the structural mismatch between the lesson and the feed, demos of Close
              Reader and Constellation Board, and an 18-minute build session.
            </p>
          </div>
          <div className="card !p-[22px]">
            <p className="eyebrow">Status</p>
            <p className="sec mt-3">
              Proposal accepted. Research design in revision following committee feedback.
              One teacher, one A-Level course. Same learning goals and assessment lenses
              across both cycles.
            </p>
            <p className="ter mt-3">
              <a
                href="https://efficient-baseball-8a1.notion.site/Teaching-After-the-Feed-Research-Workspace-341f011a8af28132ba70d4213bc02712?pvs=74"
                target="_blank"
                rel="noopener noreferrer"
              >
                Research Workspace ↗
              </a>
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
