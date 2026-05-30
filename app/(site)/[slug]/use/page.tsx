import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTools, researchModelLabel } from '@/data/tools'
import type { ResearchModel } from '@/data/tools'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getTools()
    .filter((t) => t.status === 'live' && t.externalUrl)
    .map((t) => ({ slug: t.slug }))
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

export default async function ToolUsePage({ params }: Props) {
  const { slug } = await params
  const tool = getTools().find((t) => t.slug === slug)
  if (!tool || !tool.externalUrl) notFound()

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 3.5rem)' }}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-5 border-b border-stone-200 bg-stone-50 shrink-0 h-11">
        <div className="flex items-center gap-4">
          <Link
            href={`/${slug}`}
            className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-400 hover:text-stone-700 transition-colors"
          >
            ← About
          </Link>
          <span className="text-stone-200 select-none">|</span>
          <span className="font-serif text-base text-stone-800">{tool.name}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className={`font-mono text-[9px] uppercase tracking-[0.1em] px-2 py-1 rounded hidden sm:block ${modelTag[tool.researchModel]}`}>
            {researchModelLabel[tool.researchModel]}
          </span>
          <a
            href={tool.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.12em] text-stone-400 hover:text-stone-700 transition-colors"
          >
            Open in new tab ↗
          </a>
        </div>
      </div>

      {/* Tool iframe */}
      <iframe
        src={tool.externalUrl}
        className="flex-1 w-full border-0"
        title={tool.name}
        allow="fullscreen"
      />
    </div>
  )
}
