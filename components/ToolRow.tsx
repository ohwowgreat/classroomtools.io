import Link from 'next/link'
import type { Tool } from '@/data/tools'

interface Props {
  tool: Tool
  index: number
}

export default function ToolRow({ tool, index }: Props) {
  const href = `/${tool.slug}`

  return (
    <article className="group border-t border-stone-200 last:border-b">
      <Link
        href={href}
        className="flex items-start gap-6 py-7 px-1 hover:bg-stone-50/70 transition-colors duration-200 sm:items-center"
      >
        <span className="font-mono text-[10px] text-stone-300 tracking-widest shrink-0 pt-1 sm:pt-0 w-6">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-xl sm:text-2xl text-stone-900 leading-tight tracking-tight group-hover:text-stone-500 transition-colors duration-200">
            {tool.name}
          </h3>
          <p className="text-sm text-stone-400 mt-1 leading-snug">{tool.tagline}</p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          {tool.status === 'coming-soon' && (
            <span className="font-mono text-[9px] uppercase tracking-widest text-stone-300 hidden sm:block">
              Soon
            </span>
          )}
          <span className="text-stone-300 group-hover:text-stone-900 group-hover:translate-x-1 transition-all duration-200">
            →
          </span>
        </div>
      </Link>
    </article>
  )
}
