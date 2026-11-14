import type { EventContext, Request as WorkerRequest } from '@cloudflare/workers-types'
import { timingSafeEqual } from 'node:crypto'
import { clean, validCode, validKey, validateNote } from '../../public/apps/painting-notes/core.mjs'

interface BoardRow {
  code: string; title: string; owner_hash: string; paused: number; hidden: number
  focus: string | null; version: number
}
interface NoteRow {
  id: string; number: number; author: string; author_hash: string; kind: string
  text: string; x: number; y: number; created_at: number; hidden: number
}

function reply(value: unknown, status = 200) {
  return new Response(JSON.stringify(value), { status, headers: {
    'Content-Type': 'application/json', 'Cache-Control': 'no-store',
    'Referrer-Policy': 'no-referrer', 'X-Content-Type-Options': 'nosniff',
  } })
}
async function hash(value: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('')
}
async function readBody(request: WorkerRequest): Promise<Record<string, unknown>> {
  const reader = request.body?.getReader()
  if (!reader) throw new Error('empty')
  const chunks: Uint8Array[] = []
  let size = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > 1_600_000) { await reader.cancel(); throw new Error('large') }
    chunks.push(value)
  }
  const bytes = new Uint8Array(size)
  let offset = 0
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length }
  const value: unknown = JSON.parse(new TextDecoder().decode(bytes))
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('invalid')
  return value as Record<string, unknown>
}

