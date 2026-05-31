import Link from 'next/link'
import { getTools } from '@/data/tools'
import FeedbackForm from '@/components/FeedbackForm'

export default function HomePage() {
  const tools = getTools()
  const live = tools.filter(t => t.status === 'live')
  const soon = tools.filter(t => t.status === 'coming-soon')

  return (
    <div className="space-y-8 py-2">

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
            {live.map(tool => (
              <tr key={tool.slug} className="border-t border-gray-200">
                <td className="py-1 pr-6">
                  <Link href={`/${tool.slug}`}>{tool.name}</Link>
                </td>
                <td className="py-1 text-gray-400">{tool.tagline}</td>
              </tr>
            ))}
            {soon.map(tool => (
              <tr key={tool.slug} className="border-t border-gray-200">
                <td className="py-1 pr-6 text-gray-400">{tool.name}</td>
                <td className="py-1 text-gray-400">{tool.tagline} <em>(coming soon)</em></td>
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
