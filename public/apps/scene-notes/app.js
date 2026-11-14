;(() => {
  "use strict"
  const C = window.SceneNotes,
    $ = (id) => document.getElementById(id),
    isExample = new URLSearchParams(location.search).get("example") === "1",
    KEY = isExample ? "classroomtools-scene-notes-example-v1" : "classroomtools-scene-notes-v1"
  $("example-banner").hidden = !isExample
  $("try-example").hidden = isExample
  let state,
    lastSaved = null,
    storageOkay = true,
    blocked = false,
    recoveryRaw = null,
    filter = "all",
    creating = false,
    undo = null,
    toastTimer
  function warning(message) {
    $("storage-warning").hidden = false
    $("storage-message").textContent = message
    $("storage-status").textContent = "Export your notes to keep a copy."
  }
  try {
    lastSaved = localStorage.getItem(KEY)
    if (lastSaved) {
      const raw = JSON.parse(lastSaved)
      if (
        raw.version !== 1 ||
        !Array.isArray(raw.notebooks) ||
        !raw.notebooks.length ||
        raw.notebooks.length > 100
      )
        throw Error("Invalid saved data")
      state = { version: 1, activeId: raw.activeId, notebooks: raw.notebooks.map(C.validBook) }
      if (new Set(state.notebooks.map((b) => b.id)).size !== state.notebooks.length)
        throw Error("Duplicate notebooks")
      if (!state.notebooks.some((b) => b.id === state.activeId))
        state.activeId = state.notebooks[0].id
    }
  } catch (error) {
    storageOkay = false
    recoveryRaw = lastSaved
    warning(
      lastSaved
        ? "Your saved data could not be opened. Download a recovery copy before doing more work. New notes are available for export in this tab."
        : "This browser cannot save notes. Keep this tab open and export your work before leaving.",
    )
    $("recovery-button").hidden = !recoveryRaw
  }
  if (!state) {
    const initial = isExample ? C.exampleNotebook() : C.makeNotebook()
    state = { version: 1, activeId: initial.id, notebooks: [initial] }
  }
  const book = () => state.notebooks.find((b) => b.id === state.activeId)
  function conflict() {
    if (blocked) return
    blocked = true
    warning(
      "Another tab changed these notebooks. Export any work from this tab, then reload the saved notes to continue.",
    )
    $("reload-button").hidden = false
    document
      .querySelectorAll(
        ".workspace button,.workspace textarea,.workspace input,#settings-button,#notebooks-button,#share-button,.note-actions button",
      )
      .forEach((el) => (el.disabled = true))
    document.querySelectorAll("dialog[open]").forEach((el) => el.close())
  }
  function persist() {
    if (blocked || !storageOkay) return false
    try {
      if (localStorage.getItem(KEY) !== lastSaved) {
        conflict()
        return false
      }
      const next = JSON.stringify(state)
      localStorage.setItem(KEY, next)
      lastSaved = next
      return true
    } catch (error) {
      storageOkay = false
      warning(
        "This browser could not save your latest changes. Keep this tab open and export your notes before leaving.",
      )
      return false
    }
  }
  // A shared link contains only screening details, never a student's notes or timer.
  const params = new URLSearchParams(location.search),
    shareKey = params.get("screening")
  if (shareKey && params.get("film")) {
    let target = state.notebooks.find((b) => b.shareKey === shareKey.slice(0, 100))
    if (!target && state.notebooks.length < 100) {
      target = C.makeNotebook({
        shareKey: shareKey.slice(0, 100),
        title: params.get("film").slice(0, 160),
        course: ["Art Appreciation", "Media Studies", "Other"].includes(params.get("course"))
          ? params.get("course")
          : "Other",
        discussion: /^\d{4}-\d{2}-\d{2}$/.test(params.get("discussion"))
          ? params.get("discussion")
          : "",
        periods: Math.min(30, Math.max(1, parseInt(params.get("periods"), 10) || 1)),
      })
      const initial = book()
      C.pause(initial)
      if (!lastSaved && !initial.notes.length && !initial.draft.text) state.notebooks = []
      state.notebooks.push(target)
    }
    if (target) {
      if (target.id !== state.activeId) C.pause(book() || target)
      state.activeId = target.id
    }
  }
  function notify(message, undoAction = null) {
    clearTimeout(toastTimer)
    undo = undoAction
    $("toast-message").textContent = message
    $("undo-button").hidden = !undo
    $("toast").hidden = false
    toastTimer = setTimeout(
      () => {
        $("toast").hidden = true
        undo = null
      },
      undo ? 12000 : 5000,
    )
  }
  function dateLabel(value) {
    if (!value) return ""
    const date = new Date(value + "T12:00:00")
    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })
  }
  function tick() {
    const b = book(),
      time = C.currentTime(b.timer),
      running = b.timer.startedAt !== null
    $("clock").textContent = C.formatTime(time)
    $("timer-status").textContent = running
      ? "Timer running"
      : time
        ? "Paused at this moment"
        : "Ready to begin"
    $("timer-status").classList.toggle("running", running)
    $("timer-button").querySelector("span").textContent = running
      ? "Pause"
      : time
        ? "Resume"
        : "Start"
    $("timer-button")
      .querySelector("use")
      .setAttribute("href", running ? "#i-pause" : "#i-play")
    $("timer-help").textContent = running
      ? "Pause whenever the film pauses."
      : time
        ? "Resume on your teacher’s cue."
        : "Press Start on your teacher’s cue."
  }
  function draftUI() {
    const d = book().draft
    $("draft-time").textContent = d.atMs === null ? "" : C.formatTime(d.atMs)
    $("composer-label").textContent = d.editId ? "Edit note" : "Quick note"
    $("draft-status").textContent = d.editId
      ? "Editing keeps the original timestamp."
      : d.atMs === null
        ? "The time is captured when you begin typing."
        : "Timestamp captured. Keep watching; finish your thought."
    $("save-note").disabled = blocked || !d.text.trim()
    $("save-note").textContent = d.editId ? "Save changes" : "Save note"
    $("cancel-edit").hidden = !d.editId
  }
  const node = (tag, cls, text) => {
    const e = document.createElement(tag)
    if (cls) e.className = cls
    if (text !== undefined) e.textContent = text
    return e
  }
  function renderNotes() {
    const b = book()
    $("note-count").textContent = b.notes.length
    const notes = b.notes
      .filter((n) => filter === "all" || (filter === "question" ? n.kind === "question" : !n.text))
      .sort((a, b) => a.atMs - b.atMs || a.createdAt - b.createdAt)
    $("notes-list").replaceChildren()
    $("notes-empty").hidden = notes.length > 0
    if (!notes.length)
      $("notes-empty").replaceChildren(
        document.createTextNode(
          filter === "all"
            ? "Your moments will appear here."
            : filter === "question"
              ? "No questions yet."
              : "No marked moments to fill in.",
        ),
        node(
          "span",
          "",
          filter === "all"
            ? "Write a note, or mark a moment to return to later."
            : "Your other notes are still in All.",
        ),
      )
    for (const n of notes) {
      const row = node("li", "note"),
        time = node("span", "note-time", C.formatTime(n.atMs)),
        content = node("div", "note-content")
      content.append(
        node(
          "div",
          "note-meta",
          (n.text ? (n.kind === "question" ? "Question" : "Observation") : "Marked moment") +
            " · Period " +
            n.period,
        ),
        node(
          "p",
          n.text ? "note-text" : "note-text marked-text",
          n.text || "A moment to return to. Add what you noticed.",
        ),
      )
      const actions = node("div", "note-actions"),
        edit = node("button", "text-button", n.text ? "Edit" : "Add note"),
        del = node("button", "text-button delete-note", "Delete")
      edit.setAttribute(
        "aria-label",
        (n.text ? "Edit note at " : "Add note at ") + C.formatTime(n.atMs),
      )
      del.setAttribute("aria-label", "Delete note at " + C.formatTime(n.atMs))
      edit.disabled = del.disabled = blocked
      edit.addEventListener("click", () => {
        if (blocked) return
        if (b.draft.text.trim() && b.draft.editId !== n.id) {
          C.saveDraft(b)
          notify("Your previous draft was saved.")
        }
        b.draft = { text: n.text, atMs: n.atMs, kind: n.kind, editId: n.id, period: n.period }
        persist()
        render()
        $("note-text").focus()
        $("note-text").scrollIntoView({ block: "center", behavior: "smooth" })
      })
      del.addEventListener("click", () => {
        if (blocked) return
        const previousDraft = b.draft.editId === n.id ? { ...b.draft } : null
        b.notes = b.notes.filter((x) => x.id !== n.id)
        if (previousDraft) b.draft = C.blankDraft()
        persist()
        render()
        notify("Note deleted.", () => {
          b.notes.push(n)
          if (previousDraft && !b.draft.text) b.draft = previousDraft
          persist()
          render()
        })
      })
      actions.append(edit, del)
      row.append(time, content, actions)
      $("notes-list").append(row)
    }
  }
  function renderViewingGuide(b) {
    const prompts = b.course === "Media Studies"
        ? [
            [
              "Camera",
              "Notice framing, angle, and movement. Follow where they direct your attention.",
            ],
            ["Mise-en-scène", "Look at setting, costume, props, lighting, and performance."],
            ["Editing", "Notice cuts, shot order, and pace. Follow whose reaction we see."],
            [
              "Sound",
              "Listen for dialogue, effects, music, and silence. Consider what we hear but cannot see.",
            ],
          ]
        : [
            [
              "Composition and light",
              "Notice where people and objects sit in the frame, and what color or light emphasizes.",
            ],
            [
              "Gesture and objects",
              "Follow a look, movement, or repeated object. Consider what it suggests about a relationship.",
            ],
            [
              "Editing and rhythm",
              "Notice cuts, pauses, and changes of pace. Consider their effect.",
            ],
            [
              "Sound",
              "Listen for voices, music, and silence. Notice how they change your reading of the image.",
            ],
          ]
    $("guide-context").textContent = b.course
    $("viewing-prompts").replaceChildren(
      ...prompts.map(([label, text]) => {
        const item = node("li")
        item.append(node("strong", "", label), node("span", "", text))
        return item
      }),
    )
    const reminder = "Connect a film choice to its effect, and bring a question to discuss."
    $("guide-discussion").replaceChildren(
      node("strong", "", "For discussion: "),
      document.createTextNode(reminder),
    )
  }
  function render() {
    const b = book()
    document.title = b.title + " · Scene Notes"
    $("film-title").textContent = b.title
    renderViewingGuide(b)
    $("film-meta").textContent =
      b.course + (b.discussion ? " · Discussion " + dateLabel(b.discussion) : "")
    $("period-label").textContent = "Period " + b.period + " of " + b.periods
    $("next-period").disabled = blocked || b.period >= b.periods
    $("note-text").value = b.draft.text
    document
      .querySelectorAll('[name="kind"]')
      .forEach((el) => (el.checked = el.value === b.draft.kind))
    draftUI()
    tick()
    renderNotes()
  }
  function show(id) {
    $(id).showModal()
  }
  document
    .querySelectorAll("[data-close]")
    .forEach((el) => el.addEventListener("click", () => $(el.dataset.close).close()))
  $("timer-button").addEventListener("click", () => {
    if (blocked) return
    const b = book()
    b.timer.startedAt === null ? C.start(b) : C.pause(b)
    persist()
    tick()
  })
  $("note-text").addEventListener("input", (e) => {
    if (blocked) return
    C.writeDraft(book(), e.target.value)
    if (!e.target.value && !book().draft.editId) {
      const kind = book().draft.kind
      book().draft = C.blankDraft()
      book().draft.kind = kind
    }
    persist()
    draftUI()
  })
  document.querySelectorAll('[name="kind"]').forEach((el) =>
    el.addEventListener("change", () => {
      if (blocked) return
      book().draft.kind = el.value
      persist()
    }),
  )
  function save() {
    if (blocked) return
    if (C.saveDraft(book())) {
      persist()
      render()
      notify("Note added to your notebook.")
      $("note-text").focus()
    }
  }
  $("save-note").addEventListener("click", save)
  $("note-text").addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault()
      save()
    }
  })
  $("cancel-edit").addEventListener("click", () => {
    book().draft = C.blankDraft()
    persist()
    render()
  })
  $("mark-button").addEventListener("click", () => {
    if (blocked) return
    const n = C.mark(book())
    persist()
    renderNotes()
    notify("Moment marked at " + C.formatTime(n.atMs) + ".")
  })
  document.querySelectorAll("[data-filter]").forEach((el) =>
    el.addEventListener("click", () => {
      filter = el.dataset.filter
      document
        .querySelectorAll("[data-filter]")
        .forEach((b) => b.setAttribute("aria-pressed", String(b === el)))
      renderNotes()
    }),
  )
  $("sync-button").addEventListener("click", () => {
    $("sync-time").value = C.formatTime(C.currentTime(book().timer))
    $("sync-error").hidden = true
    show("sync-dialog")
    $("sync-time").select()
  })
  $("sync-form").addEventListener("submit", (e) => {
    e.preventDefault()
    if (blocked) return
    const time = C.parseTime($("sync-time").value)
    if (time === null) {
      $("sync-error").hidden = false
      $("sync-error").textContent = "Enter a valid time, such as 18:42 or 01:18:42."
      return
    }
    C.setTime(book(), time)
    persist()
    tick()
    $("sync-dialog").close()
    notify("Film time updated. Existing notes keep their times.")
  })
  $("next-period").addEventListener("click", () => {
    $("period-message").textContent =
      "Pause here and move to period " + (book().period + 1) + " of " + book().periods + "?"
    $("period-dialog").returnValue = ""
    show("period-dialog")
  })
  $("period-dialog").addEventListener("close", () => {
    if (blocked || $("period-dialog").returnValue !== "confirm") return
    const b = book()
    if (b.period < b.periods) {
      C.pause(b)
      b.period++
      persist()
      render()
      notify("Ready for period " + b.period + ". Resume when the film starts.")
    }
  })
  function settings(isNew) {
    creating = isNew
    const b = book()
    $("settings-title").textContent = isNew ? "New screening" : "Screening details"
    $("film-input").value = isNew ? "" : b.title
    $("course-input").value = isNew ? b.course : b.course
    if (!$("course-input").value) $("course-input").value = "Other"
    $("date-input").value = isNew ? "" : b.discussion
    $("periods-input").value = isNew ? 1 : b.periods
    $("periods-input").min = isNew ? 1 : b.period
    $("settings-help").textContent = isNew
      ? "Start a separate notebook. Your current notebook will be kept."
      : "Changing details keeps your notes and film time."
    $("save-settings").textContent = isNew ? "Create notebook" : "Save details"
    show("settings-dialog")
  }
  $("settings-button").addEventListener("click", () => settings(false))
  $("settings-form").addEventListener("submit", (e) => {
    e.preventDefault()
    if (blocked) return
    const title = $("film-input").value.trim()
    if (!title) {
      $("film-input").setCustomValidity("Enter a film or extract title.")
      $("film-input").reportValidity()
      return
    }
    const opts = {
      title,
      course: $("course-input").value,
      discussion: $("date-input").value,
      periods: Number($("periods-input").value),
    }
    if (creating) {
      if (state.notebooks.length >= 100) {
        notify("You have reached 100 notebooks. Export your work to keep a copy.")
        return
      }
      C.pause(book())
      const next = C.makeNotebook(opts)
      state.notebooks.push(next)
      state.activeId = next.id
    } else Object.assign(book(), opts)
    persist()
    render()
    $("settings-dialog").close()
    clearShareQuery()
  })
  $("film-input").addEventListener("input", () => $("film-input").setCustomValidity(""))
  function clearShareQuery() {
    try {
      history.replaceState(null, "", location.pathname)
    } catch {}
  }
  $("notebooks-button").addEventListener("click", () => {
    $("notebooks-list").replaceChildren()
    for (const b of state.notebooks) {
      const button = node("button", "notebook-choice")
      button.append(
        node("strong", "", b.title),
        node(
          "span",
          "muted",
          b.course +
            " · " +
            b.notes.length +
            " notes" +
            (b.id === state.activeId ? " · Current" : ""),
        ),
      )
      button.setAttribute("aria-current", b.id === state.activeId ? "true" : "false")
      button.addEventListener("click", () => {
        if (blocked) return
        if (b.id !== state.activeId) {
          C.pause(book())
          state.activeId = b.id
          persist()
          filter = "all"
          document.querySelector('[data-filter="all"]').click()
          render()
          clearShareQuery()
        }
        $("notebooks-dialog").close()
      })
      $("notebooks-list").append(button)
    }
    show("notebooks-dialog")
  })
  $("new-notebook").addEventListener("click", () => {
    $("notebooks-dialog").close()
    settings(true)
  })
  function download(contents, name, type) {
    const url = URL.createObjectURL(new Blob([contents], { type })),
      a = document.createElement("a")
    a.href = url
    a.download = name
    document.body.append(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    $("export-menu").open = false
  }
  const fileName = () =>
    book()
      .title.toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .slice(0, 80)
      .replace(/^-|-$/g, "") || "scene-notes"
  $("export-text").addEventListener("click", () =>
    download(C.exportText(book()), fileName() + "-notes.txt", "text/plain;charset=utf-8"),
  )
  $("export-backup").addEventListener("click", () => {
    const copy = C.validBook(JSON.parse(JSON.stringify(book())))
    C.pause(copy)
    download(
      JSON.stringify({ type: "Scene Notes", version: 1, notebook: copy }, null, 2),
      fileName() + "-backup.json",
      "application/json",
    )
  })
  $("import-button").addEventListener("click", () => {
    if (blocked) {
      notify("Reload saved notes before importing.")
      return
    }
    $("export-menu").open = false
    $("import-file").click()
  })
  $("import-file").addEventListener("change", async (e) => {
    const file = e.target.files[0]
    e.target.value = ""
    if (!file) return
    try {
      if (file.size > 2000000) throw Error("Choose a Scene Notes backup smaller than 2 MB.")
      const raw = JSON.parse(await file.text())
      if (raw.type !== "Scene Notes" || raw.version !== 1)
        throw Error("Choose a Scene Notes backup (.json).")
      const imported = C.validBook(raw.notebook)
      if (blocked) return
      if (state.notebooks.length >= 100) throw Error("You have reached 100 notebooks.")
      imported.id = C.id()
      imported.shareKey = C.id()
      imported.timer.startedAt = null
      C.pause(book())
      state.notebooks.push(imported)
      state.activeId = imported.id
      persist()
      clearShareQuery()
      render()
      notify("Backup imported as a separate notebook.")
    } catch (error) {
      notify(
        error instanceof SyntaxError
          ? "This file is not a readable Scene Notes backup."
          : error.message,
      )
    }
  })
  $("share-button").addEventListener("click", async () => {
    const b = book(),
      url = new URL(location.origin + location.pathname)
    url.search = new URLSearchParams({
      screening: b.shareKey,
      film: b.title,
      course: b.course,
      discussion: b.discussion,
      periods: b.periods,
    }).toString()
    try {
      await navigator.clipboard.writeText(url.href)
      notify("Screening link copied. Your notes are private.")
    } catch {
      window.prompt(
        "Copy this screening link. It includes the title and setup only; your notes stay private.",
        url.href,
      )
    }
  })
  $("recovery-button").addEventListener("click", () =>
    download(recoveryRaw, "scene-notes-recovery.json", "application/json"),
  )
  $("reload-button").addEventListener("click", () => location.reload())
  $("undo-button").addEventListener("click", () => {
    if (undo && !blocked) {
      const action = undo
      undo = null
      action()
      notify("Note restored.")
    }
  })
  window.addEventListener("storage", (e) => {
    if (e.key === KEY && e.newValue !== lastSaved) conflict()
  })
  document.addEventListener("click", (e) => {
    if (!$("export-menu").contains(e.target)) $("export-menu").open = false
  })
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") $("export-menu").open = false
  })
  persist()
  render()
  setInterval(tick, 200)
})()
