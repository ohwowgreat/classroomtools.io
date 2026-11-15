# Design refresh — working notes

Goal: make classroomtools.io read as one family with Reflow
(reflow.classroomtools.io) and Cadence (lms.classroomtools.io), using the same
Cadence design system, and make the site marketable with real product
screenshots.

## Approved homepage: Index and Spotlight (15 November 2026)

Doğan selected Index and Spotlight from the Emil Design Engineering studies.
The homepage now uses its split hero, compact searchable rows and sticky
feature panel, with Cadence LMS initially selected and Reflow and Constellation
Board available as tabs. On mobile the feature comes before the list in both
visual and document order. The existing research and suggestion destinations
remain available; tool facts and screenshots still come from `data/tools.ts`.

The approved palette refines the original Cadence colors for text emphasis:
blue actions, violet research references, amber discovery, slate archives,
and green availability. Light and dark values live in `app/globals.css`;
homepage components are scoped in `components/ToolIndex.module.css`.

| Before | After | Why |
| --- | --- | --- |
| The homepage led with a screenshot fan and a card grid. | A compact index sits beside a switchable product feature. | Apply the approved layout while keeping all eleven tools easy to find. |
| Filters were the only index control. | Search, result counts, reset, and `/` to focus search. | Find a tool by its name or classroom task. |
| Screenshots opened detail pages. | Native full-size previews include launch, source and detail links. | Inspect a tool without losing the current search or selected feature. |

Validation: production static export and TypeScript checks passed. Existing
tests passed (five passed; the opt-in painting API integration test was skipped).
Browser checks at 1440 × 1000 and 390 × 844 covered layout, feature tabs and
arrow keys, search, category filters, empty-state reset, Escape and focus return.
Mobile controls and the close button have touch targets of at least 44px;
the preview fits the screen without horizontal overflow. Public app code and
database configuration are unchanged.

## Original Cadence design system

Tokens and component patterns are lifted from the live source of both sibling
products, not re-invented:

- `ohwowgreat/reflow-site` → `public/index.html` (the marketing grammar:
  topbar, hero, chips, cards, stats, steps, quote, comparison)
- `ohwowgreat/cadence-lms` → `app/globals.css` (the same tokens in app form,
  light + dark)

Original rules: three greys per theme (`#fff / #f5f5f5 / #ebebeb`, dark
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

Scene Notes and Painting Notes previews show the standalone public apps at
1440×900 with explicitly fictional example content. Scene Notes uses a
fictional film notebook; Painting Notes shows example annotations on Vermeer's
*The Milkmaid* in projector view, with no active room code. The painting is
the existing public-domain course-library image (Rijksmuseum, Amsterdam).
Both apps offer these examples without mixing them with a visitor's own work.

The Lockdown Browser preview uses the actual StudentExam component from
`ohwowgreat/Lockdown-Browser` at `1cc22ea1c0b1965fbbbf68dfdaef468fee42a1ec`,
running locally in its existing teacher-preview mode. A temporary fixture
API supplies a fictional visual-analysis exam and sample answers. No real
exam, account, student record, or submission was used.

Card images are 720px wide; `*-lg` detail-page images are 960px wide.
The Scene Notes, Painting Notes, and Lockdown Browser filenames include a
content hash so refreshed previews replace older browser-cached images.
