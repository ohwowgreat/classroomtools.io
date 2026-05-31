// Warm Swiss — Swiss grid discipline + warm-modern palette and feel
import Link from 'next/link'
import ToolEntry from '@/components/ToolEntry'
import ScrollReveal from '@/components/ScrollReveal'
import FeedbackForm from '@/components/FeedbackForm'
import { getTools } from '@/data/tools'

export default function HomePage() {
  const tools = getTools()
  const liveCount = tools.filter(t => t.status === 'live').length
  const devCount = tools.length - liveCount

  const stats: [string, string][] = [
    ['Tools', String(tools.length).padStart(2, '0')],
    ['Live', String(liveCount).padStart(2, '0')],
    ['In development', String(devCount).padStart(2, '0')],
    ['Research models', '02'],
    ['Study period', '2024 —'],
  ]

  return (
    <>
      {/* Hero */}
      <section className="flex flex-col justify-between pt-20" style={{ minHeight: '92dvh' }}>
        <div className="mx-auto max-w-6xl px-6 flex-1 flex flex-col justify-center py-16">

          <p
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400 mb-16 animate-hero-in"
            style={{ animationDelay: '0ms' }}
          >
            Teaching After the Feed / Action Research
          </p>

          <div className="grid lg:grid-cols-12 gap-x-8 items-start">
            {/* Headline + copy + CTAs */}
            <div
              className="lg:col-span-7 animate-hero-in"
              style={{ animationDelay: '80ms' }}
            >
              <h1 className="font-serif text-[3rem] sm:text-[4.5rem] lg:text-[5.25rem] leading-[0.93] tracking-tight text-stone-900 mb-10">
                Research-driven tools for teaching in algorithmic culture.
              </h1>
              <p className="text-[15px] text-stone-500 leading-[1.8] max-w-[44ch] mb-10">
                Students encounter most images through algorithmically curated
                feeds before they encounter them in a classroom. These tools
                are built from an inquiry into what that changes, and what
                teachers can do in response.
              </p>
              <div className="flex items-center gap-6 flex-wrap">
                <Link
                  href="/#tools"
                  className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-900 border border-stone-900 px-5 py-3 hover:bg-stone-900 hover:text-[#faf8f5] active:scale-[0.98] transition-all duration-150"
                >
                  View tools
                </Link>
                <Link
                  href="/research"
                  className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500 hover:text-stone-900 transition-colors duration-150"
                >
                  About the research →
                </Link>
              </div>
            </div>

            {/* Warm Swiss data block */}
            <div
              className="lg:col-span-4 lg:col-start-9 mt-14 lg:mt-0 animate-hero-in"
              style={{ animationDelay: '160ms' }}
            >
              <div style={{ backgroundColor: '#ede0cf' }}>
                <div className="px-7 pt-6 pb-3" style={{ borderBottom: '1px solid rgba(120,80,40,0.15)' }}>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-stone-500">
                    Programme overview
                  </p>
                </div>
                <div className="px-7 py-2 pb-4">
                  {stats.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between items-baseline py-2.5"
                      style={{ borderBottom: '1px solid rgba(120,80,40,0.1)' }}
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-stone-500">
                        {label}
                      </span>
                      <span className="font-mono text-[11px] tabular-nums text-stone-800">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 w-full">
          <div className="h-px bg-stone-200" />
        </div>
      </section>

      {/* Tools index */}
      <section id="tools" className="mx-auto max-w-6xl px-6 pt-14 pb-24">
        <div className="flex items-baseline justify-between mb-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
            Tools
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-400">
            {liveCount} live · {devCount} in development
          </p>
        </div>

        <div>
          {tools.map((tool, i) => (
            <ToolEntry key={tool.slug} tool={tool} index={i} />
          ))}
          <div className="border-t border-stone-200" />
        </div>
      </section>

      {/* Request a tool */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid lg:grid-cols-12 gap-x-8 gap-y-10">
          <div className="lg:col-span-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400 lg:[writing-mode:vertical-rl] lg:rotate-180">
              Suggest
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-400 mb-4">
              What would help your teaching?
            </p>
            <p className="text-[13px] text-stone-500 leading-[1.8] mb-8">
              New tools here come from real classroom problems. If something in
              your practice feels broken, repetitive, or missing — describe it.
              Not every idea becomes a tool, but every idea is read.
            </p>
            <FeedbackForm
              githubRepo="ohwowgreat/classroomtools.io"
              defaultType="feature"
            />
          </div>
        </div>
      </section>

      {/* Research */}
      <section style={{ backgroundColor: '#1c1008' }}>
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <ScrollReveal>
            <div className="grid lg:grid-cols-12 gap-x-8 gap-y-10">
              <div className="lg:col-span-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-600 lg:[writing-mode:vertical-rl] lg:rotate-180 lg:h-32">
                  Research
                </p>
              </div>
              <div className="lg:col-span-8 lg:col-start-3">
                <blockquote className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] tracking-tight text-stone-100 mb-10">
                  &ldquo;How should classroom teaching respond to the logics of
                  the feed, recommendation, and AI-shaped discovery?&rdquo;
                </blockquote>
                <p className="text-[13px] text-stone-400 leading-[1.8] max-w-[52ch] mb-10">
                  An action research study comparing two instructional models
                  across a single art course. The research asks which model
                  better supports depth, transfer, and sustained visual attention.
                </p>
                <Link
                  href="/research"
                  className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-400 border-b border-stone-700 pb-px hover:text-stone-100 hover:border-stone-500 transition-colors duration-200"
                >
                  Read the research →
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
