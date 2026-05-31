import Link from 'next/link'
import { getTools } from '@/data/tools'

export default function Nav() {
  const tools = getTools()

  return (
    <nav className="text-[13px] space-y-4">
      {/* Site title — plain black, no underline */}
      <div>
        <Link href="/" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 'bold' }}>
          classroomtools.io
        </Link>
      </div>

      {/* Tools */}
      <div>
        <div className="text-gray-400 mb-1">Tools</div>
        <ul className="space-y-0.5 list-none p-0 m-0">
          {tools.map((tool) => (
            <li key={tool.slug}>
              {tool.status === 'coming-soon' ? (
                <span className="text-gray-400">{tool.name}</span>
              ) : (
                <Link href={`/${tool.slug}`}>{tool.name}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Other */}
      <div>
        <ul className="space-y-0.5 list-none p-0 m-0">
          <li><Link href="/research">Research</Link></li>
        </ul>
      </div>
    </nav>
  )
}
