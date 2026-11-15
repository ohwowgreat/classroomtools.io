'use client'

import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, MouseEvent, Ref } from 'react'
import Link from 'next/link'
import type { Tool, ToolStatus } from '@/data/tools'
import { researchModelLabel } from '@/data/tools'
import styles from './ToolIndex.module.css'

type Filter = 'all' | 'research' | 'education'
type Preview = { tool: Tool; pointer: boolean; trigger: HTMLButtonElement }
const order = ['lms', 'reflow', 'constellation-board', 'painting-notes', 'scene-notes',
  'close-reading', 'attention-heatmap', 'curatewith-art', 'lockdown-browser', 'jpeg-degradation', 'invigilation-clock']
const featuredSlugs = ['lms', 'reflow', 'constellation-board']
const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All tools' }, { id: 'research', label: 'From the research' },
  { id: 'education', label: 'Classroom infrastructure' },
]
const featureCopy: Record<string, string> = {
  lms: 'Keep the structure of a course visible: what students have seen, what they return to, and what comes next.',
  reflow: 'Plan against the real school calendar, then keep the course pages in step when dates change.',
  'constellation-board': 'Arrange images spatially, test connections, and build an argument from what sits beside what.',
}
const statusLabel: Record<ToolStatus, string> = { live: 'Live', testing: 'Testing', 'coming-soon': 'In development' }

function Arrow() {
  return <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 12 12 4M4.5 4H12v7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
function Status({ tool }: { tool: Tool }) {
  return <span className={`${styles.status} ${styles[`status-${tool.status}`]}`}><i aria-hidden="true" />{statusLabel[tool.status]}</span>
}
function Model({ tool }: { tool: Tool }) {
  return <span className={`${styles.model} ${styles[`model-${tool.category === 'education' ? 'practical' : tool.researchModel}`]}`}>
    {tool.category === 'education' ? 'Classroom infrastructure' : researchModelLabel[tool.researchModel]}
  </span>
}
function OpenTool({ tool, button = false }: { tool: Tool; button?: boolean }) {
  const url = tool.externalUrl || tool.githubUrl
  if (!url) return <span className={styles.unavailable}>Coming soon</span>
  return <a className={button ? `${styles.button} ${styles.primary}` : styles.openLink} href={url}
    target="_blank" rel="noopener noreferrer" aria-label={`${tool.externalUrl ? 'Open' : 'View source for'} ${tool.name} in a new tab`}>
    {tool.externalUrl ? 'Open tool' : 'View source'} <Arrow />
  </a>
}
function ToolImage({ tool, eager = false, imageRef }: { tool: Tool; eager?: boolean; imageRef?: Ref<HTMLImageElement> }) {
  const src = tool.screenshotLg || tool.screenshot
  if (!src) return <span className={styles.placeholder}>
    <svg width="38" height="38" viewBox="0 0 40 40" fill="none" aria-hidden="true"><circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.3" /><path d="M20 11v10l6 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
    <span>In development</span>
  </span>
  return <picture>
    {tool.slug === 'lms' ? <source media="(prefers-color-scheme: dark)" srcSet="/shots/lms-lg-dark.jpg" /> : null}
    <img ref={imageRef} src={src} alt={`${tool.name} interface`} width="960" height="600" loading={eager ? 'eager' : 'lazy'} />
  </picture>
}

function PreviewDialog({ preview, onClose }: { preview: Preview | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!preview || !dialog) return
    const previousOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      dialog.close()
      document.documentElement.style.overflow = previousOverflow
      if (preview.trigger.isConnected) preview.trigger.focus({ preventScroll: true })
    }
  }, [preview])
  function dismissBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return
    const rect = event.currentTarget.getBoundingClientRect()
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.currentTarget.close()
  }
  const tool = preview?.tool
  return <dialog ref={dialogRef} className={styles.dialog} data-pointer={preview?.pointer}
    aria-labelledby="preview-title" aria-describedby="preview-description" onClose={onClose} onClick={dismissBackdrop}>
    {tool ? <div className={styles.dialogInner}>
      <div className={styles.dialogHeader}>
        <span>{tool.category === 'education' ? 'Classroom infrastructure' : researchModelLabel[tool.researchModel]} · {statusLabel[tool.status]}</span>
        <button type="button" className={styles.iconButton} aria-label="Close preview" autoFocus onClick={() => dialogRef.current?.close()}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
      </div>
      <h2 id="preview-title">{tool.name}</h2>
      <p className={styles.dialogTagline}>{tool.tagline}</p>
      {tool.screenshot ? <div className={styles.dialogImage}><ToolImage tool={tool} eager /></div> : null}
      <p id="preview-description" className={styles.dialogDescription}>{tool.description}</p>
      <div className={styles.dialogActions}>
        {tool.externalUrl ? <a className={`${styles.button} ${styles.primary}`} href={tool.externalUrl} target="_blank" rel="noopener noreferrer">Open {tool.name} <Arrow /></a> : null}
        {tool.githubUrl ? <a className={styles.textLink} href={tool.githubUrl} target="_blank" rel="noopener noreferrer">Source on GitHub <Arrow /></a> : null}
        <Link className={styles.textLink} href={`/${tool.slug}`}>About this tool <span aria-hidden="true">→</span></Link>
      </div>
    </div> : null}
  </dialog>
}

