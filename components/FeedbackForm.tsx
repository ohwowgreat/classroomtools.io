'use client'

import { useState } from 'react'

interface Props {
  githubRepo: string
  defaultType?: 'feature' | 'bug'
}

export default function FeedbackForm({ githubRepo, defaultType = 'feature' }: Props) {
  const [type, setType] = useState<'feature' | 'bug'>(defaultType)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    const params = new URLSearchParams({
      title: title.trim(),
      body: body.trim(),
      labels: type === 'bug' ? 'bug' : 'enhancement',
    })
    window.open(
      `https://github.com/${githubRepo}/issues/new?${params.toString()}`,
      '_blank',
      'noopener,noreferrer'
    )
    setTitle('')
    setBody('')
  }

  const placeholders = {
    feature: {
      title: 'e.g. Allow students to export their annotations',
      body: 'Describe what you need and why it would help in the classroom.',
    },
    bug: {
      title: 'e.g. Submit button unresponsive on iPad',
      body: 'What happened? What did you expect? Which device and browser?',
    },
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Type toggle */}
      <div className="flex gap-2">
        {(['feature', 'bug'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`text-xs px-3 py-1 border transition-colors ${
              type === t
                ? 'bg-gray-900 text-white border-gray-900'
                : 'text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700'
            }`}
          >
            {t === 'feature' ? 'Feature request' : 'Bug report'}
          </button>
        ))}
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1.5">
          {type === 'bug' ? 'What went wrong?' : 'What would you like to see?'}
        </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={placeholders[type].title}
          className="w-full text-sm border border-gray-200 px-3 py-2 text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1.5">
          {type === 'bug' ? 'More detail' : 'Context'}{' '}
          <span className="text-gray-300">(optional)</span>
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={placeholders[type].body}
          rows={3}
          className="w-full text-sm border border-gray-200 px-3 py-2 text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 resize-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="text-sm border border-gray-900 px-4 py-2 hover:bg-gray-900 hover:text-white transition-colors"
        >
          Open on GitHub ↗
        </button>
        <p className="text-xs text-gray-400">A GitHub account is needed to submit.</p>
      </div>
    </form>
  )
}
