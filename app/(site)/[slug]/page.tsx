import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTools, researchModelLabel } from '@/data/tools'
import FeedbackForm from '@/components/FeedbackForm'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getTools().map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tool = getTools().find((t) => t.slug === slug)
  if (!tool) return {}
  return {
    title: `${tool.name} | classroomtools.io`,
    description: tool.description,
  }
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params
  const tool = getTools().find((t) => t.slug === slug)
  if (!tool) notFound()

  return (
    <div className="space-y-6 py-2">

      <p><Link href="/">← Index</Link></p>

      <section>
        <h1 className="font-bold text-base mb-1">{tool.name}</h1>
        <p className="text-gray-500 mb-3">{researchModelLabel[tool.researchModel]}</p>
        <p className="mb-3">{tool.description}</p>
      </section>

      <section>
        <p className="font-bold mb-1">Research connection</p>
        <p className="text-gray-600 mb-2">{tool.researchNote}</p>
        <p><Link href="/research">Read the research.</Link></p>
      </section>

      <section>
        {tool.status === 'live' && tool.externalUrl ? (
          <p>
            <Link href={`/${slug}/use`}>Launch {tool.name} →</Link>
            {tool.githubUrl && (
              <> &nbsp;·&nbsp; <Link href={tool.githubUrl} target="_blank" rel="noopener noreferrer">Source on GitHub</Link></>
            )}
          </p>
        ) : (
          <p className="text-gray-400">
            {tool.status === 'coming-soon' ? 'In development.' : 'Interactive version coming soon.'}
            {tool.githubUrl && (
              <> &nbsp;·&nbsp; <Link href={tool.githubUrl} target="_blank" rel="noopener noreferrer">Source on GitHub</Link></>
            )}
          </p>
        )}
      </section>

      {tool.githubUrl && (
        <section>
          <p className="font-bold mb-2">Feedback</p>
          <p className="text-gray-500 mb-4">
            Something broken? Something missing? Input from the classroom
            shapes what gets built next.
          </p>
          <FeedbackForm
            githubRepo={tool.githubUrl.replace('https://github.com/', '')}
          />
        </section>
      )}

    </div>
  )
}
