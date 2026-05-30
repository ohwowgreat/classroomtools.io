import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { tools, researchModelLabel } from '@/data/tools'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tool = tools.find((t) => t.slug === slug)
  if (!tool) return {}
  return {
    title: `${tool.name} | classroomtools.io`,
    description: tool.description,
  }
}

const tagStyles = {
  'with-feed': 'bg-feed-100 text-feed-700',
  'against-feed': 'bg-archive-100 text-archive-700',
  both: 'bg-stone-100 text-stone-600',
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params
  const tool = tools.find((t) => t.slug === slug)
  if (!tool) notFound()

  return (
    <div className="mx-auto max-w-2xl px-6 pt-16 pb-24">

      {/* Breadcrumb */}
      <Link
        href="/#tools"
        className="inline-flex items-center gap-1 text-sm text-stone-400 hover:text-stone-700 transition-colors mb-8"
      >
        ← All tools
      </Link>

      {/* Header */}
      <div className="mb-10">
        <span
          className={`inline-block text-xs font-medium rounded-full px-2.5 py-1 mb-4 ${tagStyles[tool.researchModel]}`}
        >
          {researchModelLabel[tool.researchModel]}
        </span>
        <h1 className="text-3xl sm:text-4xl font-semibold text-stone-900 leading-tight tracking-tight mb-3">
          {tool.name}
        </h1>
        <p className="text-lg text-stone-500">{tool.tagline}</p>
      </div>

      {/* Description */}
      <section className="mb-10">
        <p className="text-stone-700 leading-relaxed text-base">{tool.description}</p>
      </section>

      {/* Research connection */}
      <section className="bg-stone-100 rounded-lg p-5 mb-10">
        <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
          Research connection
        </p>
        <p className="text-sm text-stone-700 leading-relaxed">{tool.researchNote}</p>
        <Link
          href="/research"
          className="inline-block mt-3 text-xs text-stone-500 hover:text-stone-800 underline underline-offset-2 transition-colors"
        >
          Read about the research →
        </Link>
      </section>

      {/* CTA */}
      {tool.status === 'live' ? (
        tool.externalUrl ? (
          <a
            href={tool.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-900 border border-stone-900 rounded-full px-5 py-2.5 hover:bg-stone-900 hover:text-stone-50 transition-colors"
          >
            Open tool ↗
          </a>
        ) : (
          <div className="bg-stone-100 border border-stone-200 rounded-lg p-6 text-center">
            <p className="text-sm text-stone-500">
              This tool is hosted here. Interactive version coming soon.
            </p>
          </div>
        )
      ) : (
        <div className="bg-stone-100 border border-stone-200 rounded-lg p-6 text-center">
          <p className="text-sm text-stone-500">This tool is in development.</p>
        </div>
      )}
    </div>
  )
}
