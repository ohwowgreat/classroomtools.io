import Link from 'next/link'
import type { Tool } from '@/data/tools'

export default function ToolCard({ tool }: { tool: Tool }) {
  const href = tool.externalUrl ?? `/tools/${tool.slug}`
  const isExternal = !!tool.externalUrl

  return (
    <article className="group flex flex-col bg-white border border-stone-200 rounded-lg p-6 hover:border-stone-400 hover:shadow-sm transition-all duration-150">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-lg font-semibold text-stone-900 leading-tight">
          {tool.name}
        </h3>
        {tool.status === 'coming-soon' && (
          <span className="shrink-0 text-xs font-medium text-stone-400 border border-stone-200 rounded-full px-2 py-0.5">
            Soon
          </span>
        )}
      </div>

      <p className="text-sm text-stone-500 mb-1">{tool.tagline}</p>
      <p className="text-sm text-stone-600 leading-relaxed mb-5 flex-1">
        {tool.description}
      </p>

      <Link
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="inline-flex items-center gap-1 text-sm font-medium text-stone-900 hover:text-stone-600 transition-colors group-hover:gap-2"
      >
        {isExternal ? 'Open tool' : 'View tool'}
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}
