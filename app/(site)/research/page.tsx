import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Research | classroomtools.io',
  description:
    'Teaching After the Feed: a framework for learning in algorithmic culture.',
}

export default function ResearchPage() {
  return (
    <div className="pt-24 pb-32">
      {/* Chapter opener */}
      <div className="mx-auto max-w-6xl px-6 mb-20">
        <div className="grid sm:grid-cols-12 gap-x-8">
          <div className="sm:col-span-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-8">
              Teaching After the Feed
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-stone-900">
              A Framework for Learning in Algorithmic Culture
            </h1>
          </div>
        </div>
        <div className="h-px bg-stone-200 mt-12" />
      </div>

      {/* Body */}
      <div className="mx-auto max-w-2xl px-6">
        {/* Pull quote */}
        <blockquote className="border-l-2 border-stone-900 pl-6 mb-14">
          <p className="font-serif text-xl sm:text-2xl leading-relaxed text-stone-800">
            How should classroom teaching respond to the logics of the feed,
            recommendation, and AI-shaped discovery?
          </p>
        </blockquote>

        {/* Overview */}
        <div className="space-y-5 text-stone-600 leading-relaxed text-[15px] mb-14">
          <p>
            Students today encounter most information through ranked, adjacent,
            algorithmically curated surfaces: feeds, recommendation queues,
            search results. These surfaces share a logic — novelty over return,
            strong signals of what comes next, compression of context, rapid
            connection-making without full explanation.
          </p>
          <p>
            This project asks whether classroom teaching should work with that
            logic or against it, and what each choice costs. Rather than
            treating the feed as a problem to solve, it takes the feed&apos;s
            structure seriously as a set of instructional techniques that can
            be adapted, rejected, or combined.
          </p>
          <p>
            The research is an action research study comparing two instructional
            models across a single course and class.
          </p>
        </div>

        <hr className="border-stone-200 mb-14" />

        {/* Model A */}
        <section className="mb-12">
          <div className="flex items-baseline gap-4 mb-5">
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-feed-600 bg-feed-50 px-2.5 py-1.5 rounded shrink-0">
              Model A
            </span>
            <h2 className="font-serif text-2xl text-stone-900">
              Teaching with the feed
            </h2>
          </div>
          <p className="text-stone-500 text-sm leading-relaxed mb-5">
            Teacher-designed sequences that borrow features from the feed
            without handing control to a platform.
          </p>
          <ul className="space-y-3">
            {[
              'Curate 4–6 tightly related examples',
              'Begin with comparison before explanation',
              'Reveal context incrementally',
              'Signal the next move clearly',
              'Build lessons through adjacency, contrast, and pattern',
            ].map((move) => (
              <li key={move} className="flex items-start gap-4 text-sm text-stone-600 leading-relaxed">
                <span className="font-mono text-stone-300 shrink-0 mt-0.5">—</span>
                {move}
              </li>
            ))}
          </ul>
        </section>

        {/* Model B */}
        <section className="mb-14">
          <div className="flex items-baseline gap-4 mb-5">
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-archive-600 bg-archive-50 px-2.5 py-1.5 rounded shrink-0">
              Model B
            </span>
            <h2 className="font-serif text-2xl text-stone-900">
              Teaching against the feed
            </h2>
          </div>
          <p className="text-stone-500 text-sm leading-relaxed mb-5">
            Archive-first structures that resist novelty in favour of return,
            reuse, and accumulation.
          </p>
          <ul className="space-y-3">
            {[
              'Begin from a stable archive or reference bank',
              'Revisit prior material before adding new material',
              'Use slower pacing and stronger categorisation',
              'Make pathways explicit',
              'Build retrieval and annotation into each lesson',
            ].map((move) => (
              <li key={move} className="flex items-start gap-4 text-sm text-stone-600 leading-relaxed">
                <span className="font-mono text-stone-300 shrink-0 mt-0.5">—</span>
                {move}
              </li>
            ))}
          </ul>
        </section>

        <hr className="border-stone-200 mb-14" />

        {/* Research questions */}
        <section className="mb-14">
          <h2 className="font-serif text-2xl text-stone-900 mb-7">
            Research questions
          </h2>
          <ol className="space-y-6">
            {[
              'How do feed-like and archive-first instructional models affect student attention, comprehension, transfer, and revision?',
              'Which teacher moves matter most within each model?',
              'When does teaching with the feed support learning, and when does teaching against the feed better support depth and transfer?',
            ].map((q, i) => (
              <li key={i} className="flex gap-5">
                <span className="font-mono text-sm text-stone-300 shrink-0">{i + 1}</span>
                <p className="text-stone-600 text-sm leading-relaxed">{q}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Status */}
        <section className="mb-14">
          <h2 className="font-serif text-2xl text-stone-900 mb-4">
            Current status
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Proposal accepted. Research design in revision following committee
            feedback. One teacher, one A-Level course, one bounded unit. Same
            learning goals and assessment lenses across both cycles.
          </p>
        </section>

        <Link
          href="/#tools"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-stone-900 border-b border-stone-900 pb-0.5 hover:text-stone-400 hover:border-stone-300 transition-colors duration-200"
        >
          See the tools →
        </Link>
      </div>
    </div>
  )
}
