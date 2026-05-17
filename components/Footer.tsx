import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-stone-200">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link
          href="/"
          className="font-mono text-sm text-stone-400 hover:text-stone-700 transition-colors"
        >
          classroomtools.io
        </Link>
        <p className="text-xs text-stone-400">
          Tools built from{' '}
          <Link href="/research" className="underline underline-offset-2 hover:text-stone-600 transition-colors">
            Teaching After the Feed
          </Link>
          {', an action research project.'}
        </p>
      </div>
    </footer>
  )
}
