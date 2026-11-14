import test from 'node:test'
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'

const base = process.env.PAINTING_TEST_BASE_URL
test('public boards share notes while teacher controls and hidden notes remain protected', { skip: !base }, async () => {
  const key = () => randomUUID().replaceAll('-', '')
  const teacher = key(), author = key()
  let code
  const call = async (action, data = {}, owner = '', student = author) => {
    const response = await fetch(`${base}/api/painting-notes`, { method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-board-key': owner, 'x-author-key': student },
      body: JSON.stringify({ action, code, ...data }),
    })
    return { status: response.status, data: await response.json() }
  }
  const read = async (owner = '', version = '') => {
    const response = await fetch(`${base}/api/painting-notes?room=${code}&version=${version}`, {
      headers: { 'x-board-key': owner, 'x-author-key': author },
    })
    return { status: response.status, data: await response.json() }
  }
  try {
    const created = await call('create', { title: 'Disposable public app check',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y9Zl1sAAAAASUVORK5CYII=',
    }, teacher)
    assert.equal(created.status, 201, JSON.stringify(created.data))
    code = created.data.code
    assert.match(code, /^[A-Z2-9]{10}$/)
    const outsider = await read()
    assert.equal(outsider.status, 200)
    assert.equal(outsider.data.teacher, false)
    assert.equal(outsider.data.notes.length, 0)
    assert.equal(JSON.stringify(outsider.data).includes('owner_hash'), false)
    assert.equal((await call('settings', { paused: true })).status, 403)
    const malicious = await fetch(`${base}/api/painting-notes`, { method: 'POST',
      headers: { Origin: 'https://another-site.example', 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'settings', code, paused: true }),
    })
    assert.equal(malicious.status, 403)
    assert.equal((await call('note', { note: { text: 'Missing coordinates' } })).status, 400)
    const note = { id: key(), text: 'An example observation.', author: 'Example student', kind: 'Observation', x: .4, y: .6 }
    assert.equal((await call('note', { note })).status, 201)
    assert.equal((await call('note', { note })).status, 200)
    const visible = await read()
    assert.equal(visible.data.notes.length, 1)
    assert.equal(visible.data.notes[0].number, 1)
    assert.equal(visible.data.notes[0].mine, true)
    assert.equal(JSON.stringify(visible.data).includes('author_hash'), false)
    assert.equal((await read('', visible.data.version)).data.unchanged, true)
    assert.equal((await call('moderate', { id: note.id, hidden: true }, teacher)).status, 200)
    assert.equal((await read()).data.notes.length, 0)
    assert.equal((await read(teacher)).data.notes.length, 1)
    await call('settings', { paused: true }, teacher)
    assert.equal((await call('note', { note: { ...note, id: key() } })).status, 409)
    await call('settings', { paused: false, hidden: true }, teacher)
    assert.equal((await call('note', { note: { ...note, id: key() } })).status, 201)
    assert.equal((await read()).data.notes.length, 0)
    assert.equal((await read(teacher)).data.notes.length, 2)
    const image = await fetch(`${base}/api/painting-notes?action=image&room=${code}`)
    assert.equal(image.status, 200)
    assert.equal(image.headers.get('Content-Type'), 'image/png')
    assert.equal((await call('delete', { confirm: code })).status, 403)
  } finally {
    if (code) {
      assert.equal((await call('delete', { confirm: code }, teacher)).status, 200)
      assert.equal((await read()).status, 404)
    }
  }
})
