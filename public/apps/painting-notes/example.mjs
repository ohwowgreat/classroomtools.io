import { validateNote } from './core.mjs';

export const exampleImage = '/apps/painting-notes/art/vermeer-the-milkmaid.jpg';
const examples = [
  ['Observation', 'The stream of milk and the edge of the table lead my eye toward the jug.', 'Alex (example)', .47, .63],
  ['Interpretation', 'The steady gesture and quiet room make the ordinary task feel deliberate.', 'Sam (example)', .56, .4],
  ['Question', 'Why is so much of the wall left empty? How does that change the figure’s presence?', 'Jo (example)', .78, .24],
  ['Observation', 'Light catches the bread and the folds of the sleeve, while the floor stays in shadow.', 'Lee (example)', .24, .72],
];

export function makeExampleBoard() {
  const board = { code: 'EXAMPLE234', title: 'The Milkmaid · example observations', paused: false,
    hidden: false, focus: null, version: 1, teacher: true,
    notes: examples.map(([kind, text, author, x, y], index) => ({
      id: `example-note-${String(index).padStart(32, '0')}`, number: index + 1,
      kind, text, author, x, y, hidden: false, mine: false, createdAt: '2026-01-01T12:00:00.000Z',
    })),
  };
  return {
    async request(action, data = {}) {
      if (action === 'read') return structuredClone(board);
      if (action === 'note') {
        if (board.paused) throw Error('Notes are paused. Resume them before adding a note.');
        const note = validateNote(data.note);
        if (!board.notes.some(existing => existing.id === note.id)) board.notes.push({
          ...note, number: board.notes.length + 1, hidden: false, mine: true, createdAt: new Date().toISOString(),
        });
      } else if (action === 'settings') {
        for (const key of ['paused', 'hidden']) if (typeof data[key] === 'boolean') board[key] = data[key];
      } else if (action === 'focus') board.focus = data.id;
      else if (action === 'moderate') {
        const note = board.notes.find(note => note.id === data.id);
        if (note) note.hidden = !!data.hidden;
      } else throw Error('Start your own board to use this feature.');
      board.version++;
      return { ok: true };
    },
  };
}
