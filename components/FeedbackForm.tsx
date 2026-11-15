'use client'

import { useState } from 'react'
import styles from './FeedbackForm.module.css'

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
    <form onSubmit={handleGitHub} className={styles.form}>
      <div className={styles.types} role="group" aria-label="Feedback type">
        <button
          type="button"
          onClick={() => setType('feature')}
          className={styles.typeButton}
          aria-pressed={type === 'feature'}
        >
          Feature request
        </button>
        <button
          type="button"
          onClick={() => setType('bug')}
          className={styles.typeButton}
          aria-pressed={type === 'bug'}
        >
          Bug report
        </button>
      </div>

      <div>
        <label className={styles.label} htmlFor="fb-title">
          {type === 'bug' ? 'What went wrong?' : 'What would you like to see?'}
        </label>
        <input
          id="fb-title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={placeholders[type].title}
          className={styles.field}
        />
      </div>

      <div>
        <label className={styles.label} htmlFor="fb-body">
          {type === 'bug' ? 'More detail' : 'Context'} (optional)
        </label>
        <textarea
          id="fb-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={placeholders[type].body}
          rows={3}
          className={`${styles.field} ${styles.textarea}`}
        />
      </div>

      <div className={styles.actions}>
        <button type="submit" className={`${styles.button} ${styles.primary}`}>Submit on GitHub ↗</button>
        <a
          href={title.trim() ? buildEmailHref() : undefined}
          onClick={!title.trim() ? (e) => e.preventDefault() : undefined}
          className={styles.button}
          aria-disabled={!title.trim()}
        >
          Submit via email
        </a>
      </div>
    </form>
  )
}
