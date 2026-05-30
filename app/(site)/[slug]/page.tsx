import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTools, researchModelLabel } from '@/data/tools'
import type { ResearchModel } from '@/data/tools'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getTools().map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tool = getTools().find((t) => t.slug === slug)
  if (!tool) return {}
  return {
    title: `${tool.name} | classroomtools.io`,
    description: tool.description,
  }
}

const modelTag: Record<ResearchModel, string> = {
  'with-feed': 'text-feed-600 bg-feed-50',
  'against-feed': 'text-archive-600 bg-archive-50',
  both: 'text-stone-500 bg-stone-100',
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params
  const tool = getTools().find((t) => t.slug === slug)
  if (!tool) notFound()

  return (
    <div className="pt-24 pb-32">
      {/* Chapter header */}
      <div className="mx-auto max-w-6xl px-6 mb-16">
        <div className="grid sm:grid-cols-12 gap-x-8">
          <div className="sm:col-span-8">
            <Link
              href="/#tools"
              className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-400 hover:text-stone-700 transition-colors mb-8 inline-block"
            >
              ← All tools
            </Link>
            <div className="mb-5">
              <span className={`font-mono text-[9px] uppercase tracking-[0.12em] px-2.5 py-1.5 rounded ${modelTag[tool.researchModel]}`}>
                {researchModelLabel[tool.researchModel]}
              </span>
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-stone-900 mb-5">
              {tool.name}
            </h1>
            <p className="text-lg text-stone-500 leading-relaxed">{tool.tagline}</p>
          </div>
        </div>
        <div className="h-px bg-stone-200 mt-12" />
      </div>

      {/* Body */}
      <div className="mx-auto max-w-2xl px-6">
        <div className="mb-12">
          <p className="text-stone-600 leading-relaxed text-[15px]">{tool.description}</p>
        </div>

        {/* Research connection */}
        <div className="border-l-2 border-stone-200 pl-6 mb-12">
          <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-stone-400 mb-3">
            Research connection
          </p>
          <p className="text-sm text-stone-600 leading-relaxed mb-4">{tool.researchNote}</p>
          <Link
            href="/research"
            className="font-mono text-[10px] uppercase tracking-[0.12em] text-stone-400 hover:text-stone-700 underline underline-offset-4 transition-colors"
          >
            Read the research →
          </Link>
        </div>

        {/* CTA */}
        {tool.status === 'live' && tool.externalUrl ? (
          <Link
            href={`/${slug}/use`}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-stone-900 border border-stone-900 px-5 py-3 hover:bg-stone-900 hover:text-stone-50 transition-colors duration-200"
          >
            Launch tool →
          </Link>
        ) : (
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-stone-400">
            {tool.status === 'coming-soon' ? 'This tool is in development.' : 'Hosted here — interactive version coming soon.'}
          </p>
        )}
      </div>
    </div>
  )
}
