import Link from 'next/link'
import { getTools } from '@/data/tools'
import FeedbackForm from '@/components/FeedbackForm'

export default function HomePage() {
  const tools = getTools()

  return (
    <div className="space-y-8">

      <section>
        <p className="text-gray-500 mb-2">Teaching After the Feed / Action Research</p>
        <p>
          Research-driven tools for teaching in algorithmic culture.
          Built from an ongoing inquiry into how students learn through
          algorithmically curated media, and what teachers can do about it.{' '}
          <Link href="/research">About the research.</Link>
        </p>
      </section>

      <section>
        <p className="font-bold mb-2">Tools</p>
        <table className="w-full text-left border-collapse">
          <tbody>
            {tools.map(tool => (
              <tr key={tool.slug} className="border-t border-gray-200">
                <td className="py-1 pr-6 whitespace-nowrap">
                  {tool.status === 'live'
                    ? <Link href={`/${tool.slug}`}>{tool.name}</Link>
                    : <span className="text-gray-400">{tool.name}</span>}
                </td>
                <td className="py-1 pr-6 text-gray-400">{tool.tagline}</td>
                <td className="py-1 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: tool.status === 'live' ? '#22c55e' : '#eab308' }}
                    />
                    <span className="text-gray-400 text-xs">
                      {tool.status === 'live' ? 'Live' : 'In Development'}
                    </span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <p className="font-bold mb-2">Suggest a tool</p>
        <p className="text-gray-500 mb-4">
          New tools come from real classroom problems. Describe something
          that feels broken, repetitive, or missing. Not every idea becomes
          a tool, but every idea is read.
        </p>
        <FeedbackForm githubRepo="ohwowgreat/classroomtools.io" defaultType="feature" />
      </section>

    </div>
  )
}