export async function onRequest(context: EventContext<Env, string, Record<string, unknown>>) {
  const { request } = context
  const url = new URL(request.url)
  if (!['GET', 'POST'].includes(request.method)) return reply({ error: 'Use GET or POST.' }, 405)
  if (request.method === 'POST') {
    const origin = request.headers.get('origin')
    if ((origin && origin !== url.origin) || request.headers.get('sec-fetch-site') === 'cross-site') {
      return reply({ error: 'Open Painting Notes on this website.' }, 403)
    }
    if (!request.headers.get('content-type')?.startsWith('application/json')) return reply({ error: 'Send JSON.' }, 415)
  }
  let data: Record<string, unknown> = {}
  if (request.method === 'POST') {
    try { data = await readBody(request) } catch (error) {
      return reply({ error: error instanceof Error && error.message === 'large'
        ? 'The image is too large. Try a smaller image.' : 'That request could not be read.' }, 400)
    }
  }
  try {
    const db = context.env.PAINTING_DB
    if (!db) return reply({ error: 'Shared storage is not configured. Please try later.' }, 503)
    const action = request.method === 'GET' ? url.searchParams.get('action') || 'read' : data.action
    const key = request.headers.get('x-board-key') || ''
    const authorKey = request.headers.get('x-author-key') || ''
    const ownerHash = validKey(key) ? await hash(key) : ''
    const authorHash = validKey(authorKey) ? await hash(authorKey) : ''
    if (action === 'create' && request.method === 'POST') {
      if (!ownerHash) return reply({ error: 'Reload to create a teacher key, then try again.' }, 400)
      const title = clean(data.title, 100)
      if (!title || typeof data.image !== 'string' || data.image.length > 1_500_000 ||
        !/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(data.image)) {
        return reply({ error: 'Add a title and a JPG, PNG or WebP image.' }, 400)
      }
      const creatorHash = await hash(request.headers.get('cf-connecting-ip') || 'local-preview')
      const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
      for (let attempt = 0; attempt < 3; attempt++) {
        const code = Array.from(crypto.getRandomValues(new Uint8Array(10)), byte => alphabet[byte % 32]).join('')
        const result = await db.prepare(`INSERT OR IGNORE INTO boards(code,title,image,owner_hash,creator_hash)
          SELECT ?,?,?,?,? WHERE (SELECT count(*) FROM boards WHERE creator_hash=? AND created_at>unixepoch()-86400)<10`)
          .bind(code, title, data.image, ownerHash, creatorHash, creatorHash).run()
        if (result.meta.changes) return reply({ code }, 201)
      }
      return reply({ error: 'This connection has created ten boards today. Reuse a board or try tomorrow.' }, 429)
    }
    const code = request.method === 'GET' ? url.searchParams.get('room') : data.code
    if (!validCode(code)) return reply({ error: 'Enter the ten-character room code.' }, 400)
    const board = await db.prepare('SELECT code,title,owner_hash,paused,hidden,focus,version FROM boards WHERE code=?')
      .bind(code).first<BoardRow>()
    if (!board) return reply({ error: 'That board could not be found. Check the room code.' }, 404)
    const teacher = !!ownerHash && timingSafeEqual(Buffer.from(ownerHash), Buffer.from(board.owner_hash))
    if (action === 'image' && request.method === 'GET') {
      const image = await db.prepare('SELECT image FROM boards WHERE code=?').bind(code).first<{ image: string }>()
      if (!image) return reply({ error: 'That board has been removed.' }, 404)
      const [prefix, encoded] = image.image.split(',')
      const bytes = Uint8Array.from(atob(encoded), char => char.charCodeAt(0))
      return new Response(bytes, { headers: { 'Content-Type': prefix.slice(5, -7),
        'Cache-Control': 'private, max-age=3600', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer' } })
    }
    if (action === 'read' && request.method === 'GET') {
      if (String(board.version) === url.searchParams.get('version')) return reply({ unchanged: true, version: board.version, teacher })
      const result = await db.prepare(`SELECT * FROM notes WHERE board_code=? AND (?=1 OR (hidden=0 AND ?=0)) ORDER BY number`)
        .bind(code, Number(teacher), board.hidden).all<NoteRow>()
      const notes = result.results.map(note => ({ id: note.id, number: note.number, text: note.text,
        author: note.author, kind: note.kind, x: note.x, y: note.y,
        createdAt: new Date(note.created_at * 1000).toISOString(), hidden: !!note.hidden,
        mine: !!authorHash && timingSafeEqual(Buffer.from(authorHash), Buffer.from(note.author_hash)) }))
      return reply({ code: board.code, title: board.title, paused: !!board.paused, hidden: !!board.hidden,
        focus: notes.some(note => note.id === board.focus && !note.hidden) ? board.focus : null,
        version: board.version, teacher, notes })
    }
    if (request.method !== 'POST') return reply({ error: 'Unknown action.' }, 400)
    if (action === 'note') {
      if (!authorHash) return reply({ error: 'Reload to identify your note, then try again.' }, 400)
      let note: ReturnType<typeof validateNote>
      try { note = validateNote(data.note) } catch (error) {
        return reply({ error: error instanceof Error ? error.message : 'Check your note.' }, 400)
      }
      const result = await db.prepare(`INSERT OR IGNORE INTO notes
        (id,board_code,number,author,author_hash,kind,text,x,y)
        SELECT ?,?,COALESCE((SELECT max(number) FROM notes WHERE board_code=?),0)+1,?,?,?,?,?,?
        WHERE EXISTS(SELECT 1 FROM boards WHERE code=? AND paused=0)
        AND (SELECT count(*) FROM notes WHERE board_code=?)<500
        AND (SELECT count(*) FROM notes WHERE board_code=? AND author_hash=? AND created_at>unixepoch()-60)<12`)
        .bind(note.id, code, code, note.author, authorHash, note.kind, note.text, note.x, note.y, code, code, code, authorHash).run()
      if (result.meta.changes) return reply({ ok: true }, 201)
      const duplicate = await db.prepare('SELECT id FROM notes WHERE id=? AND board_code=? AND author_hash=?')
        .bind(note.id, code, authorHash).first()
      return duplicate ? reply({ ok: true }) : reply({ error: 'Notes are paused, the board is full, or you are adding notes too quickly. Wait and try again.' }, 409)
    }
    if (!teacher) return reply({ error: 'Only the teacher can change this board.' }, 403)
    if (action === 'settings') {
      const paused = typeof data.paused === 'boolean' ? Number(data.paused) : null
      const hidden = typeof data.hidden === 'boolean' ? Number(data.hidden) : null
      await db.prepare('UPDATE boards SET paused=COALESCE(?,paused),hidden=COALESCE(?,hidden),version=version+1 WHERE code=? AND owner_hash=?')
        .bind(paused, hidden, code, ownerHash).run()
    } else if (action === 'focus') {
      if (data.id !== null && !validKey(data.id)) return reply({ error: 'Select a note.' }, 400)
      await db.prepare('UPDATE boards SET focus=?,version=version+1 WHERE code=? AND owner_hash=?')
        .bind(data.id, code, ownerHash).run()
    } else if (action === 'moderate') {
      if (!validKey(data.id) || typeof data.hidden !== 'boolean') return reply({ error: 'Select a note.' }, 400)
      await db.prepare('UPDATE notes SET hidden=? WHERE id=? AND board_code=?')
        .bind(Number(data.hidden), data.id, code).run()
    } else if (action === 'delete') {
      if (data.confirm !== code) return reply({ error: 'Type the room code to delete the board.' }, 400)
      await db.prepare('DELETE FROM boards WHERE code=? AND owner_hash=?').bind(code, ownerHash).run()
    } else return reply({ error: 'Unknown action.' }, 400)
    return reply({ ok: true })
  } catch {
    // Do not expose SQL, private keys, stored image data, or request bodies in logs.
    return reply({ error: 'The board could not connect. Your draft is still here. Try again.' }, 503)
  }
}
