import Link from 'next/link'
import Mark from '@/components/Mark'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <a className="index-skip" href="#main">Skip to content</a>
      <header className="index-header">
        <nav className="index-wrap index-nav" aria-label="Main navigation">
          <Link href="/" className="index-brand">
            <Mark size={22} />
            <span>classroomtools<span className="index-brand-suffix">.io</span></span>
          </Link>
          <div className="index-nav-links">
            <Link href="/#tools">Tools</Link>
            <Link href="/research">Research</Link>
            <a href="https://github.com/ohwowgreat/classroomtools.io" target="_blank" rel="noopener noreferrer" className="index-github">GitHub <span aria-hidden="true">↗</span></a>
          </div>
          <Link href="/#suggest" className="index-nav-cta">Suggest a tool</Link>
        </nav>
      </header>
      <main className="flex-1" id="main">{children}</main>
      <footer className="index-wrap index-footer">
        <p>Doğan Arslanoğlu <span aria-hidden="true">·</span> Built from real classroom work.</p>
        <div>
          <Link href="/#tools">Tools</Link>
          <Link href="/research">Research</Link>
          <a href="https://github.com/ohwowgreat/classroomtools.io" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        </div>
      </footer>
    </div>
  )
}
