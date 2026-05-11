import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Research — classroomtools.io',
  description:
    'Teaching After the Feed: a framework for learning in algorithmic culture. An action research project comparing feed-like and archive-first instructional approaches.',
}

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 pt-16 pb-24">

      {/* Header */}
      <p className="font-mono text-xs text-stone-400 tracking-widest uppercase mb-4">
        Research
      </p>
      <h1 className="text-3xl sm:text-4xl font-semibold text-stone-900 leading-tight tracking-tight mb-4">
        Teaching After the Feed
      </h1>
      <p className="text-base text-stone-500 mb-12">
        A Framework for Learning in Algorithmic Culture
      </p>

      {/* Core question */}
      <div className="border-l-2 border-stone-900 pl-5 mb-12">
        <p className="text-lg text-stone-800 leading-relaxed font-medium">
          How should classroom teaching respond to the logics of the feed,
          recommendation, and AI-shaped discovery?
        </p>
      </div>

      {/* Overview */}
      <section className="mb-12 space-y-4 text-stone-700 leading-relaxed">
        <p>
          Students today encounter most information through ranked, adjacent,
          algorithmically curated surfaces: feeds, recommendation queues, search
          results. These surfaces share a logic: novelty over return, strong
          signals of what comes next, compression of context, rapid
          connection-making without full explanation.
        </p>
        <p>
          This project asks whether classroom teaching should work with that logic
          or against it, and what each choice costs. Rather than treating the
          feed as a problem to solve, it takes the feed&apos;s structure seriously
          as a set of instructional techniques that can be adapted, rejected, or
          combined.
        </p>
        <p>
          The research is an action research study comparing two instructional
          models across a single course and class.
        </p>
      </section>

      <hr className="border-stone-200 mb-12" />

      {/* Model A */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold text-feed-700 bg-feed-100 rounded-full px-2.5 py-1">
            Model A
          </span>
          <h2 className="text-lg font-semibold text-stone-900">
            Teaching with the feed
          </h2>
        </div>
        <p className="text-stone-600 leading-relaxed mb-4">
          Teacher-designed sequences that borrow features from the feed without
          handing control to a platform.
        </p>
        <ul className="space-y-2 text-sm text-stone-600">
          {[
            'Curate 4–6 tightly related examples',
            'Begin with comparison before explanation',
            'Reveal context incrementally',
            'Signal the next move clearly',
            'Build lessons through adjacency, contrast, and pattern',
          ].map((move) => (
            <li key={move} className="flex items-start gap-2">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-feed-500 shrink-0" />
              {move}
            </li>
          ))}
        </ul>
      </section>

      {/* Model B */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold text-archive-700 bg-archive-100 rounded-full px-2.5 py-1">
            Model B
          </span>
          <h2 className="text-lg font-semibold text-stone-900">
            Teaching against the feed
          </h2>
        </div>
        <p className="text-stone-600 leading-relaxed mb-4">
          Archive-first structures that resist novelty in favour of return, reuse,
          and accumulation.
        </p>
        <ul className="space-y-2 text-sm text-stone-600">
          {[
            'Begin from a stable archive or reference bank',
            'Revisit prior material before adding new material',
            'Use slower pacing and stronger categorisation',
            'Make pathways explicit',
            'Build retrieval and annotation into each lesson',
          ].map((move) => (
            <li key={move} className="flex items-start gap-2">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-archive-500 shrink-0" />
              {move}
            </li>
          ))}
        </ul>
      </section>

      <hr className="border-stone-200 mb-12" />

      {/* Research questions */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-stone-900 mb-4">
          Research questions
        </h2>
        <ol className="space-y-3 text-stone-600 text-sm leading-relaxed list-none">
          {[
            'How do feed-like and archive-first instructional models affect student attention, comprehension, transfer, and revision?',
            'Which teacher moves matter most within each model?',
            'When does teaching with the feed support learning, and when does teaching against the feed better support depth and transfer?',
          ].map((q, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-mono text-stone-300 shrink-0">{i + 1}.</span>
              <span>{q}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Status */}
      <section className="mb-12 bg-stone-100 rounded-lg p-5">
        <h2 className="text-sm font-semibold text-stone-900 mb-2">
          Current status
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          Proposal accepted. Research design in revision following committee
          feedback. One teacher, one A-Level course, one bounded unit. Same
          learning goals and assessment lenses across both cycles.
        </p>
      </section>

      {/* CTA */}
      <Link
        href="/#tools"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 border border-stone-900 rounded-full px-4 py-2 hover:bg-stone-900 hover:text-stone-50 transition-colors"
      >
        See the tools →
      </Link>
    </div>
  )
}