function Spotlight({ tools, onPreview }: { tools: Tool[]; onPreview: (tool: Tool, event: MouseEvent<HTMLButtonElement>) => void }) {
  const [selected, setSelected] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const image = useRef<HTMLImageElement>(null)
  const tool = tools[selected]
  if (!tool) return null
  function select(index: number, pointer: boolean) {
    const element = image.current
    element?.getAnimations().forEach(animation => animation.cancel())
    if (index === selected) return
    setSelected(index)
    if (pointer && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element?.animate([{ opacity: .62 }, { opacity: 1 }], { duration: 140, easing: 'cubic-bezier(.23,1,.32,1)' })
    }
  }
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tools.length - 1 :
      (index + (event.key === 'ArrowRight' ? 1 : -1) + tools.length) % tools.length
    tabs.current[next]?.focus()
    select(next, false)
  }
  return <aside className={styles.spotlight} aria-label="Featured tool">
    <div className={styles.spotControls}>
      <span className={styles.spotLabel}>Featured</span>
      <div className={styles.spotTabs} role="tablist" aria-label="Choose a featured tool">
        {tools.map((item, index) => <button key={item.slug} ref={node => { tabs.current[index] = node }} type="button"
          role="tab" id={`spot-tab-${item.slug}`} aria-controls="spot-panel" aria-selected={index === selected}
          tabIndex={index === selected ? 0 : -1} onClick={event => select(index, event.detail > 0)} onKeyDown={event => navigate(event, index)}>
          {item.name}
        </button>)}
      </div>
    </div>
    <div id="spot-panel" role="tabpanel" aria-labelledby={`spot-tab-${tool.slug}`} tabIndex={0} className={styles.spotPanel}>
      <button className={`${styles.previewImage} ${styles.spotImage}`} type="button" aria-label={`Preview ${tool.name}`} onClick={event => onPreview(tool, event)}>
        <ToolImage tool={tool} eager imageRef={image} /><span className={styles.imageHint}>Preview <Arrow /></span>
      </button>
      <div className={styles.spotCopy}>
        <div className={styles.spotHeading}>
          <h2><button className={styles.titleButton} type="button" onClick={event => onPreview(tool, event)}>{tool.name}</button></h2>
          <Status tool={tool} />
        </div>
        <p className={styles.spotTagline}>{tool.tagline}</p>
        <p className={styles.spotDescription}>{featureCopy[tool.slug]}</p>
        <div className={styles.spotActions}>
          <OpenTool tool={tool} button />
          <button className={styles.textLink} type="button" onClick={event => onPreview(tool, event)}>Take a closer look <span aria-hidden="true">→</span></button>
        </div>
        <div className={styles.spotModel}><Model tool={tool} /></div>
      </div>
    </div>
  </aside>
}

