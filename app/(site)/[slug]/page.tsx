import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTools, researchModelLabel } from '@/data/tools'
import type { ResearchModel } from '@/data/tools'
import GitHubLink from '@/components/GitHubLink'
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

const modelColors: Record<ResearchModel, string> = {
  'with-feed':    'text-amber-700 bg-amber-50',
  'against-feed': 'text-slate-600 bg-slate-50',
  both:           'text-gray-500 bg-gray-50',
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params
  const tool = getTools().find((t) => t.slug === slug)
  if (!tool) notFound()

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link
        href="/#tools"
        className="text-sm text-gray-400 hover:text-gray-700 underline underline-offset-2 inline-block mb-10"
      >
        ← All tools
      </Link>

      {/* Header */}
      <div className="max-w-2xl mb-10">
        <div className="mb-3">
          <span className={`text-xs px-2 py-0.5 ${modelColors[tool.researchModel]}`}>
            {researchModelLabel[tool.researchModel]}
          </span>
        </div>
        <h1 className="text-2xl font-medium mb-2">{tool.name}</h1>
        <p className="text-sm text-gray-500">{tool.tagline}</p>
      </div>

      <div className="max-w-2xl space-y-10">

        {/* Description */}
        <p className="text-sm text-gray-700 leading-relaxed">{tool.description}</p>

        {/* Research connection */}
        <div className="border-l-2 border-gray-200 pl-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Research connection</p>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">{tool.researchNote}</p>
          <Link
            href="/research"
            className="text-sm text-gray-400 underline underline-offset-2 hover:text-gray-700"
          >
            Read the research →
          </Link>
        </div>

        {/* CTA + GitHub */}
        <div className="flex items-center gap-6 flex-wrap">
          {tool.status === 'live' && tool.externalUrl ? (
            <Link
              href={`/${slug}/use`}
              className="text-sm border border-gray-900 px-4 py-2 hover:bg-gray-900 hover:text-white transition-colors"
            >
              Launch tool →
            </Link>
          ) : (
            <span className="text-sm text-gray-400">
              {tool.status === 'coming-soon' ? 'In development.' : 'Interactive version coming soon.'}
            </span>
          )}
          {tool.githubUrl && (
            <GitHubLink href={tool.githubUrl} label="View source on GitHub" />
          )}
        </div>

        {/* Feedback */}
        {tool.githubUrl && (
          <div className="border-t border-gray-100 pt-10">
            <h2 className="text-xs text-gray-400 uppercase tracking-widest mb-2">Feedback</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Something broken? Something missing? These tools are actively developed —
              input from the classroom shapes what gets built next.
            </p>
            <FeedbackForm
              githubRepo={tool.githubUrl.replace('https://github.com/', '')}
            />
          </div>
        )}

      </div>
    </div>
  )
}
