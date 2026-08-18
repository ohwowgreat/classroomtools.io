import type { ResearchModel, ToolStatus } from '@/data/tools'
import { researchModelLabel } from '@/data/tools'

export function StatusChip({ status, className = '' }: { status: ToolStatus; className?: string }) {
  const cls =
    status === 'live' ? 'chip-ok' :
    status === 'testing' ? 'chip-acc' :
    'chip-neutral'
  const label =
    status === 'live' ? 'Live' :
    status === 'testing' ? 'Testing' :
    'In development'
  return <span className={`chip ${cls} ${className}`}>{label}</span>
}

export function ModelChip({ model, long = false, className = '' }: { model: ResearchModel; long?: boolean; className?: string }) {
  const cls =
    model === 'with-feed' ? 'chip-feed' :
    model === 'against-feed' ? 'chip-archive' :
    'chip-neutral'
  const label = long
    ? model === 'both' ? 'Either model' : `Teaching ${researchModelLabel[model].toLowerCase()}`
    : researchModelLabel[model]
  return <span className={`chip ${cls} ${className}`}>{label}</span>
}
