# classroomtools.io

A showcase site for research-driven classroom tools built from [Teaching After the Feed](https://classroomtools.io/research) — an action research project comparing two instructional models for teaching in algorithmic culture.

## Tools

| Tool | Model | Description |
|---|---|---|
| Close Reading | Against the feed | Structured prompt sequence for sustained visual analysis before interpretation |
| Constellation Board | With the feed | Warburg-inspired tool for arranging images in relation and finding patterns |
| Open Archive | Against the feed | Class-built, revisitable image bank at curatewith.art/openarchive |
| JPEG Degradation | With the feed | Demonstrates lossy compression by running the degradation sequence visibly |

## Stack

- **Next.js 15** (App Router, static export)
- **TypeScript**
- **Tailwind CSS**
- **Cloudflare Pages** for hosting

## Development

```bash
npm install
npm run dev       # localhost:3000
npm run build     # generates out/
```

## Adding a tool

Add an entry to `data/tools.ts`. The tool page at `/tools/[slug]` is generated automatically.

## Deployment

Pushes to `main` deploy automatically via Cloudflare Pages.
Build command: `npm run build` — output directory: `out`
