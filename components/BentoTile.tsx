import Link from 'next/link'
import type { Tool } from '@/data/tools'

interface Props {
  tool: Tool
  featured?: boolean
}

export default function BentoTile({ tool, featured }: Props) {
  const isComingSoon = tool.status === 'coming-soon'

  if (isComingSoon) {
    return (
      <div className="h-full p-8 flex flex-col bg-stone-50 min-h-[200px]">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-stone-300 mb-auto">
          In development
        </p>
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl text-stone-300 leading-tight tracking-tight mb-2">
            {tool.name}
          </h3>
          <p className="text-sm text-stone-300 leading-snug">{tool.tagline}</p>
        </div>
      </div>
    )
  }

  return (
    <Link href={`/${tool.slug}`} className="group block h-full">
      <article
        className={`h-full flex flex-col min-h-[200px] transition-colors duration-200 ${
          featured
            ? 'bg-stone-900 hover:bg-[#1c1917] p-9 sm:p-10 lg:p-12'
            : 'bg-[#faf8f5] hover:bg-stone-100 p-8'
        }`}
      >
        <p
          className={`font-mono text-[9px] uppercase tracking-[0.18em] mb-auto ${
            featured ? 'text-stone-600' : 'text-stone-400'
          }`}
        >
          Live
        </p>

        <div className="mt-8">
          <h3
            className={`font-serif leading-tight tracking-tight mb-3 ${
              featured
                ? 'text-stone-100 text-4xl sm:text-5xl lg:text-6xl'
                : 'text-stone-900 text-2xl sm:text-3xl'
            }`}
          >
            {tool.name}
          </h3>
          <p
            className={`text-sm leading-relaxed ${
              featured ? 'text-stone-400 max-w-xs' : 'text-stone-500'
            }`}
          >
            {featured ? tool.description : tool.tagline}
          </p>
        </div>

        <div
          className={`mt-8 flex justify-end transition-transform duration-200 group-hover:translate-x-1 ${
            featured ? 'text-stone-500' : 'text-stone-300 group-hover:text-stone-700'
          }`}
        >
          →
        </div>
      </article>
    </Link>
  )
}
