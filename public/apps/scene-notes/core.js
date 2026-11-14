;(function (root, factory) {
  const api = factory()
  if (typeof module === "object" && module.exports) module.exports = api
  else root.SceneNotes = api
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict"
  const MAX_TIME = 359999000
  const id = () =>
    globalThis.crypto?.randomUUID?.() ||
    "n-" + Date.now().toString(36) + Math.random().toString(36).slice(2)
  const clamp = (n) => Math.min(MAX_TIME, Math.max(0, Number(n) || 0))
  const currentTime = (timer, now = Date.now()) =>
    clamp(timer.baseMs + (timer.startedAt === null ? 0 : Math.max(0, now - timer.startedAt)))
  function formatTime(ms) {
    const s = Math.floor(clamp(ms) / 1000)
    return [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60]
      .map((x) => String(x).padStart(2, "0"))
      .join(":")
  }
  function parseTime(value) {
    const p = String(value).trim().split(":")
    if (p.length < 2 || p.length > 3 || p.some((x) => !/^\d{1,3}$/.test(x))) return null
    const nums = p.map(Number)
    if (nums.at(-1) > 59 || (p.length === 3 && nums[1] > 59)) return null
    const ms =
      (p.length === 2 ? nums[0] * 60 + nums[1] : nums[0] * 3600 + nums[1] * 60 + nums[2]) * 1000
    return ms <= MAX_TIME ? ms : null
  }
  function blankDraft() {
    return { text: "", atMs: null, kind: "observation", editId: null, period: null }
  }
  function makeNotebook(opts = {}) {
    return {
      id: id(),
      shareKey: opts.shareKey || id(),
      title: opts.title || "New screening",
      course: opts.course || "Other",
      discussion: opts.discussion ?? "",
      periods: opts.periods || 1,
      period: 1,
      timer: { baseMs: 0, startedAt: null },
      notes: [],
      draft: blankDraft(),
      createdAt: Date.now(),
    }
  }
  function exampleNotebook() {
    const book = makeNotebook({ title: "The Last Train (fictional example)", course: "Media Studies", periods: 2 })
    book.timer.baseMs = 1122000
    book.notes = [
      [135000, "observation", "The wide shot leaves an empty seat between the two characters. Neither looks at the other."],
      [340000, "question", "Why does the station announcement continue over the cut to the empty platform?"],
      [745000, "observation", "The camera stays on the listener while the other character speaks. Their hands stop moving."],
      [1085000, "observation", "The same doorway appears again, but this time the light behind it is off. Compare this with the opening shot."],
    ].map(([atMs, kind, text]) => ({ id: id(), atMs, kind, text, period: 1, createdAt: Date.now() }))
    return book
  }
  function pause(book, now = Date.now()) {
    book.timer = { baseMs: currentTime(book.timer, now), startedAt: null }
  }
  function start(book, now = Date.now()) {
    if (book.timer.startedAt === null) book.timer.startedAt = now
  }
  function setTime(book, ms, now = Date.now()) {
    book.timer = { baseMs: clamp(ms), startedAt: book.timer.startedAt === null ? null : now }
  }
  function writeDraft(book, text, now = Date.now()) {
    if (book.draft.atMs === null && text.length) {
      book.draft.atMs = currentTime(book.timer, now)
      book.draft.period = book.period
    }
    book.draft.text = text.slice(0, 10000)
  }
  function saveDraft(book, now = Date.now()) {
    if (!book.draft.text.trim()) return null
    const existing = book.notes.find((n) => n.id === book.draft.editId)
    const note = {
      id: existing?.id || id(),
      atMs: book.draft.atMs ?? currentTime(book.timer, now),
      text: book.draft.text.trim(),
      kind: book.draft.kind,
      period: book.draft.period || book.period,
      createdAt: existing?.createdAt || now,
    }
    if (existing) book.notes[book.notes.indexOf(existing)] = note
    else book.notes.push(note)
    book.draft = blankDraft()
    return note
  }
  function mark(book, now = Date.now()) {
    const n = {
      id: id(),
      atMs: currentTime(book.timer, now),
      text: "",
      kind: "observation",
      period: book.period,
      createdAt: now,
    }
    book.notes.push(n)
    return n
  }
  function validBook(raw) {
    if (
      !raw ||
      typeof raw !== "object" ||
      typeof raw.title !== "string" ||
      !raw.title.trim() ||
      raw.title.length > 160 ||
      !Array.isArray(raw.notes) ||
      raw.notes.length > 10000
    )
      throw Error("This file is not a valid Scene Notes notebook.")
    const str = (s, max = 10000) => (typeof s === "string" ? s.slice(0, max) : "")
    const num = (n, max = MAX_TIME) => {
      if (typeof n !== "number" || !Number.isFinite(n) || n < 0 || n > max)
        throw Error("This notebook contains an invalid time or period.")
      return n
    }
    const periods = raw.periods
    if (!Number.isInteger(periods) || periods < 1 || periods > 30)
      throw Error("This notebook contains an invalid number of periods.")
    const period = raw.period
    if (!Number.isInteger(period) || period < 1 || period > periods)
      throw Error("This notebook contains an invalid period.")
    const noteIds = new Set()
    const notes = raw.notes.map((n) => {
      const nid = str(n.id, 100)
      if (!nid || noteIds.has(nid)) throw Error("This notebook contains invalid note IDs.")
      noteIds.add(nid)
      if (!Number.isInteger(n.period) || n.period < 1 || n.period > 30)
        throw Error("This notebook contains an invalid note period.")
      return {
        id: nid,
        atMs: num(n.atMs),
        text: str(n.text),
        kind: n.kind === "question" ? "question" : "observation",
        period: n.period,
        createdAt: typeof n.createdAt === "number" ? n.createdAt : Date.now(),
      }
    })
    const draft = raw.draft || blankDraft()
    return {
      id: str(raw.id, 100) || id(),
      shareKey: str(raw.shareKey, 100) || id(),
      title: raw.title,
      course: str(raw.course, 80) || "Screening",
      discussion: /^\d{4}-\d{2}-\d{2}$/.test(raw.discussion) ? raw.discussion : "",
      periods,
      period,
      timer: {
        baseMs: num(raw.timer?.baseMs),
        startedAt: raw.timer?.startedAt === null ? null : num(raw.timer?.startedAt, 1e15),
      },
      notes,
      draft: {
        text: str(draft.text),
        atMs: draft.atMs === null ? null : num(draft.atMs),
        kind: draft.kind === "question" ? "question" : "observation",
        editId: noteIds.has(draft.editId) ? draft.editId : null,
        period: Number.isInteger(draft.period) ? draft.period : null,
      },
      createdAt: raw.createdAt || Date.now(),
    }
  }
  function exportText(book, now = Date.now()) {
    const lines = [
      book.title,
      book.course,
      ...(book.discussion ? ["Discussion: " + book.discussion] : []),
      "",
      "Film position: " + formatTime(currentTime(book.timer, now)),
      "Period " + book.period + " of " + book.periods,
      "",
    ]
    for (const n of [...book.notes].sort((a, b) => a.atMs - b.atMs || a.createdAt - b.createdAt))
      lines.push(
        "[" +
          formatTime(n.atMs) +
          "] " +
          (n.text ? (n.kind === "question" ? "Question" : "Observation") : "Marked moment") +
          " · Period " +
          n.period,
        n.text || "(Add a note about this moment.)",
        "",
      )
    if (book.draft.text)
      lines.push("UNSAVED DRAFT · [" + formatTime(book.draft.atMs) + "]", book.draft.text, "")
    return lines.join("\n")
  }
  return {
    MAX_TIME,
    id,
    currentTime,
    formatTime,
    parseTime,
    blankDraft,
    makeNotebook,
    exampleNotebook,
    pause,
    start,
    setTime,
    writeDraft,
    saveDraft,
    mark,
    validBook,
    exportText,
  }
})
