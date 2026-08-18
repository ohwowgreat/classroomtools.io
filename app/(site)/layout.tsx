import Link from 'next/link'
import Mark from '@/components/Mark'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">

      <nav className="border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
        <div className="wrap h-12 flex items-center gap-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-[14px] font-semibold tracking-[-0.02em] no-underline"
            style={{ color: 'var(--text-primary)' }}
          >
            <Mark />
            classroomtools.io
          </Link>
          <div className="ml-auto flex items-center gap-[18px]">
            <Link href="/#tools" className="navlink hidden sm:block">Tools</Link>
            <Link href="/research" className="navlink hidden sm:block">Research</Link>
            <a
              href="https://github.com/ohwowgreat"
              target="_blank"
              rel="noopener noreferrer"
              className="navlink hidden sm:block"
            >
              GitHub
            </a>
            <Link href="/#suggest" className="btn btn-sm">Suggest a tool</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">{children}</main>

      <footer
        className="border-t pt-8 pb-14 text-[12px]"
        style={{ borderColor: 'var(--border)', color: 'var(--text-tertiary)' }}
      >
        <div className="wrap flex flex-wrap items-center gap-x-[18px] gap-y-2">
          <span>
            Doğan Arslanoğlu · Part of an{' '}
            <Link href="/research" style={{ color: 'var(--text-tertiary)' }}>
              action research project
            </Link>{' '}
            on teaching in algorithmic culture.
          </span>
          <div className="ml-auto flex gap-[14px]">
            <Link href="/#tools" className="navlink">Tools</Link>
            <Link href="/research" className="navlink">Research</Link>
            <a
              href="https://github.com/ohwowgreat"
              target="_blank"
              rel="noopener noreferrer"
              className="navlink"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

    </div>
  )
}
