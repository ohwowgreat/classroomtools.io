import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-auto">
      <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
        <p className="text-sm text-gray-400">classroomtools.io</p>
        <p className="text-sm text-gray-400">
          Built from{' '}
          <Link href="/research" className="underline hover:text-gray-700">
            Teaching After the Feed
          </Link>
        </p>
      </div>
    </footer>
  )
}
