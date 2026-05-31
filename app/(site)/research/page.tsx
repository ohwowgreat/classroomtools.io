import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Research | classroomtools.io',
  description: 'Teaching After the Feed: a framework for learning in algorithmic culture.',
}

export default function ResearchPage() {
  return (
    <div className="space-y-6 py-2">

      <p><Link href="/">← Index</Link></p>

      <section>
        <h1 className="font-bold text-base mb-1">Teaching After the Feed</h1>
        <p className="text-gray-500 mb-4">A framework for learning in algorithmic culture.</p>

        <p className="mb-3">
          Students today encounter most information through ranked, algorithmically
          curated surfaces: feeds, recommendation queues, search results. These
          surfaces share a logic — novelty over return, rapid connection-making,
          compression of context.
        </p>
        <p className="mb-3">
          This project asks whether classroom teaching should work with that
          logic or against it, and what each choice costs. It is an action
          research study comparing two instructional models across a single
          course and class.
        </p>
      </section>

      <section>
        <p className="font-bold mb-2">Model A — Teaching with the feed</p>
        <p className="text-gray-500 mb-2">Teacher-designed sequences borrowing features from the feed without handing control to a platform.</p>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Curate 4–6 tightly related examples</li>
          <li>Begin with comparison before explanation</li>
          <li>Reveal context incrementally</li>
          <li>Signal the next move clearly</li>
          <li>Build lessons through adjacency, contrast, and pattern</li>
        </ul>
      </section>

      <section>
        <p className="font-bold mb-2">Model B — Teaching against the feed</p>
        <p className="text-gray-500 mb-2">Archive-first structures that resist novelty in favour of return, reuse, and accumulation.</p>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Begin from a stable archive or reference bank</li>
          <li>Revisit prior material before adding new material</li>
          <li>Use slower pacing and stronger categorisation</li>
          <li>Make pathways explicit</li>
          <li>Build retrieval and annotation into each lesson</li>
        </ul>
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
        <p className="font-bold mb-2">Status</p>
        <p className="text-gray-600">
          Proposal accepted. Research design in revision following committee
          feedback. One teacher, one A-Level course, one bounded unit. Same
          learning goals and assessment lenses across both cycles.
        </p>
      </section>

      <p><Link href="/">← Back to tools</Link></p>

    </div>
  )
}
