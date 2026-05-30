'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-stone-200'
          : ''
      }`}
      style={{ backgroundColor: scrolled ? 'rgba(250,248,245,0.96)' : 'transparent', backdropFilter: scrolled ? 'blur(8px)' : 'none' }}
    >
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-lg tracking-tight text-stone-900 hover:text-stone-500 transition-colors"
        >
          classroomtools.io
        </Link>
        <nav className="flex items-center gap-7">
          <Link
            href="/#tools"
            className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500 hover:text-stone-900 transition-colors"
          >
            Tools
          </Link>
          <Link
            href="/research"
            className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500 hover:text-stone-900 transition-colors"
          >
            Research
          </Link>
        </nav>
      </div>
    </header>
  )
}
