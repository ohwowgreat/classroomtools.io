import Link from 'next/link'
import { getTools } from '@/data/tools'

export default function Nav() {
  const tools = getTools()
  const researchTools = tools.filter(t => t.category === 'research')
  const educationTools = tools.filter(t => t.category === 'education')

  const renderTool = (tool: ReturnType<typeof getTools>[number]) => (
    <li key={tool.slug}>
      {tool.status === 'coming-soon' ? (
        <span className="text-gray-400">{tool.name}</span>
      ) : (
        <Link href={`/${tool.slug}`}>{tool.name}</Link>
      )}
    </li>
  )

  return (
    <nav className="space-y-4 text-[13px]">
      <div>
        <div className="text-gray-400 mb-1">Tools</div>
        <ul className="space-y-0.5 list-none p-0 m-0">
          {researchTools.map(renderTool)}
        </ul>
      </div>

      <div>
        <div className="text-gray-400 mb-1">Also</div>
        <ul className="space-y-0.5 list-none p-0 m-0">
          {educationTools.map(renderTool)}
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
