'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Tool } from '@/data/tools'
import { StatusChip, ModelChip } from '@/components/Chips'

type Filter = 'all' | 'research' | 'education' | 'with-feed' | 'against-feed'

const filters: { id: Filter; label: string; dot?: string }[] = [
  { id: 'all', label: 'All tools' },
  { id: 'research', label: 'From the research' },
  { id: 'education', label: 'Classroom infrastructure' },
  { id: 'with-feed', label: 'With the feed', dot: 'var(--c-feed)' },
  { id: 'against-feed', label: 'Against the feed', dot: 'var(--c-archive)' },
]

function matches(tool: Tool, f: Filter): boolean {
  switch (f) {
    case 'all': return true
    case 'research': return tool.category === 'research'
    case 'education': return tool.category === 'education'
    case 'with-feed':
      return tool.category === 'research' && (tool.researchModel === 'with-feed' || tool.researchModel === 'both')
    case 'against-feed':
      return tool.category === 'research' && (tool.researchModel === 'against-feed' || tool.researchModel === 'both')
  }
}

function ClockPlaceholder() {
  return (
    <div className="thumb grid place-items-center" style={{ background: 'var(--surface)' }}>
      <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
        <circle cx="22" cy="22" r="18" fill="none" stroke="var(--border-strong)" strokeWidth="2" />
        <line x1="22" y1="22" x2="22" y2="11" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="22" x2="30" y2="26" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function Card({ tool }: { tool: Tool }) {
  return (
    <div className="toolcard">
      <Link href={`/${tool.slug}`} className="block no-underline" aria-label={`About ${tool.name}`}>
        {tool.screenshot
          ? <div className="thumb"><img src={tool.screenshot} alt={`${tool.name} interface`} loading="lazy" /></div>
          : <ClockPlaceholder />}
      </Link>
      <div className="flex flex-col gap-[5px] flex-1 px-[15px] pt-[13px] pb-[15px]">
        <div className="flex items-center gap-2">
          <h3>
            <Link href={`/${tool.slug}`} className="no-underline" style={{ color: 'var(--text-primary)' }}>
              {tool.name}
            </Link>
          </h3>
          <StatusChip status={tool.status} className="ml-auto" />
        </div>
        <p className="ter">{tool.tagline}</p>
        <div className="flex items-center gap-2 mt-[6px]">
          {tool.category === 'education'
            ? <span className="chip chip-neutral">Infrastructure</span>
            : <ModelChip model={tool.researchModel} />}
          {tool.externalUrl && (
            <a
              href={tool.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ter ml-auto"
              style={{ color: 'var(--accent)' }}
            >
              Open ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ToolGrid({ tools }: { tools: Tool[] }) {
  const [filter, setFilter] = useState<Filter>('all')
  const shown = tools.filter((t) => matches(t, filter))

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-[18px]">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`filterchip ${filter === f.id ? 'filterchip-on' : ''}`}
            aria-pressed={filter === f.id}
          >
            {f.dot && <span className="dot" style={{ background: f.dot }} />}
            {f.label}
          </button>
        ))}
        <span className="ter mono ml-auto">
          {shown.length} {shown.length === 1 ? 'tool' : 'tools'}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {shown.map((tool) => <Card key={tool.slug} tool={tool} />)}
      </div>
    </div>
  )
}
