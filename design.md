# Design Document — remakojayaabadi.com

> Design spec untuk Claude CLI / agent. Ambil pola layout dari Bechtel (bechtel.com), adaptasi warna dan font sesuai below.

## 1. Inspiration

**Reference**: Bechtel (bechtel.com) — pola layout yang diadaptasi:
- Full-width hero dengan background image proyek + text overlay
- Mega menu navigation (hover panel dengan preview content)
- Project showcase dengan tabs/filter by kategori
- Card grid (3-col desktop) dengan image top + text bottom
- Generous whitespace antar section
- Alternating section bg (white / light tint)
- Dark footer multi-column
- "Read More" link dengan arrow icon
- Flat design, no heavy borders, subtle hover lift + shadow

## 2. Color Tokens

```css
/* Brand */
--color-primary: #4647AE;        /* Blue — utama, CTA, heading, nav active */
--color-primary-dark: #3536A1;   /* Hover state */
--color-primary-light: #6B6CC4;  /* Subtle accent */
--color-primary-tint: #EFEEFB;   /* Section bg tint, badge */

/* Neutral */
--color-bg: #E8EDF2;              /* Page background — off-white kebiruan */
--color-surface: #FFFFFF;         /* Card surface, nav bg */
--color-ink: #1E1E1E;            /* Body text */
--color-ink-secondary: #30454C;  /* Subheading, card title */
--color-muted: #6B7280;          /* Meta text, caption */
--color-border: #E2E8F0;         /* Divider, card border */

/* Semantic */
--color-success: #16A34A;
--color-warning: #F59E0B;
--color-error: #DC2626;

/* Dark section (footer, CTA) */
--color-dark: #1E1B4B;           /* Deep navy — footer/CTA bg, blend dari primary */
--color-dark-surface: #2D2A6E;
--color-dark-text: #C7D2FE;      /* Light text on dark bg */
```

### Tailwind Config

```js
colors: {
  brand: {
    DEFAULT: '#4647AE',
    dark: '#3536A1',
    light: '#6B6CC4',
    tint: '#EFEEFB',
  },
  surface: {
    DEFAULT: '#FFFFFF',
    bg: '#E8EDF2',
  },
  ink: {
    DEFAULT: '#1E1E1E',
    secondary: '#30454C',
    muted: '#6B7280',
  },
  dark: {
    DEFAULT: '#1E1B4B',
    surface: '#2D2A6E',
    text: '#C7D2FE',
  },
}
```

## 3. Typography

**Font**: Inter (Google Fonts / @fontsource / nuxt-fonts)

```css
--font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
```

### Type Scale (desktop)

| Element | Size | Weight | Line Height | Tracking | Color |
|---|---|---|---|---|---|
| Hero heading | 3.5rem (56px) | 700 | 1.1 | -0.02em | #FFFFFF |
| Hero subtext | 1.25rem (20px) | 400 | 1.6 | normal | rgba(255,255,255,0.9) |
| Section heading (H2) | 2rem (32px) | 700 | 1.2 | -0.02em | #1E1E1E |
| Card title (H3) | 1.25rem (20px) | 600 | 1.3 | normal | #30454C |
| Body | 1rem (16px) | 400 | 1.7 | normal | #1E1E1E |
| Body small | 0.875rem (14px) | 400 | 1.6 | normal | #30454C |
| Meta / caption | 0.75rem (12px) | 500 | 1.5 | 0.05em uppercase | #6B7280 |
| Nav item | 0.875rem (14px) | 600 | 1 | 0.02em uppercase | #30454C |
| Button | 0.875rem (14px) | 600 | 1 | 0.02em uppercase | varies |
| Footer link | 0.8125rem (13px) | 400 | 1.5 | normal | #C7D2FE |

### Mobile Scale

| Element | Size |
|---|---|
| Hero heading | 2.25rem (36px) |
| Section heading | 1.5rem (24px) |
| Card title | 1.125rem (18px) |
| Body | 1rem (16px) |

## 4. Spacing & Layout

### Container
- Max width: 1280px (max-w-7xl)
- Horizontal padding: 24px mobile, 48px desktop (px-6 sm:px-12)
- Section vertical padding: 80px mobile, 120px desktop (py-20 sm:py-30)

### Grid
- 12-column desktop
- Gap: 24px mobile, 32px desktop
- Breakpoints: sm 640px, md 768px, lg 1024px, xl 1280px

### Card Grid
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column
- Card gap: 24px
- Card border-radius: 12px (rounded-xl)
- Card padding: 24px
- Card shadow: 0 2px 8px rgba(30,27,75,0.08) — subtle, lifts on hover

## 5. Components

### Button

