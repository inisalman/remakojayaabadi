# CLAUDE.md — Remako Jaya Abadi Website

> Auto-read by Claude CLI. Read this first every session.

## Project Overview

Website company profile untuk **PT. Remako Jaya Abadi** — perusahaan konstruksi spesialis jalan & jembatan. Berdiri Desember 2024, tim 10+ tahun pengalaman, 22+ proyek tol (Jagorawi, Cikampek, JORR, dll).

**Domain**: remakojayaabadi.com (live, coming soon page)
**Repo**: github.com/inisalman/remakojayaabadi

## Tech Stack

- **Frontend**: Nuxt 3 + TypeScript + Tailwind CSS
- **Mode**: Static Site Generation (SSG) — `nuxt generate`
- **CMS**: Strapi (headless, belum deployed)
- **Database**: PostgreSQL (belum deployed)
- **SEO**: `@nuxtjs/seo` (sitemap, robots, schema.org, OG image)
- **Deploy**: Docker (NGINX serve static) di Easypanel
- **Runtime**: NGINX serve `.output/public`

## Commands

```bash
# Local dev
cd frontend
npm install
npm run dev          # localhost:3000

# Build static
npm run generate     # output → frontend/.output/public/

# Preview production build
npm run preview

# Docker build
cd frontend
docker build -t remakojayaabadi .
```

## Project Structure

```
remakojayaabadi/
├── CLAUDE.md                    ← THIS FILE
├── SSD.md                       ← Software Design Document (arsitektur, content model, deployment)
├── tasklist.md                  ← Task tracking (9 section)
├── .gitignore                   ← What NOT to commit
├── docs/
│   ├── company-profile.md       ← Company data (tentang, tim, proyek, klien, equipment, kontak)
│   ├── design.md                ← Design spec (colors, typography, components, layout, pages)
│   └── page-copy.md             ← Indonesian copy per section per page
└── frontend/
    ├── app.vue                  ← Root app
    ├── pages/
    │   └── index.vue            ← Homepage (currently: coming soon page)
    ├── assets/css/main.css      ← Global styles
    ├── nuxt.config.ts           ← Nuxt config
    ├── tailwind.config.ts       ← Tailwind config
    ├── Dockerfile               ← Multi-stage: node build → nginx serve
    ├── nginx.conf               ← Static serve + cache headers
    └── package.json
```

## Doc Index — Read These

| File | What | When |
|---|---|---|
| `SSD.md` | Architecture, Strapi content model, deployment topology | Before building API integration or Strapi schema |
| `docs/company-profile.md` | All company data (about, team, projects, clients, equipment, legal, contact) | Before writing page content |
| `docs/design.md` | Colors, typography, components, layout, page structure, interactions | Before building any component or page |
| `docs/page-copy.md` | Actual Indonesian copy/text for each section | Before writing copy — use these exact texts |
| `tasklist.md` | Task tracking | Check what's done / pending |

## Design System

**Colors** (from `docs/design.md`):
- Brand: `#4647AE` (blue)
- Page bg: `#E8EDF2` (off-white)
- Dark: `#1E1B4B` (navy footer/CTA)
- Surface: `#FFFFFF`

**IMPORTANT**: Current `tailwind.config.ts` uses OLD colors (navy `#0B1F3A`, brand blue `#1688E8`). When starting frontend build, UPDATE tailwind config to match design.md tokens first.

**Font**: Inter (Google Fonts). Not yet installed — add `@nuxtjs/google-fonts` or `@fontsource/inter`.

## Conventions

- Indonesian copy throughout (Bahasa Indonesia)
- Mobile-first responsive (start mobile, scale up)
- Tailwind utility classes in templates
- Vue 3 `<script setup lang="ts">` syntax
- Component naming: PascalCase (e.g. `ProjectCard.vue`, `AppHeader.vue`)
- Page routes follow `pages/` directory
- Images: WebP preferred, lazy load below fold
- No node_modules in git (see .gitignore)
- Commit messages: `type: description` (feat:, fix:, docs:, style:, refactor:)

## What NOT to Do

- Don't commit `node_modules/`, `.nuxt/`, `.output/`, `dist/`
- Don't use `:latest` Docker tag (use `:sha-<hash>` or `:landing-<hash>`)
- Don't hardcode content in components — use Strapi API or data files (for SSG without Strapi, use `~data/` JSON or composables)
- Don't use `node:alpine` for builds that need native deps (use `node:22` Debian-based)
- Don't add multi-language in phase 1 (out of scope per SSD)
- Don't add e-commerce, payment, or user login (out of scope)

## Strapi Status

Strapi NOT yet deployed. For initial frontend build:
- Use mock data from `docs/company-profile.md` (all content available there)
- Hardcode or use `~/data/` JSON files as placeholder
- When Strapi is ready, swap to API calls with `useStrapiApi.ts` composable (see SSD.md Section 4)

## Deployment

1. Push code to GitHub `main`
2. Easypanel auto-builds from `frontend/Dockerfile`
3. Docker image: `easypanel/app/remakojayaabadi`
4. Service: `app_remakojayaabadi` (Docker Swarm, PORT=80)
5. Cloudflare DNS → Easypanel → NGINX

```bash
# Manual deploy from VPS
cd frontend
docker build -t easypanel/app/remakojayaabadi .
docker service update --force --image easypanel/app/remakojayaabadi app_remakojayaabadi
```
