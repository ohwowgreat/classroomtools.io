import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTools, getTool } from '@/data/tools'
import { StatusChip, ModelChip } from '@/components/Chips'
import FeedbackForm from '@/components/FeedbackForm'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getTools().map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tool = getTool(slug)
  if (!tool) return {}
  return {
    title: `${tool.name} | classroomtools.io`,
    description: tool.description,
  }
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params
  const tool = getTool(slug)
  if (!tool) notFound()

  const related = getTools()
    .filter((t) => t.slug !== tool.slug && t.screenshot)
    .sort((a, b) => {
      const score = (t: typeof tool) =>
        (t.researchModel === tool.researchModel ? 2 : 0) +
        (t.category === tool.category ? 1 : 0)
      return score(b) - score(a)
    })
    .slice(0, 3)

  const domain = tool.externalUrl?.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <div className="wrap">

      {/* Tool hero */}
      <section className="pt-10 pb-12">
        <p className="ter mb-5">
          <Link href="/#tools" style={{ color: 'var(--text-tertiary)' }}>Tools</Link>
          <span className="opacity-60"> / </span>
          {tool.name}
        </p>
        <div className="grid grid-cols-1 lg:[grid-template-columns:4fr_6fr] gap-8 lg:gap-11 items-center">
          <div className="flex flex-col items-start gap-3">
            <div className="flex gap-[6px]">
              <StatusChip status={tool.status} />
              {tool.category === 'education'
                ? <span className="chip chip-neutral">Infrastructure</span>
                : <ModelChip model={tool.researchModel} long />}
            </div>
            <h1 className="text-[34px]">{tool.name}</h1>
            <p className="lede">{tool.tagline}</p>
            <p className="sec">{tool.description}</p>
            <div className="flex flex-wrap gap-[10px] mt-[6px]">
              {tool.externalUrl && (
                <a className="btn" href={tool.externalUrl} target="_blank" rel="noopener noreferrer">
                  Open {tool.name} ↗
                </a>
              )}
              {tool.githubUrl && (
                <a className="btn btn-ghost" href={tool.githubUrl} target="_blank" rel="noopener noreferrer">
                  Source on GitHub
                </a>
              )}
            </div>
            {domain
              ? <p className="ter mono">{domain} · free</p>
              : tool.status === 'coming-soon'
                ? <p className="ter mono">in development</p>
                : null}
          </div>
          {tool.screenshotLg || tool.screenshot ? (
            <div className="shot">
              <img src={tool.screenshotLg ?? tool.screenshot} alt={`${tool.name} interface`} />
            </div>
          ) : (
            <div className="shot grid place-items-center aspect-[16/10]" style={{ background: 'var(--surface)' }}>
              <svg width="64" height="64" viewBox="0 0 44 44" aria-hidden="true">
                <circle cx="22" cy="22" r="18" fill="none" stroke="var(--border-strong)" strokeWidth="2" />
                <line x1="22" y1="22" x2="22" y2="11" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" />
                <line x1="22" y1="22" x2="30" y2="26" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          )}
        </div>
      </section>

      {/* Research connection */}
      <section className="sect">
        <div
          className="card !p-[22px]"
          style={{
            borderLeft: `2px solid ${tool.researchModel === 'against-feed' ? 'var(--c-archive)' : tool.researchModel === 'with-feed' ? 'var(--c-feed)' : 'var(--border-strong)'}`,
            borderRadius: '0 16px 16px 0',
          }}
        >
          <p className="eyebrow">Research connection</p>
          <p className="sec mt-2 max-w-[700px]">
            {tool.researchNote} <Link href="/research">Read the research →</Link>
          </p>
        </div>
      </section>

      {/* Related tools */}
      {related.length > 0 && (
        <section className="sect">
          <p className="eyebrow mb-3">Related tools</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/${r.slug}`} className="toolcard no-underline">
                <div className="thumb"><img src={r.screenshot} alt={`${r.name} interface`} loading="lazy" /></div>
                <div className="flex flex-col gap-[5px] px-[15px] pt-[13px] pb-[15px]">
                  <div className="flex items-center gap-2">
                    <h3 style={{ color: 'var(--text-primary)' }}>{r.name}</h3>
                    <StatusChip status={r.status} className="ml-auto" />
                  </div>
                  <p className="ter">{r.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Feedback */}
      <section className="sect">
        <div className="card !p-6 md:!p-7 grid grid-cols-1 md:grid-cols-2 gap-7 items-start">
          <div>
            <h3 className="text-[16px]">Something broken? Something missing?</h3>
            <p className="sec mt-2 max-w-[420px]">
              Input from the classroom shapes what gets built next.
            </p>
          </div>
          <FeedbackForm
            githubRepo={tool.githubUrl ? tool.githubUrl.replace('https://github.com/', '') : 'ohwowgreat/classroomtools.io'}
          />
        </div>
      </section>

    </div>
  )
}
