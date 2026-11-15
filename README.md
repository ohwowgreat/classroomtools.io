# classroomtools.io

A showcase site for classroom tools built from [Teaching After the Feed](https://classroomtools.io/research) — an action research project comparing two instructional models for teaching in algorithmic culture.

## Design

The site shares the **Cadence design system** with its sibling products,
[Reflow](https://reflow.classroomtools.io) and
[Cadence LMS](https://lms.classroomtools.io): three greys per theme, alpha
borders, no shadows, 13px body on a 1.7 line-height, system font stack, mono
for values, one accent used solid and at ~12% tints, light and dark from the
same tokens. Tokens live in `app/globals.css`; design notes and the original
direction samples live in `design/`.

Tool cards and pages use real product screenshots from `public/shots/`,
captured from each tool running with classroom-plausible content (see
`design/README.md` for how).

The homepage follows the approved **Index and Spotlight** study: a searchable
tool index beside a sticky feature panel for Cadence LMS, Reflow and
Constellation Board. The panel moves above the list on smaller screens. Its
tabs support arrow keys, Home and End; `/` focuses search. Full-size previews
use native dialogs with Escape and focus return. Repeated keyboard actions
are immediate, and reduced-motion preferences remove motion. Homepage styles
live in `components/ToolIndex.module.css`; shared colors remain in
`app/globals.css`.

Individual tool pages and the research page use the same visual system through
`components/ContentPages.module.css`. Tool pages pair the product overview with
its screenshot, followed by the research connection and compact related-tool
rows. The research page retains the full text and adds section links. Shared
tool labels and screenshots live in `components/ToolMeta.tsx`; feedback forms
use `components/FeedbackForm.module.css` throughout the site.

## Tools

All tools are listed in `data/tools.ts` — currently eleven, spanning the two
research models (teaching *with* and *against* the feed) plus classroom
infrastructure. The tool page at `/[slug]` is generated automatically from
that file.

Scene Notes and Painting Notes are additional classroom tools, included in
the **Classroom infrastructure** filter.
Both apps run publicly on classroomtools.io, with no account or password:

- [Scene Notes](https://classroomtools.io/apps/scene-notes/) saves notebooks
  in the visitor's browser. Its fictional example uses separate local storage.
- [Painting Notes](https://classroomtools.io/apps/painting-notes/) supports
  shared rooms, student QR links, teacher controls, and board exports.
  Anyone with a room link can participate; a separate private teacher key
  protects moderation. The example board runs in the browser without writing
  to shared storage.

The original course-site apps and their data are unchanged. Public painting
rooms use a separate Cloudflare D1 database, accessed only by
`functions/api/painting-notes.ts`.

## Stack

- **Next.js 15** (App Router, static export)
- **TypeScript**
- **Tailwind CSS** (layout utilities; the design system itself is plain CSS tokens)
- **Cloudflare Pages** for hosting

## Development

```bash
npm install
npm run dev       # localhost:3000
npm run build     # generates out/
npm run db:local  # initializes local painting-room storage
npm run dev:apps  # complete app + API preview at localhost:8787
npm test
PAINTING_TEST_BASE_URL=http://127.0.0.1:8787 npm test  # include API integration check
```

## Adding a tool

Add an entry to `data/tools.ts` (include a `screenshot` under `public/shots/`,
720px wide, named by slug). The tool page and the homepage grid update
automatically, as do the stats.

## Deployment

Pushes to `main` deploy automatically via Cloudflare Pages.
Build command: `npm run build` — output directory: `out`

Run `npm run setup:storage` with the owner Cloudflare login for initial setup
and whenever a new database migration is added. It creates/reuses separate
production and preview databases, applies versioned migrations, and records
their non-secret IDs in `wrangler.jsonc`.

The deployment job runs `scripts/prepare-pages-deploy.mjs` without storage
credentials to check those bindings. Pages reads the standard `wrangler.jsonc`
directly, including its separate preview environment.
The existing CI token retains its Pages deployment permissions; it does not
need database administration access. Preview branches use a separate database.
Only `/api/painting-notes` invokes a Pages Function; the catalog and apps stay
static. `npm run deploy:cf` performs the same preparation for a manual deploy.

The Alibaba OSS deployment script publishes static files only; shared painting
rooms require the Cloudflare Pages deployment.