export default function ToolIndex({ tools }: { tools: Tool[] }) {
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')
  const [preview, setPreview] = useState<Preview | null>(null)
  const root = useRef<HTMLElement>(null)
  const searchInput = useRef<HTMLInputElement>(null)
  const query = search.trim().toLocaleLowerCase()
  const ordered = [...tools].sort((a, b) => {
    const rank = (slug: string) => { const index = order.indexOf(slug); return index < 0 ? order.length : index }
    return rank(a.slug) - rank(b.slug)
  })
  const shown = ordered.filter(tool => (filter === 'all' || tool.category === filter) &&
    (!query || [tool.name, tool.tagline, tool.description].join(' ').toLocaleLowerCase().includes(query)))
  const featured = featuredSlugs.flatMap(slug => tools.filter(tool => tool.slug === slug))
  useEffect(() => {
    function shortcut(event: globalThis.KeyboardEvent) {
      const target = event.target
      const editing = target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
      if (event.key === '/' && !editing && !document.querySelector('dialog[open]') && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault()
        if (root.current) root.current.dataset.input = 'keyboard'
        searchInput.current?.focus()
      }
    }
    document.addEventListener('keydown', shortcut)
    return () => document.removeEventListener('keydown', shortcut)
  }, [])
  function openPreview(tool: Tool, event: MouseEvent<HTMLButtonElement>) {
    setPreview({ tool, pointer: event.detail > 0, trigger: event.currentTarget })
  }
  return <section ref={root} className={styles.catalogue} id="tools" aria-labelledby="collection-title"
    onPointerDownCapture={event => { event.currentTarget.dataset.input = 'pointer' }}
    onKeyDownCapture={event => { event.currentTarget.dataset.input = 'keyboard' }}>
    <div className={styles.sectionHeading}>
      <h2 id="collection-title">A tool for the work <span>at hand.</span></h2>
      <output className={styles.resultCount} aria-live="polite">{shown.length} {shown.length === 1 ? 'tool' : 'tools'}</output>
    </div>
    <div className={styles.toolbar}>
      <div className={styles.filters} role="group" aria-label="Filter the tool collection">
        {filters.map(item => <button key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}</button>)}
      </div>
      <label className={styles.search}>
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="8.7" cy="8.7" r="5.8" stroke="currentColor" strokeWidth="1.5" /><path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        <input ref={searchInput} type="search" placeholder="Find a tool" aria-label="Search tools" value={search} onChange={event => setSearch(event.target.value)}
          onKeyDown={event => { if (event.key === 'Escape') { setSearch(''); event.currentTarget.blur() } }} />
        <kbd aria-hidden="true">/</kbd>
      </label>
    </div>
    <div className={styles.columns}>
      <Spotlight tools={featured} onPreview={openPreview} />
      <div className={styles.list}>
        {shown.map((tool, index) => <article className={styles.row} key={tool.slug} data-tool={tool.slug}>
          <button className={styles.previewImage} type="button" aria-label={`Preview ${tool.name}`} onClick={event => openPreview(tool, event)}>
            <ToolImage tool={tool} eager={index < 3} /><span className={styles.imageHint}>Preview <Arrow /></span>
          </button>
          <div className={styles.rowCopy}>
            <div className={styles.rowHeading}>
              <h3><button className={styles.titleButton} type="button" onClick={event => openPreview(tool, event)}>{tool.name}</button></h3>
              <Status tool={tool} />
            </div>
            <p className={styles.tagline}>{tool.tagline}</p>
            <div className={styles.rowFooter}><Model tool={tool} /><OpenTool tool={tool} /></div>
          </div>
        </article>)}
        {shown.length === 0 ? <div className={styles.empty}>
          <h3>No tools match that search.</h3><p>Try a tool name or a classroom activity.</p>
          <button className={styles.button} type="button" onClick={() => { setSearch(''); setFilter('all'); searchInput.current?.focus() }}>Reset filters</button>
        </div> : null}
      </div>
    </div>
    <PreviewDialog preview={preview} onClose={() => setPreview(null)} />
  </section>
}
