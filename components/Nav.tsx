import Link from 'next/link'

export default function Nav() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-6 h-11 flex items-center justify-between">
        <Link href="/" className="text-sm font-medium hover:underline">
          classroomtools.io
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/#tools" className="text-sm text-gray-500 hover:text-gray-900 hover:underline">
            Tools
          </Link>
          <Link href="/research" className="text-sm text-gray-500 hover:text-gray-900 hover:underline">
            Research
          </Link>
        </nav>
      </div>
    </header>
  )
}
