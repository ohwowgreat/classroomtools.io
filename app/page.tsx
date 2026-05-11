import Link from 'next/link'
import ToolCard from '@/components/ToolCard'
import { tools } from '@/data/tools'

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 border-b border-stone-200">
        <p className="font-mono text-xs text-stone-400 tracking-widest uppercase mb-6">
          Teaching After the Feed
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold text-stone-900 leading-tight tracking-tight max-w-2xl mb-6">
          How should teaching respond when attention is shaped by algorithms?
        </h1>
        <p className="text-lg text-stone-500 leading-relaxed max-w-xl mb-10">
          A collection of research-driven classroom tools built to work with — and
          against — the logic of the feed. Each tool is grounded in an action
          research project comparing two instructional models.
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 border border-stone-900 rounded-full px-4 py-2 hover:bg-stone-900 hover:text-stone-50 transition-colors"
          >
            Read the research
          </Link>
          <Link
            href="#tools"
            className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            See the tools →
          </Link>
        </div>
      </section>

      {/* Research models explainer */}
      <section className="mx-auto max-w-5xl px-6 py-12 border-b border-stone-200">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-feed-50 border border-feed-100 rounded-lg p-5">
            <p className="text-xs font-semibold text-feed-700 uppercase tracking-wider mb-2">
              Teaching with the feed
            </p>
            <p className="text-sm text-stone-700 leading-relaxed">
              Teacher-curated adjacency, pattern recognition before explanation,
              strong signals of what comes next. Borrows the feed&apos;s structure
              without handing control to a platform.
            </p>
          </div>
          <div className="bg-archive-50 border border-archive-100 rounded-lg p-5">
            <p className="text-xs font-semibold text-archive-700 uppercase tracking-wider mb-2">
              Teaching against the feed
            </p>
            <p className="text-sm text-stone-700 leading-relaxed">
              Archive-first structure, slow revisiting, explicit pathways, memory-
              oriented learning. Reduces novelty in favour of return, reuse, and
              accumulation.
            </p>
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section id="tools" className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-2xl font-semibold text-stone-900">Tools</h2>
          <p className="text-sm text-stone-400">{tools.filter(t => t.status === 'live').length} live · more coming</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
    </>
  )
}
