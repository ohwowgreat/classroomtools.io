import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Research | classroomtools.io',
  description: 'Teaching After the Feed: action research on attention, image, and instruction.',
}

export default function ResearchPage() {
  return (
    <div className="space-y-8">

      <section>
        <p className="text-gray-500 mb-1">Action Research · 2024–ongoing</p>
        <h1 className="font-bold text-base mb-3">Teaching After the Feed</h1>
        <p className="mb-3">
          Students today encounter most information through algorithmically ranked surfaces:
          feeds, recommendation queues, search results. These surfaces share a logic —
          novelty over return, rapid connection-making, compression of context, engagement
          over depth. The lesson does not share that logic. This is not a problem of
          attention spans. It is a problem of structural legibility.
        </p>
        <p className="mb-3">
          When students sit down in class, they bring a perceptual habit shaped by
          systems optimised for salience. The lesson asks for something different:
          sustained looking, accumulation, return. Most teaching assumes that structure
          is self-evident. This research asks whether it is, and what happens when
          teachers design for it explicitly.
        </p>
        <p>
          "The less we teach, the more something else does." — Venkatesh Rao,{' '}
          <em>Deep Teaching</em> (2025)
        </p>
      </section>

      <section>
        <p className="font-bold mb-2">The inquiry</p>
        <p className="mb-3">
          This is an action research study conducted by Doğan Arslanoğlu, in one
          A-Level course. The same learning goals and assessment
          lenses are applied across two instructional cycles, each built around a
          different structural model. The question is not which model is better in
          the abstract — it is which teacher moves matter, under what conditions,
          and what students actually do with each.
        </p>
        <p className="mb-3">
          The tools on this site are built directly from the research. Each one
          emerged from a concrete classroom problem: students moving too fast,
          students not returning to prior material, students unable to articulate
          what they noticed before reaching for interpretation. The tools make
          the structural logic of the lesson visible and operable.
        </p>
      </section>

      <section>
        <p className="font-bold mb-2">Research questions</p>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li>How do feed-like and archive-first instructional models affect student attention, comprehension, transfer, and revision?</li>
          <li>Which teacher moves matter most within each model?</li>
          <li>When does teaching with the feed support learning, and when does teaching against the feed better support depth and transfer?</li>
        </ol>
      </section>

      <section>
        <p className="font-bold mb-2">Presentations</p>
        <ul className="space-y-3 text-gray-700">
          <li>
            <span className="text-gray-400 text-xs uppercase tracking-wide mr-2">Workshop · 2026</span>
            <span>Course Design in an Age of Algorithmic Attention</span>
            <p className="text-gray-500 mt-0.5">
              A practical workshop for teachers building lesson microsites with AI tools.
              Covers the structural mismatch between the lesson and the feed, demos of
              Close Reader and Constellation Board, and an 18-minute build session.
            </p>
          </li>
        </ul>
      </section>

      <section>
        <p className="font-bold mb-2">Status</p>
        <p className="text-gray-600 mb-2">
          Proposal accepted. Research design in revision following committee feedback.
          One teacher, one A-Level course. Same learning goals and assessment lenses
          across both cycles.
        </p>
        <a
          href="https://efficient-baseball-8a1.notion.site/Teaching-After-the-Feed-Research-Workspace-341f011a8af28132ba70d4213bc02712?pvs=74"
          target="_blank"
          rel="noopener noreferrer"
        >
          Research Workspace ↗
        </a>
      </section>

      <section className="pt-4 border-t border-gray-100">
        <p className="text-gray-400 mb-4 text-xs uppercase tracking-wide">Instructional models</p>

        <div className="space-y-6">
          <div>
            <p className="font-bold mb-1">Model A — Teaching with the feed</p>
            <p className="text-gray-500 mb-2">
              Teacher-designed sequences borrowing features from the feed without handing control to a platform.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Curate 4–6 tightly related examples</li>
              <li>Begin with comparison before explanation</li>
              <li>Reveal context incrementally</li>
              <li>Signal the next move clearly</li>
              <li>Build lessons through adjacency, contrast, and pattern</li>
            </ul>
          </div>

          <div>
            <p className="font-bold mb-1">Model B — Teaching against the feed</p>
            <p className="text-gray-500 mb-2">
              Archive-first structures that resist novelty in favour of return, reuse, and accumulation.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Begin from a stable archive or reference bank</li>
              <li>Revisit prior material before adding new material</li>
              <li>Use slower pacing and stronger categorisation</li>
              <li>Make pathways explicit</li>
              <li>Build retrieval and annotation into each lesson</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  )
}
