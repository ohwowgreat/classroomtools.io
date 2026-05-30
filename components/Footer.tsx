import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-10 grid sm:grid-cols-2 gap-8 items-end">
        <div>
          <Link
            href="/"
            className="font-serif text-xl tracking-tight text-stone-900 hover:text-stone-500 transition-colors block mb-3"
          >
            classroomtools.io
          </Link>
          <p className="text-xs text-stone-400 leading-relaxed max-w-xs">
            Tools built from{' '}
            <Link
              href="/research"
              className="underline underline-offset-2 hover:text-stone-600 transition-colors"
            >
              Teaching After the Feed
            </Link>
            , an action research study in art education.
          </p>
        </div>
        <nav className="flex sm:justify-end gap-8">
          <Link
            href="/#tools"
            className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-400 hover:text-stone-700 transition-colors"
          >
            Tools
          </Link>
          <Link
            href="/research"
            className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-400 hover:text-stone-700 transition-colors"
          >
            Research
          </Link>
        </nav>
      </div>
    </footer>
  )
}
