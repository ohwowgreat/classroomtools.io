'use client'

import { useState } from 'react'

interface Props {
  githubRepo: string // e.g. "ohwowgreat/close-reader"
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
        <button
          type="button"
          onClick={() => setType('feature')}
          className={`font-mono text-[9px] uppercase tracking-[0.12em] px-3 py-1.5 border transition-colors ${
            type === 'feature'
              ? 'bg-stone-900 text-stone-50 border-stone-900'
              : 'text-stone-400 border-stone-200 hover:border-stone-400 hover:text-stone-700'
          }`}
        >
          Feature request
        </button>
        <button
          type="button"
          onClick={() => setType('bug')}
          className={`font-mono text-[9px] uppercase tracking-[0.12em] px-3 py-1.5 border transition-colors ${
            type === 'bug'
              ? 'bg-stone-900 text-stone-50 border-stone-900'
              : 'text-stone-400 border-stone-200 hover:border-stone-400 hover:text-stone-700'
          }`}
        >
          Bug report
        </button>
      </div>

      {/* Title */}
      <div>
        <label className="block font-mono text-[9px] uppercase tracking-[0.12em] text-stone-400 mb-2">
          {type === 'bug' ? 'What went wrong?' : 'What would you like to see?'}
        </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={placeholders[type].title}
          className="w-full text-sm border border-stone-200 px-3 py-2.5 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-400 bg-white"
        />
      </div>

      {/* Body */}
      <div>
        <label className="block font-mono text-[9px] uppercase tracking-[0.12em] text-stone-400 mb-2">
          {type === 'bug' ? 'More detail' : 'Context'}
          <span className="text-stone-300 ml-1 normal-case tracking-normal font-sans">(optional)</span>
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={placeholders[type].body}
          rows={3}
          className="w-full text-sm border border-stone-200 px-3 py-2.5 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-400 bg-white resize-none"
        />
      </div>

      <div className="flex items-center gap-5 flex-wrap">
        <button
          type="submit"
          className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-900 border border-stone-900 px-5 py-2.5 hover:bg-stone-900 hover:text-stone-50 active:scale-[0.98] transition-all duration-150"
        >
          Open on GitHub ↗
        </button>
        <p className="text-[11px] text-stone-400 leading-relaxed">
          Opens a pre-filled GitHub issue. A free account is needed to submit.
        </p>
      </div>
    </form>
  )
}
