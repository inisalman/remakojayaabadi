# Homepage Design — PT. Remako Jaya Abadi

## Scope

Build Nuxt 3 static homepage for `remakojayaabadi.com`. Use Indonesian copy exactly from `docs/page-copy.md`. Use mock JSON data only; Strapi integration remains out of scope.

Homepage includes hero, statistics, about, services, featured projects, equipment, legalities, clients, CTA, and footer. Future route links may resolve to 404 until those pages are built:

- `/tentang-kami`
- `/layanan`
- `/proyek`
- `/kontak`

## Data Layer

Create JSON data files under `frontend/data/`:

- `projects.json`: six featured projects. Fields: title, year, client, category, excerpt, image, alt.
- `services.json`: four services. Fields: title, excerpt, icon.
- `clients.json`: twelve client names.
- `equipment.json`: six equipment items. Fields: name, quantity, icon.
- `team.json`: five people. Fields: name, role.
- `testimonials.json`: empty JSON array because source content provides no testimonials.
- `legalities.json`: five legal documents. Fields: label, description, image, alt.

Content comes from `docs/company-profile.md` and `docs/page-copy.md`. No content is hardcoded in components, including legalities.

## Design Foundation

Update Tailwind custom tokens from `docs/design.md`:

- `brand`: default `#4647AE`, dark `#3536A1`, light `#6B6CC4`, tint `#EFEEFB`
- `surface`: default `#FFFFFF`, bg `#E8EDF2`
- `ink`: default `#1E1E1E`, secondary `#30454C`, muted `#6B7280`
- `dark`: default `#1E1B4B`, surface `#2D2A6E`, text `#C7D2FE`
- `border`: `#E2E8F0`

Use Tailwind utilities in templates; no hardcoded color hex values in template markup. Configure `@nuxtjs/google-fonts` to load Inter weights 400, 500, 600, and 700. Install `lucide-vue-next` and import only needed icons in components.

Global CSS sets Inter as font family, minimum viewport width, base background/text, visible keyboard focus, card/image transitions, scroll reveal states, and reduced-motion overrides.

## Layout and Global Components

`app.vue` uses `NuxtLayout` and `NuxtPage`.

`layouts/default.vue` defines skip link, `AppHeader`, main content slot with `id="main-content"`, and `AppFooter`.

### AppHeader

Sticky 72px surface header with logo mark `R`, company name, desktop navigation, primary contact CTA, and accessible mobile hamburger menu. Desktop navigation becomes visible at `lg`; mobile overlay contains the same navigation and CTA. Links target future routes.

### AppFooter

Dark four-column responsive footer:

1. Logo and exact tagline.
2. Navigation links.
3. Service links.
4. Exact contact information.

Bottom bar includes exact copyright and legal links.

### Reusable Content Components

- `SectionHeading`: eyebrow, heading, optional subtext, optional centered alignment.
- `StatisticBlock`: centered number and label.
- `ServiceCard`: Lucide icon, service title/excerpt, linked read-more treatment.
- `ProjectCard`: 16:9 lazy-loaded image, category label, title, project excerpt/meta, read-more treatment.
- `EmptyState`: accessible message for a selected project category with no results: `Belum ada proyek di kategori ini`.

Cards lift by 4px and gain a stronger shadow on hover. Card image zooms subtly. Reduced-motion disables transitions.

## Scroll Reveal

Create `plugins/scroll-reveal.client.ts` registering global `v-reveal` directive.

On mount:

- If `prefers-reduced-motion: reduce` matches, reveal immediately.
- Otherwise observe element with `IntersectionObserver`.
- On intersect, add visible class and unobserve.
- On unmount, disconnect observer.

Global reveal styles transition opacity and vertical offset only when motion is permitted.

## Homepage Sections

`pages/index.vue` composes sections in this order:

1. **Hero**: full-width construction placeholder image, dark gradient overlay, left-aligned exact Hero copy, links to `/proyek` and `/kontak`.
2. **Statistics**: surface four-column bar with exact statistic copy.
3. **About**: surface-bg split layout, exact copy and `/tentang-kami` CTA; right image placeholder.
4. **Services**: surface section, exact heading copy and four cards driven by service JSON.
5. **Featured projects**: surface-bg section, exact heading copy, client-side filter tabs `Semua`, `Jalan Tol`, `Jembatan`, `Infrastruktur`, six project cards, `/proyek` CTA. Empty categories render `EmptyState`, not blank grid.
6. **Equipment**: surface section, exact heading copy, six equipment items with icons and quantities.
7. **Legalities**: surface-bg section, exact heading copy, five thumbnail placeholder cards driven by legalities JSON. No modal/lightbox in this homepage scope.
8. **Clients**: surface section, exact heading copy, twelve grayscale text-logo placeholders with color hover treatment.
9. **CTA**: dark section, exact heading/subtext/contact copy, links to `/kontak` and `/layanan`.
10. **Footer**: supplied by default layout.

Below-fold images are lazy loaded. Each image has meaningful alt text. Hero uses given `placehold.co` construction image URL.

## Responsiveness and Accessibility

Use mobile-first layouts:

- One column by default.
- Two columns at `sm`/`md` where appropriate.
- Three card columns at `lg`.
- Header desktop navigation at `lg`.
- Container `max-w-7xl`, horizontal `px-6 sm:px-12`, section spacing `py-20 lg:py-30`.

Use semantic `header`, `nav`, `main`, `section`, `article`, and `footer` elements. Provide skip link, visible focus, alt text, aria labels for icon controls, and `aria-expanded` on mobile menu trigger.

## Verification

- Run local Nuxt dev server and visually inspect all homepage sections.
- Check small mobile and desktop breakpoints, including mobile navigation and empty `Jembatan` project filter state.
- Run `npm run generate` from `frontend`; must complete successfully for SSG output.
