# Editorial Homepage Redesign

**Goal:** Rework the homepage into a credible, modern construction-corporation site. Preserve current company data, Indonesian copy, routes, and static generation.

## Visual Direction

Adopt an editorial infrastructure style from approved reference: high-contrast photography, dense display typography, strict grid, strong navy fields, and indigo used only as a controlled signal color. The page must read as a contractor portfolio, not a SaaS landing page.

**Memorable element:** The project showcase opens with one dominant, full-bleed featured project, followed by a compact operational grid.

## Principles

- Evidence precedes marketing: project, year, client, fleet, and legal credentials remain visible.
- No abstract blobs, glass panels, floating badges, large rounded surfaces, fake logos, or generic card wall.
- Retain approved tokens: brand `#4647AE`, dark `#1E1B4B`, page background `#E8EDF2`, surface `#FFFFFF`, ink `#1E1E1E`.
- Replace Inter only if a locally loadable display/body pairing is approved; current redesign retains Inter to avoid external font dependency and preserve implementation stability.
- Use existing Indonesian copy verbatim from `docs/page-copy.md`.
- Keep 320px minimum viewport, keyboard access, visible focus, semantic landmarks, lazy loading below fold, and reduced-motion support.

## Page Composition

### Header

Use a thin white sticky header with wordmark, compact uppercase nav, and bordered contact CTA. Remove rounded logo-badge feel. Mobile menu remains a simple vertical panel.

### Hero

Use a 21:9 construction image as full-bleed background. Place compact eyebrow, two-line maximum headline, approved subtext, and two CTAs in a left-aligned content column. Add a small operational metadata row beneath CTAs using existing approved project facts; no invented claims. Use a static image treatment rather than autoplay Ken Burns.

### Statistics

Render four verified figures as a dark horizontal band with vertical dividers. Remove individual statistic cards.

### About and Credentials

Use a two-column editorial split: large heading and copy alongside construction image. Add an adjacent technical credential rail for `SBU Jalan` and `SBU Jembatan`, sourced from legalities data.

### Services

Render four numbered service rows (`01`–`04`) with left number, title, description, and directional link. Use horizontal rules instead of floating cards and shadows.

### Projects

Keep category filter behavior. On `Semua`, first project becomes a dominant wide feature with image, metadata, and title. Remaining records use a compact two-column grid. Filtered category results use same compact grid. Empty `Jembatan` keeps existing exact empty-state copy.

### Equipment

Present fleet as a dense operational list with oversized quantities, small icon, title, and unit label. Use dividers and no cards.

### Legalities and Clients

Legalities become a tight technical document strip with clear labels. Clients become typographic name blocks in thin bordered grid; never represent text as logos.

### CTA and Footer

Use dark navy field, generous headline, contact controls, and highly legible address/contact line. Footer remains four-column but with reduced decorative treatment and clearer link grouping.

## Motion

- Links: short underline or color transition.
- Images: subtle crop scale on hover only.
- No scroll reveal mass animation, floating motion, blobs, gradients, or autoplay zoom.
- Respect `prefers-reduced-motion` for all transitions.

## Technical Scope

Modify homepage component styling and composition; reuse existing JSON data and Nuxt/Tailwind architecture. Add only components required for editorial project/service/equipment presentation. Retain `npm test` and `npm run generate` coverage. Do not add live external APIs, a CMS, or new routes.

## Acceptance Criteria

- Homepage feels like an engineering and construction portfolio, not a generic landing page.
- All homepage content remains data-driven where existing JSON is available and all supplied Indonesian copy remains exact.
- Project filters and empty state work.
- Layout works from 320px to desktop.
- `npm test` and `npm run generate` pass.
