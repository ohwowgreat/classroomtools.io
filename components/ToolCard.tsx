import Link from 'next/link'
import type { Tool, ResearchModel } from '@/lib/tools'
import { researchModelLabel } from '@/lib/tools'

const borderClass: Record<ResearchModel, string> = {
  'with-feed': 'border-feed-500',
  'against-feed': 'border-archive-500',
  both: 'border-stone-300',
}

const modelTextClass: Record<ResearchModel, string> = {
  'with-feed': 'text-feed-600',
  'against-feed': 'text-archive-600',
  both: 'text-stone-400',
}

export default function ToolCard({ tool }: { tool: Tool }) {
  const href = tool.externalUrl ?? `/tools/${tool.slug}`
  const isExternal = !!tool.externalUrl

  return (
    <article className={`group flex flex-col pt-6 pb-12 border-t-[3px] ${borderClass[tool.researchModel]}`}>
      {/* Name + status */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-serif text-[1.75rem] leading-tight text-stone-900">
          {tool.name}
        </h3>
        {tool.status === 'coming-soon' && (
          <span className="shrink-0 mt-2 text-[10px] font-mono uppercase tracking-widest text-stone-400 border border-stone-200 px-2 py-0.5">
            Soon
          </span>
        )}
      </div>

      {/* Model label */}
      <p className={`text-[10px] font-mono uppercase tracking-widest mb-5 ${modelTextClass[tool.researchModel]}`}>
        {researchModelLabel[tool.researchModel]}
      </p>

      {/* Description */}
      <p className="text-sm text-stone-500 leading-relaxed mb-7 flex-1">
        {tool.description}
      </p>

      {/* Link */}
      {tool.status === 'live' ? (
        <Link
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 hover:text-stone-500 transition-colors group-hover:gap-2.5"
        >
          {isExternal ? 'Open tool' : 'View tool'}
          <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <span className="text-sm text-stone-400 font-mono">Coming soon</span>
      )}
    </article>
  )
}
