import Link from 'next/link'
import ToolRow from '@/components/ToolRow'
import ScrollReveal from '@/components/ScrollReveal'
import { getTools } from '@/lib/tools'

export default function HomePage() {
  const tools = getTools()
  const liveCount = tools.filter(t => t.status === 'live').length

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-6 w-full">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-10">
            Teaching After the Feed / Action Research
          </p>

          <div className="grid sm:grid-cols-12 gap-x-8 gap-y-10 items-end">
            <div className="sm:col-span-7">
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-[5.25rem] leading-[0.93] tracking-tight text-stone-900">
                Research-driven tools for teaching in algorithmic culture.
              </h1>
            </div>

            <div className="sm:col-span-4 sm:col-start-9">
              <p className="text-sm text-stone-500 leading-relaxed mb-7">
                Students today encounter most images through algorithmically
                curated feeds before they encounter them in a classroom.
                These tools are built from an inquiry into what that changes,
                and what teachers can do in response.
              </p>
              <Link
                href="/#tools"
                className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-stone-900 border-b border-stone-900 pb-0.5 hover:text-stone-400 hover:border-stone-300 transition-colors duration-200"
              >
                {liveCount} tools available
              </Link>
            </div>
          </div>

          <div className="mt-16 h-px bg-stone-200" />
        </div>
      </section>

      {/* Tools index */}
      <section id="tools" className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="font-serif text-3xl text-stone-900">Tools</h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-400">
            {liveCount} live · more in development
          </p>
        </div>

        <div>
          {tools.map((tool, i) => (
            <ScrollReveal key={tool.slug} delay={i * 60}>
              <ToolRow tool={tool} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Research chapter */}
      <section className="border-t border-stone-200 bg-stone-900">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <ScrollReveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-10">
              Research
            </p>
            <blockquote className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight text-stone-100 max-w-4xl mb-12">
              &ldquo;How should classroom teaching respond to the logics of the
              feed, recommendation, and AI-shaped discovery?&rdquo;
            </blockquote>
            <p className="text-sm text-stone-400 leading-relaxed max-w-xl mb-10">
              An action research study comparing two instructional models —
              teaching with the feed and teaching against it — across a single
              art course. The research asks which model better supports depth,
              transfer, and sustained visual attention.
            </p>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-stone-300 border-b border-stone-700 pb-0.5 hover:text-stone-100 hover:border-stone-400 transition-colors duration-200"
            >
              Read the research →
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
