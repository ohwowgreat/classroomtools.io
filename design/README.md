# Design refresh — working notes

Goal: make classroomtools.io read as one family with Reflow
(reflow.classroomtools.io) and Cadence (lms.classroomtools.io), using the same
Cadence design system, and make the site marketable with real product
screenshots.

## The Cadence design system (source of truth)

Tokens and component patterns are lifted from the live source of both sibling
products, not re-invented:

- `ohwowgreat/reflow-site` → `public/index.html` (the marketing grammar:
  topbar, hero, chips, cards, stats, steps, quote, comparison)
- `ohwowgreat/cadence-lms` → `app/globals.css` (the same tokens in app form,
  light + dark)

Core rules: three greys per theme (`#fff / #f5f5f5 / #ebebeb`, dark
`#111 / #1a1a1a / #222`), alpha borders (7% / 14%), no shadows on anything
that sits in the page, 13px body on ~1.7 line-height, system font stack,
semibold ceiling on headings with tight tracking, mono for values, accent
`#3b82f6` (dark `#60a5fa`) used solid and at ~9–14% tints via `color-mix`,
status colours for Live / Testing / In development, and one hue per research
model (amber = with the feed, slate = against the feed).

## Sample directions

`samples/` holds the three homepage directions + tool page + dark proof that
were built as the design canvas (assembled from `bodies/*.html` +
`shared.css` by `build.mjs`). Direction identities:

- **A · Showcase** — Reflow's marketing anatomy applied to the suite.
- **B · Catalog** — the tool index is the page; filterable card grid.
- **C · Research-led** — leads with the research argument in the serif
  document voice; tools grouped under the two instructional models.

## Screenshots (`public/shots/`)

Named by tool slug. All are the real interfaces, captured at 1440×900@2x from
the tools running locally, seeded with classroom-plausible content
(public-domain artwork, original demo compositions, Vasari's 1568 Lives as
the close-reading text). `*-lg` = 960px wide, plain = 720px wide, `-dark` =
dark-theme variant where the product ships one. Cadence shots come from the
repo's own marketing set (`cadence-lms/public/marketing/`).
