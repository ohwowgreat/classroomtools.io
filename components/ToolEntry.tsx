// Warm Swiss — Swiss grid structure, warm-modern hover and palette
import Link from 'next/link'
import type { Tool } from '@/data/tools'

interface Props {
  tool: Tool
  index: number
}

export default function ToolEntry({ tool, index }: Props) {
  const isComingSoon = tool.status === 'coming-soon'
  const num = String(index + 1).padStart(2, '0')

  if (isComingSoon) {
    return (
      <div className="grid grid-cols-12 gap-x-6 sm:gap-x-8 items-baseline border-t border-stone-200 py-7 px-1">
        <span className="col-span-1 font-mono text-[10px] tabular-nums tracking-widest text-stone-200 self-start pt-0.5">
          {num}
        </span>
        <div className="col-span-9 sm:col-span-10">
          <p className="font-serif text-2xl sm:text-[1.625rem] leading-tight tracking-tight text-stone-300 mb-1">
            {tool.name}
          </p>
          <p className="text-[13px] text-stone-300 leading-relaxed">{tool.tagline}</p>
        </div>
        <div className="col-span-2 sm:col-span-1 text-right self-start pt-0.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-stone-300">
            Soon
          </span>
        </div>
      </div>
    )
  }

  return (
    <Link
      href={`/${tool.slug}`}
      className="group grid grid-cols-12 gap-x-6 sm:gap-x-8 items-baseline border-t border-stone-200 py-7 px-1 hover:bg-[#fdf6ef] transition-colors duration-200"
    >
      <span className="col-span-1 font-mono text-[10px] tabular-nums tracking-widest text-stone-300 group-hover:text-stone-400 transition-colors duration-200 self-start pt-0.5">
        {num}
      </span>
      <div className="col-span-9 sm:col-span-10">
        <p className="font-serif text-2xl sm:text-[1.625rem] leading-tight tracking-tight text-stone-900 group-hover:text-stone-600 transition-colors duration-200 mb-1">
          {tool.name}
        </p>
        <p className="text-[13px] text-stone-500 leading-relaxed">{tool.tagline}</p>
      </div>
      <div className="col-span-2 sm:col-span-1 text-right self-start pt-1 flex flex-col items-end gap-1.5">
        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-stone-400">
          Live
        </span>
        <span className="text-stone-300 group-hover:text-stone-700 group-hover:translate-x-0.5 inline-block transition-all duration-200 text-sm">
          →
        </span>
      </div>
    </Link>
  )
}
