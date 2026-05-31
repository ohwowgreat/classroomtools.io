import Link from 'next/link'
import type { Tool } from '@/data/tools'

const modelLabel: Record<string, string> = {
  'with-feed':    'With feed',
  'against-feed': 'Against feed',
  both:           'Both models',
}

interface Props {
  tool: Tool
  index: number
}

export default function ToolEntry({ tool }: Props) {
  const isComingSoon = tool.status === 'coming-soon'

  if (isComingSoon) {
    return (
      <div className="flex items-baseline justify-between py-3 border-b border-gray-100">
        <div className="flex items-baseline gap-8 min-w-0">
          <span className="text-sm text-gray-300 truncate">{tool.name}</span>
          <span className="text-xs text-gray-300 hidden sm:block shrink-0">{modelLabel[tool.researchModel]}</span>
        </div>
        <span className="text-xs text-gray-300 shrink-0 ml-4">Soon</span>
      </div>
    )
  }

  return (
    <Link
      href={`/${tool.slug}`}
      className="flex items-baseline justify-between py-3 border-b border-gray-100 hover:bg-gray-50 -mx-2 px-2 group"
    >
      <div className="flex items-baseline gap-8 min-w-0">
        <span className="text-sm underline underline-offset-2 decoration-gray-300 group-hover:decoration-gray-600 truncate">
          {tool.name}
        </span>
        <span className="text-xs text-gray-400 hidden sm:block shrink-0">{modelLabel[tool.researchModel]}</span>
      </div>
      <div className="flex items-center gap-3 shrink-0 ml-4">
        <span className="text-xs text-gray-400">Live</span>
        <span className="text-gray-300 group-hover:text-gray-600 text-sm">→</span>
      </div>
    </Link>
  )
}
