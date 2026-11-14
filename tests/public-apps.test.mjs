import test from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { studentJoinURL, validateNote, pointInImage } from '../public/apps/painting-notes/core.mjs'
import { makeExampleBoard } from '../public/apps/painting-notes/example.mjs'
const scene = createRequire(import.meta.url)('../public/apps/scene-notes/core.js')

test('new screenings are generic and example notes export without a course assignment', () => {
  const fresh = scene.makeNotebook()
  assert.equal(fresh.title, 'New screening')
  assert.equal(fresh.discussion, '')
  assert.deepEqual(fresh.notes, [])
  const sample = scene.validBook(scene.exampleNotebook())
  assert.equal(sample.notes.length, 4)
  const exported = scene.exportText(sample)
  assert.match(exported, /fictional example/)
  assert.match(exported, /\[00:02:15\]/)
  assert.match(exported, /Question/)
  assert.deepEqual(scene.makeNotebook().notes, [])
})

test('student links use the public app and never carry a teacher key', () => {
  const link = new URL(studentJoinURL('ABCDEFG234', 'https://classroomtools.io'))
  assert.equal(link.pathname, '/apps/painting-notes/')
  assert.equal(link.search, '?room=ABCDEFG234')
  assert.equal(link.hash, '')
  assert.throws(() => studentJoinURL('invalid'))
  assert.throws(() => studentJoinURL('ABCDEFG234', 'file:///private'))
})

test('painting coordinates remain normalized and validation rejects missing evidence', () => {
  assert.deepEqual(pointInImage(110, 70, { left: 10, top: 20, width: 200, height: 100 }), { x: .5, y: .5 })
  assert.throws(() => validateNote({ text: 'Example', author: 'Alex', kind: 'Observation', id: 'a'.repeat(32), x: 2, y: 0 }))
})

test('example boards support practice without changing a new example board', async () => {
  const example = makeExampleBoard()
  const original = await example.request('read')
  await example.request('moderate', { id: original.notes[0].id, hidden: true })
  assert.equal((await example.request('read')).notes[0].hidden, true)
  assert.equal((await makeExampleBoard().request('read')).notes[0].hidden, false)
  await example.request('settings', { paused: true })
  await assert.rejects(example.request('note', {}), /paused/)
})
