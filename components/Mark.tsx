export default function Mark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" aria-hidden="true">
      <line x1="5" y1="16" x2="11" y2="5" stroke="var(--border-strong)" strokeWidth="1.5" />
      <line x1="11" y1="5" x2="17" y2="13" stroke="var(--border-strong)" strokeWidth="1.5" />
      <line x1="5" y1="16" x2="17" y2="13" stroke="var(--border-strong)" strokeWidth="1.5" />
      <circle cx="5" cy="16" r="3" fill="var(--accent)" />
      <circle cx="11" cy="5" r="3" fill="var(--status-warning)" />
      <circle cx="17" cy="13" r="3" fill="var(--c2)" />
    </svg>
  )
}
