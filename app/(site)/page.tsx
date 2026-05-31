import Link from 'next/link'
import ToolEntry from '@/components/ToolEntry'
import FeedbackForm from '@/components/FeedbackForm'
import { getTools } from '@/data/tools'

export default function HomePage() {
  const tools = getTools()

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">

      {/* Intro */}
      <section className="max-w-2xl">
        <p className="text-sm text-gray-500 mb-3">Teaching After the Feed / Action Research</p>
        <h1 className="text-xl font-medium mb-4">
          Research-driven tools for teaching in algorithmic culture.
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Students encounter most images through algorithmically curated feeds
          before they encounter them in a classroom. These tools are built from
          an inquiry into what that changes, and what teachers can do about it.{' '}
          <Link href="/research" className="underline underline-offset-2 hover:text-gray-900">
            About the research →
          </Link>
        </p>
      </section>

      {/* Tools */}
      <section id="tools">
        <h2 className="text-xs text-gray-400 uppercase tracking-widest mb-4">Tools</h2>
        <div>
          {tools.map((tool, i) => (
            <ToolEntry key={tool.slug} tool={tool} index={i} />
          ))}
        </div>
      </section>

      {/* Suggest */}
      <section>
        <h2 className="text-xs text-gray-400 uppercase tracking-widest mb-4">Suggest</h2>
        <p className="text-sm text-gray-600 leading-relaxed max-w-lg mb-6">
          New tools here come from real classroom problems. If something in
          your practice feels broken, repetitive, or missing — describe it.
          Not every idea becomes a tool, but every idea is read.
        </p>
        <div className="max-w-lg">
          <FeedbackForm githubRepo="ohwowgreat/classroomtools.io" defaultType="feature" />
        </div>
      </section>

    </div>
  )
}
