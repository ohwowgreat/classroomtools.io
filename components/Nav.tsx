import Link from 'next/link'

export default function Nav() {
  return (
    <header className="border-b border-stone-200 bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-2xl tracking-wide text-stone-900 hover:text-stone-500 transition-colors"
        >
          classroomtools.io
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            href="/research"
            className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            Research
          </Link>
          <Link
            href="/#tools"
            className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            Tools
          </Link>
        </nav>
      </div>
    </header>
  )
}
