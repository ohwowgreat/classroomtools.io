import Link from 'next/link'
import ToolCard from '@/components/ToolCard'
import { getTools } from '@/lib/tools'

export default function HomePage() {
  const tools = getTools()
  const liveCount = tools.filter(t => t.status === 'live').length

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-20">
        <div className="grid sm:grid-cols-2 gap-x-16">
          <div>
            <p className="font-mono text-[10px] text-stone-400 tracking-widest uppercase mb-8">
              Teaching After the Feed / Action Research
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl leading-[1.1] tracking-tight text-stone-900 mb-8">
              Research-driven tools for teaching in algorithmic culture.
            </h1>
            <p className="text-base text-stone-500 leading-relaxed">
              Students today encounter most images through algorithmically curated feeds
              before they encounter them in a classroom. This research asks what that changes,
              what it costs, and what teachers can do in response. Each tool is built from
              that inquiry and tested in a working class.
            </p>
          </div>
          <div />
        </div>
      </section>

      {/* Tools */}
      <section id="tools" className="border-t border-stone-200">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-baseline justify-between mb-14">
            <h2 className="font-serif text-4xl text-stone-900">Tools</h2>
            <p className="font-mono text-[10px] text-stone-400 uppercase tracking-widest">
              {liveCount} live · more coming
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-16">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Research */}
      <section className="border-t border-stone-200 bg-stone-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="font-mono text-[10px] text-stone-400 tracking-widest uppercase mb-8">
            Research
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl leading-[1.1] text-stone-900 max-w-3xl mb-10">
            How should teaching respond when attention is shaped by algorithms?
          </h2>
          <p className="text-base text-stone-500 leading-relaxed max-w-2xl mb-12">
            An action research study comparing two instructional models across a single
            course and class. Students today encounter most information through ranked,
            algorithmically curated surfaces. The project asks whether classroom teaching
            should work with that logic or against it, and what each choice costs.
          </p>
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-900 hover:text-stone-500 transition-colors"
          >
            Read the research
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
