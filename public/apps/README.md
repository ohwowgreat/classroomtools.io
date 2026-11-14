# Public classroom apps

These standalone apps were adapted from Doğan's existing course-site tools.
They are served by this repository at `/apps/scene-notes/` and
`/apps/painting-notes/`; no course-site authentication or API is used.

Scene Notes keeps notebooks and exports in the visitor's browser. Its example
notebook uses its own storage key. Painting Notes uses the same-origin
`/api/painting-notes` Pages Function and a separate D1 database. Teacher keys
stay in the teacher's browser/private URL fragment; the database stores their
hashes. Student links and QR codes contain only the public app path and room.

Painting Notes example mode uses fictional names and observations in memory.
It makes no shared-storage requests and does not show a live joining code.
The included painting is Johannes Vermeer's *The Milkmaid*, Rijksmuseum,
Amsterdam, a public-domain work from the existing course image library.

The self-hosted Lato fonts retain their OFL license. The QR generator retains
its upstream MIT license under `painting-notes/vendor/`.
