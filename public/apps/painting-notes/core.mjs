export const TYPES = ['Observation', 'Interpretation', 'Question'];
export function clean(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}
export function validKey(value) {
  return typeof value === 'string' && /^[a-zA-Z0-9_-]{32,100}$/.test(value);
}
export function validCode(value) {
  return typeof value === 'string' && /^[A-Z2-9]{10}$/.test(value);
}
export function validateNote(value) {
  if (!value || typeof value !== 'object') throw new Error('Write a note first.');
  const text = clean(value.text, 500);
  const author = clean(value.author, 32);
  if (!text) throw new Error('Write a note first.');
  if (!author) throw new Error('Add your first name or initials.');
  if (!TYPES.includes(value.kind)) throw new Error('Choose a note type.');
  if (!Number.isFinite(value.x) || !Number.isFinite(value.y) || value.x < 0 || value.x > 1 || value.y < 0 || value.y > 1) throw new Error('Tap a detail in the painting first.');
  if (!validKey(value.id)) throw new Error('The note could not be identified. Please reload.');
  return { id: value.id, text, author, kind: value.kind, x: value.x, y: value.y };
}
export function publicNote(note, authorHash, teacher) {
  const { authorHash: privateHash, ...visible } = note;
  return { ...visible, mine: privateHash === authorHash, ...(teacher ? { hidden: !!note.hidden } : {}) };
}
export function pointInImage(clientX, clientY, rect) {
  return { x: Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)), y: Math.max(0, Math.min(1, (clientY - rect.top) / rect.height)) };
}

export function studentJoinURL(code, origin = globalThis.location?.origin || 'https://classroomtools.io') {
  if (!validCode(code)) throw new Error('Enter a valid room code.');
  const url = new URL('/apps/painting-notes/', origin);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Open Painting Notes on this website.');
  url.searchParams.set('room', code);
  return url.href;
}
