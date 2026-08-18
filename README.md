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

## Tools

All tools are listed in `data/tools.ts` — currently nine, spanning the two
research models (teaching *with* and *against* the feed) plus classroom
infrastructure. The tool page at `/[slug]` is generated automatically from
that file.

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
```

## Adding a tool

Add an entry to `data/tools.ts` (include a `screenshot` under `public/shots/`,
720px wide, named by slug). The tool page and the homepage grid update
automatically, as do the stats.

## Deployment

Pushes to `main` deploy automatically via Cloudflare Pages.
Build command: `npm run build` — output directory: `out`
