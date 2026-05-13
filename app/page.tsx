import Link from 'next/link'
import ToolCard from '@/components/ToolCard'
import { tools } from '@/data/tools'

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 border-b border-stone-200">
        <h1 className="text-4xl sm:text-5xl font-semibold text-stone-900 leading-tight tracking-tight max-w-2xl mb-6">
          Research-driven tools for the classroom.
        </h1>
        <p className="text-lg text-stone-500 leading-relaxed max-w-xl">
          Each tool comes from testing two instructional approaches in the same
          class. The research behind them is here if you want it.
        </p>
      </section>

      {/* Tools grid */}
      <section id="tools" className="mx-auto max-w-5xl px-6 py-16 border-b border-stone-200">
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

      {/* Research */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="font-mono text-xs text-stone-400 tracking-widest uppercase mb-4">Research</p>
        <h2 className="text-2xl font-semibold text-stone-900 max-w-xl mb-4">
          How should teaching respond when attention is shaped by algorithms?
        </h2>
        <p className="text-base text-stone-500 leading-relaxed max-w-xl mb-8">
          Students today encounter most information through ranked, adjacent,
          algorithmically curated surfaces. This project asks whether classroom
          teaching should work with that logic or against it — and what each
          choice costs. It is an action research study comparing two instructional
          models across a single course and class.
        </p>
        <Link
          href="/research"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 border border-stone-900 rounded-full px-4 py-2 hover:bg-stone-900 hover:text-stone-50 transition-colors"
        >
          Read the research
        </Link>
      </section>
    </>
  )
}
