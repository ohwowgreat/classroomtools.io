import Link from 'next/link'
import { getTools } from '@/data/tools'
import FeedbackForm from '@/components/FeedbackForm'

export default function HomePage() {
  const tools = getTools()
  const researchTools = tools.filter(t => t.category === 'research')
  const educationTools = tools.filter(t => t.category === 'education')

  const renderRows = (list: typeof tools) => list.map(tool => (
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
  ))

  return (
    <div className="space-y-8">

      <section>
        <p className="mb-3">
          classroomtools.io is a collection of tools for teachers, built by Doğan Arslanoğlu.
          It started as a practical side of an action research project on how students learn
          in algorithmically curated environments, and grew into something more open: tools
          that any teacher can use, regardless of whether they are following the research.
        </p>
        <p>
          Some tools come directly from the research. Others are just useful.
          All of them came from a real classroom problem.{' '}
          <Link href="/research">About the research.</Link>
        </p>
      </section>

      <section>
        <p className="font-bold mb-2">Tools</p>
        <table className="w-full text-left border-collapse">
          <tbody>{renderRows(researchTools)}</tbody>
        </table>
      </section>

      <section>
        <p className="font-bold mb-2">Additional classroom tools</p>
        <table className="w-full text-left border-collapse">
          <tbody>{renderRows(educationTools)}</tbody>
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