```
Primary:
  bg: #4647AE
  text: #FFFFFF
  padding: 12px 24px
  border-radius: 8px
  font: 14px / 600 / uppercase / 0.02em tracking
  hover: bg #3536A1, shadow 0 4px 12px rgba(70,71,174,0.3)

Secondary (outline):
  bg: transparent
  border: 1px solid #4647AE
  text: #4647AE
  padding: 12px 24px
  border-radius: 8px
  hover: bg #EFEEFB

Ghost / Text link:
  text: #4647AE
  font: 14px / 600
  arrow icon (→) right
  hover: text #3536A1, underline

On dark bg:
  bg: #FFFFFF
  text: #4647AE
  hover: bg #EFEEFB
```

### Card (Project / Article / Service)

```
Container:
  bg: #FFFFFF
  border-radius: 12px
  overflow: hidden
  shadow: 0 2px 8px rgba(30,27,75,0.08)
  hover: shadow 0 8px 24px rgba(30,27,75,0.12), translateY(-4px)

Image:
  aspect-ratio: 16:9
  object-fit: cover
  hover: subtle scale(1.03) — image only, 300ms ease

Content:
  padding: 24px

Category tag:
  font: 12px / 500 / uppercase / 0.05em tracking
  color: #4647AE
  margin-bottom: 8px

Title:
  font: 20px / 600
  color: #30454C
  margin-bottom: 8px
  hover: color #4647AE

Excerpt:
  font: 14px / 400
  color: #6B7280
  line-height: 1.6

Read More link:
  margin-top: 16px
  text: #4647AE
  arrow icon (→)
```

### Statistic Block

```
Container:
  text-align: center
  padding: 32px

Number:
  font: 48px / 700 / #4647AE
  margin-bottom: 8px

Label:
  font: 14px / 500 / uppercase / 0.05em tracking
  color: #6B7280
```

### Section Pattern

```
Section wrapper:
  padding-y: 80px (mobile) / 120px (desktop)

Section heading:
  text-align: center or left
  max-width: 640px (if centered)
  margin-bottom: 48px

Eyebrow (optional):
  font: 12px / 600 / uppercase / 0.1em tracking
  color: #4647AE
  margin-bottom: 12px

Heading:
  font: 32px / 700 (mobile 24px)
  color: #1E1E1E

Subtext:
  font: 16px / 400
  color: #6B7280
  margin-top: 16px
```

### Alternating Background

```
Section 1: bg #E8EDF2 (page bg)
Section 2: bg #FFFFFF (surface)
Section 3: bg #E8EDF2
Section 4: bg #1E1B4B (dark — CTA/footer)
```

## 6. Navigation

### Header

```
Layout:
  position: sticky, top 0
  bg: #FFFFFF
  height: 72px
  border-bottom: 1px solid #E2E8F0
  z-index: 50

Left: Logo (height 40px)
Center/Right: Nav items
Right: CTA button "Hubungi Kami" + mobile hamburger

Nav item:
  font: 14px / 600 / uppercase / 0.02em tracking
  color: #30454C
  hover: color #4647AE
  active: color #4647AE, border-bottom 2px solid #4647AE
```

### Mega Menu (desktop hover)

```
Trigger: hover on parent nav item
Panel:
  position: absolute, full-width
  bg: #FFFFFF
  border-top: 1px solid #E2E8F0
  shadow: 0 8px 24px rgba(30,27,75,0.12)
  padding: 32px

Layout: 3-column grid inside
  Col 1: Featured article card (image + title + excerpt)
  Col 2: Link list with icons
  Col 3: Link list with icons

Animation: fade-in + slide-down, 200ms ease
```

### Mobile Nav

```
Hamburger: 3-line icon, 24px
Panel: full-screen overlay, bg #FFFFFF
Items: stacked, 48px height each
font: 16px / 600 / #30454C
CTA: full-width button at bottom
```

## 7. Footer

```
Background: #1E1B4B (dark navy)
Text: #C7D2FE
Padding: 64px top, 32px bottom

Layout: 4-column grid (desktop), stacked (mobile)

Col 1: Logo + company description + social icons
Col 2: Navigation links
Col 3: Services links
Col 4: Contact (address, phone, email)

Bottom bar:
  border-top: 1px solid rgba(255,255,255,0.1)
  padding-top: 24px
  flex: copyright left, legal links right
  font: 13px / #C7D2FE / opacity 0.7
```

## 8. Homepage Structure

