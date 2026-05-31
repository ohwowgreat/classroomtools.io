import Nav from '@/components/Nav'
import Link from 'next/link'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-[13px]">

      {/* Site title — sits above both columns, same left edge as nav */}
      <div className="fixed top-0 left-0 right-0 h-9 flex items-center px-3 bg-white z-10">
        <Link href="/" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 'bold' }}>
          classroomtools.io
        </Link>
      </div>

      {/* Two-column layout below title */}
      <div className="flex" style={{ marginTop: '2.25rem' }}>

        {/* Fixed left nav — starts at same y as content */}
        <aside
          className="fixed left-0 w-28 px-3 pt-3 overflow-y-auto"
          style={{ top: '2.25rem', height: 'calc(100vh - 2.25rem)' }}
        >
          <Nav />
        </aside>

        {/* Scrollable content — same top padding as nav */}
        <main className="ml-28 flex-1 pt-3 pr-10 pb-16 max-w-2xl">
          {children}
        </main>

      </div>
    </div>
  )
}
