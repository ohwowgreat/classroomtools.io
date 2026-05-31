import Link from 'next/link'
import { getTools } from '@/data/tools'

export default function Nav() {
  const tools = getTools()

  return (
    <nav className="space-y-4 text-[13px]">
      <div>
        <div className="text-gray-400 mb-1">Tools</div>
        <ul className="space-y-0.5 list-none p-0 m-0">
          {tools.map((tool) => (
            <li key={tool.slug} className="flex items-center gap-1.5">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: tool.status === 'live' ? '#22c55e' : '#eab308' }}
              />
              {tool.status === 'coming-soon' ? (
                <span className="text-gray-400">{tool.name}</span>
              ) : (
                <Link href={`/${tool.slug}`}>{tool.name}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul className="space-y-0.5 list-none p-0 m-0">
          <li><Link href="/research">Research</Link></li>
        </ul>
      </div>
    </nav>
  )
}
