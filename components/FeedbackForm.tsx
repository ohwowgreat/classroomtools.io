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

  function buildEmailHref() {
    const subject = encodeURIComponent(`[${type === 'bug' ? 'Bug' : 'Feature'}] ${title.trim()}`)
    const bodyText = encodeURIComponent(body.trim() || '(no additional context)')
    return `mailto:dogan.arslanoglu@bnds.cn?subject=${subject}&body=${bodyText}`
  }

  function handleGitHub(e: React.FormEvent) {
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
      body: 'Describe what you need and why it would help.',
    },
    bug: {
      title: 'e.g. Submit button unresponsive on iPad',
      body: 'What happened? What did you expect? Device and browser?',
    },
  }

  return (
    <form onSubmit={handleGitHub} className="space-y-3" style={{ maxWidth: '400px' }}>
      <div>
        <label className="mr-3">
          <input
            type="radio"
            name="type"
            value="feature"
            checked={type === 'feature'}
            onChange={() => setType('feature')}
            className="mr-1"
          />
          Feature request
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="bug"
            checked={type === 'bug'}
            onChange={() => setType('bug')}
            className="mr-1"
          />
          Bug report
        </label>
      </div>

      <div>
        <label className="block text-gray-500 mb-1">
          {type === 'bug' ? 'What went wrong?' : 'What would you like to see?'}
        </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={placeholders[type].title}
          className="w-full border border-gray-300 px-2 py-1"
          style={{ fontSize: '13px' }}
        />
      </div>

      <div>
        <label className="block text-gray-500 mb-1">
          {type === 'bug' ? 'More detail' : 'Context'} (optional)
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={placeholders[type].body}
          rows={3}
          className="w-full border border-gray-300 px-2 py-1 resize-none"
          style={{ fontSize: '13px' }}
        />
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <a
          href={title.trim() ? buildEmailHref() : undefined}
          onClick={!title.trim() ? (e) => e.preventDefault() : undefined}
          className="border border-gray-400 px-3 py-1 bg-gray-50 hover:bg-gray-100"
          style={{ fontSize: '13px', textDecoration: 'none', color: 'inherit', opacity: title.trim() ? 1 : 0.4, cursor: title.trim() ? 'pointer' : 'default' }}
        >
          Submit via email
        </a>
        <button
          type="submit"
          className="border border-gray-300 px-3 py-1 hover:bg-gray-50 text-gray-500"
          style={{ fontSize: '13px' }}
        >
          Submit on GitHub ↗
        </button>
      </div>
    </form>
  )
}