```
1. HERO (full-width)
   - Background: foto jalan tol/konstruksi, dark gradient overlay bottom→top
   - Content: left-aligned, max-width 720px
   - Eyebrow: "PERUSAHAAN KONSTRUKSI PROFESIONAL"
   - Heading: "Membangun standar baru untuk setiap proyek"
   - Subtext: overview singkat dari company profile
   - CTA: [Lihat Proyek] (primary) + [Hubungi Kami] (secondary outline, white border)

2. STATISTIC BAR
   - bg: #FFFFFF or #4647AE (brand) — alt: bg #1E1B4B
   - 4 stats horizontal: 10+ Tahun | 22+ Proyek | 35 Unit | 12 Klien

3. TENTANG (split)
   - bg: #E8EDF2
   - Left: text (overview, visi ringkas, CTA "Selengkapnya")
   - Right: foto tim/equipment

4. LAYANAN (card grid 3-col)
   - bg: #FFFFFF
   - Eyebrow + heading
   - 4 cards: Jalan, Jembatan, Rekonstruksi, Pelebaran
   - Each: icon/illustration + title + excerpt + read more

5. PROYEK UNGGULAN (card grid 3-col)
   - bg: #E8EDF2
   - Eyebrow + heading + filter tabs (Semua / Jalan Tol / Jembatan)
   - 6 project cards: image + tahun + klien + judul + read more
   - CTA bottom-center: "Lihat Semua Proyek"

6. EQUIPMENT (grid 3-col or 6-col)
   - bg: #FFFFFF
   - Eyebrow + heading
   - Grid: Excavator 200 (8), Excavator 75 (2), Vibro (4), etc.
   - Each: icon/silhouette + name + jumlah

7. LEGALITAS (gallery / accordion)
   - bg: #E8EDF2
   - Eyebrow + heading
   - 5 sertifikat cards: thumbnail scan + label (Akta, NIB, SKMENKEH, SBU Jalan, SBU Jembatan)
   - Click: modal/lightbox full view

8. KLIEN (logo grid)
   - bg: #FFFFFF
   - Eyebrow + heading
   - 12 client logos in grayscale, hover: color
   - Grid: 6-col desktop, 3-col mobile

9. CTA SECTION (dark)
   - bg: #1E1B4B
   - Center text: "Punya proyek yang ingin dibangun?"
   - CTA: [Hubungi Kami] (white button) + [Lihat Layanan] (outline)
   - Contact info: email, telp, alamat

10. FOOTER
```

## 9. Page Layouts (inner pages)

### Tentang Kami
```
- Page hero: image + heading "Tentang Kami"
- About text (full, from company-profile.md Section 1)
- Visi & Misi (split or stacked)
- Pilar Komitmen (6 cards: Kualitas, Keselamatan, Ketepatan Waktu, Keberlanjutan, Inovasi, Kolaborasi)
- Tim (grid 5 cards: photo + nama + jabatan)
- Legalitas (gallery)
```

### Proyek
```
- Page hero: heading "Proyek" + filter tabs (Semua / 2017-2020 / 2020-2022 / 2024 / 2025)
- Grid project cards
- Each card click → detail page
```

### Proyek Detail
```
- Hero: project image full-width + title overlay
- Meta: tahun, klien, kategori
- Description
- Gallery (if photos available)
- Related projects (3 cards)
```

### Layanan
```
- Page hero: heading "Layanan"
- 4 service cards (expanded: description + benefits list)
- CTA
```

### Kontak
```
- Page hero: heading "Hubungi Kami"
- Split: left = contact form, right = contact info + map embed
- Form fields: nama, email, phone, pesan
- Submit: #4647AE button
```

## 10. Interactions & Animations

- **Hover lift**: card translateY(-4px) + shadow increase, 200ms ease
- **Image zoom**: card image scale(1.03) on card hover, 300ms ease
- **Fade-in on scroll**: sections fade-in + translateY(20px→0) when entering viewport, 400ms ease
- **Mega menu**: fade + slide-down, 200ms ease
- **Mobile menu**: slide-in from right, 300ms ease
- **Hero**: subtle Ken Burns zoom on background image (scale 1→1.05, 20s ease-in-out infinite alternate)
- **Respect prefers-reduced-motion**: disable all animations when set

## 11. Iconography

- Style: line icons, 1.5px stroke, rounded corners
- Source: Lucide (lucide-vue-next) atau Heroicons
- Size: 24px default, 20px inline, 32px feature
- Color: inherit current text color

## 12. Image Treatment

- **Aspect ratios**: Hero 21:9, Card 16:9, Team photo 1:1, Gallery 4:3
- **Format**: WebP (fallback JPEG)
- **Lazy load**: all below-fold images
- **Hero preload**: LCP image preload
- **Overlay**: dark gradient for text-on-image (rgba(30,27,75,0.6) → transparent)
- **Client logos**: grayscale, hover → original color

## 13. Responsive Breakpoints

| Name | Width | Layout |
|---|---|---|
| mobile | <640px | 1-col, hamburger nav, stacked sections |
| sm | 640px | 2-col grid starts |
| md | 768px | Mega menu activates, 2-3 col grid |
| lg | 1024px | 3-col grid, full nav visible |
| xl | 1280px | Max container width |

## 14. Accessibility

- Color contrast: WCAG AA minimum (4.5:1 body text, 3:1 large text)
- Focus visible: 2px solid #4647AE outline, 2px offset
- Skip to content link
- Semantic HTML: header, nav, main, section, article, footer
- Alt text required on all images
- ARIA labels on icon-only buttons
- Keyboard navigation for mega menu and mobile menu
