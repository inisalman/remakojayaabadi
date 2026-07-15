# Editorial Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform homepage into editorial construction-corporation portfolio while preserving supplied Indonesian copy, JSON data, filters, and SSG.

**Architecture:** Keep Nuxt page composition in `frontend/pages/index.vue`; reshape reusable presentational components for service rows, featured/compact project cards, and operational fleet entries. Use existing JSON imports as source of record. Tailwind utilities implement strict grid, navy fields, dividers, and photo treatment; remove reveal-driven entrance motion.

**Tech Stack:** Nuxt 3, Vue 3 `<script setup lang="ts">`, TypeScript, Tailwind CSS, Vitest, Vue Test Utils, lucide-vue-next.

## Global Constraints

- Use supplied homepage text verbatim from `docs/page-copy.md`.
- Retain existing JSON data and future routes `/tentang-kami`, `/layanan`, `/proyek`, `/kontak`.
- Preserve tokens: brand `#4647AE`, dark `#1E1B4B`, background `#E8EDF2`, surface `#FFFFFF`, ink `#1E1E1E`.
- Do not use abstract blobs, glass panels, floating badges, fake logos, large rounded surfaces, or generic card-wall presentation.
- Keep 320px minimum viewport, semantic landmarks, keyboard access, visible focus, lazy loaded below-fold images, and reduced-motion support.
- Keep project category behavior and exact empty-state message `Belum ada proyek di kategori ini`.
- Do not add APIs, CMS integration, routes, or dependencies.
- `npm --prefix frontend test` and `npm --prefix frontend run generate` must pass.

---

## File Structure

- Modify `frontend/pages/index.vue`: editorial section composition and filter-specific project layouts.
- Modify `frontend/components/AppHeader.vue`: thin wordmark header and bordered contact CTA.
- Modify `frontend/components/AppFooter.vue`: restrained footer typography and link grouping.
- Modify `frontend/components/StatisticBlock.vue`: dark-band statistic item.
- Modify `frontend/components/ServiceCard.vue`: numbered divider row.
- Modify `frontend/components/ProjectCard.vue`: compact project entry.
- Create `frontend/components/FeaturedProject.vue`: dominant wide project presentation.
- Create `frontend/components/EquipmentRow.vue`: operational fleet list entry.
- Modify `frontend/assets/css/main.css`: remove reveal entrance animation and retain reduced-motion treatment.
- Delete `frontend/plugins/scroll-reveal.ts`: no scroll reveal after redesign.
- Modify `frontend/tests/components.spec.ts`: cover new presentational contracts.
- Create `frontend/tests/homepage.spec.ts`: cover projects filter and editorial hero/stat structure.

### Task 1: Reshape Editorial Presentational Components

**Files:**
- Create: `frontend/components/FeaturedProject.vue`
- Create: `frontend/components/EquipmentRow.vue`
- Modify: `frontend/components/StatisticBlock.vue`
- Modify: `frontend/components/ServiceCard.vue`
- Modify: `frontend/components/ProjectCard.vue`
- Modify: `frontend/tests/components.spec.ts`

**Interfaces:**
- Consumes project records with `title`, `year`, `client`, `category`, `excerpt`, `image`, and `alt`.
- Consumes equipment records with `name`, `quantity`, and `icon`.
- Produces `<FeaturedProject :project="project" />`, `<ProjectCard :project="project" />`, `<EquipmentRow :item="item" :icon="component" />`, `<ServiceCard :service="service" :number="number" />`, and `<StatisticBlock number="string" label="string" />`.

- [ ] **Step 1: Write failing component tests**

Replace `frontend/tests/components.spec.ts` with tests for compact project metadata, featured project metadata, service number, fleet quantity, and statistic text:

```ts
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import EmptyState from '../components/EmptyState.vue'
import EquipmentRow from '../components/EquipmentRow.vue'
import FeaturedProject from '../components/FeaturedProject.vue'
import ProjectCard from '../components/ProjectCard.vue'
import ServiceCard from '../components/ServiceCard.vue'
import StatisticBlock from '../components/StatisticBlock.vue'

const project = {
  title: 'Rekonstruksi Jalan Tol Jagorawi',
  year: '2025',
  client: 'PT. Qinar Raya Mandiri',
  category: 'Jalan Tol',
  excerpt: '2025 — PT. Qinar Raya Mandiri',
  image: 'https://placehold.co/1200x675/4647AE/FFFFFF?text=Construction',
  alt: 'Proyek Rekonstruksi Jalan Tol Jagorawi',
}

const nuxtLink = { props: ['to'], template: '<a :href="to"><slot /></a>' }

it('renders zero-result message', () => {
  expect(mount(EmptyState).text()).toContain('Belum ada proyek di kategori ini')
})

it('renders compact project metadata and lazy image', () => {
  const wrapper = mount(ProjectCard, { props: { project }, global: { stubs: { NuxtLink: nuxtLink } } })
  expect(wrapper.text()).toContain('PT. Qinar Raya Mandiri')
  expect(wrapper.find('img').attributes('loading')).toBe('lazy')
})

it('renders featured project title and category', () => {
  const wrapper = mount(FeaturedProject, { props: { project }, global: { stubs: { NuxtLink: nuxtLink } } })
  expect(wrapper.text()).toContain('Rekonstruksi Jalan Tol Jagorawi')
  expect(wrapper.text()).toContain('Jalan Tol')
})

it('renders numbered service row', () => {
  const wrapper = mount(ServiceCard, {
    props: { number: '01', service: { title: 'Pembangunan Jalan', description: 'Konstruksi jalan baru.', icon: 'Construction' } },
    global: { stubs: { NuxtLink: nuxtLink } },
  })
  expect(wrapper.text()).toContain('01')
  expect(wrapper.text()).toContain('Pembangunan Jalan')
})

it('renders fleet quantity and unit label', () => {
  const wrapper = mount(EquipmentRow, { props: { item: { name: 'Excavator 200', quantity: '8 unit' } } })
  expect(wrapper.text()).toContain('8 unit')
})

it('renders statistic number and label', () => {
  expect(mount(StatisticBlock, { props: { number: '10+', label: 'Tahun Pengalaman' } }).text()).toContain('Tahun Pengalaman')
})
```

- [ ] **Step 2: Run tests to verify red state**

Run: `npm --prefix frontend test -- tests/components.spec.ts`

Expected: FAIL because `FeaturedProject.vue`, `EquipmentRow.vue`, or required props do not exist.

- [ ] **Step 3: Implement presentational contracts**

Create `frontend/components/FeaturedProject.vue`:

```vue
<script setup lang="ts">
interface Project {
  title: string
  year: string
  client: string
  category: string
  excerpt: string
  image: string
  alt: string
}

defineProps<{ project: Project }>()
</script>

<template>
  <article class="group relative min-h-[420px] overflow-hidden bg-dark text-white lg:min-h-[560px]">
    <img :src="project.image" :alt="project.alt" loading="lazy" class="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]">
    <div class="absolute inset-0 bg-dark/70" />
    <div class="relative flex min-h-[420px] max-w-3xl flex-col justify-end p-6 lg:min-h-[560px] lg:p-10">
      <p class="text-xs font-semibold uppercase tracking-[0.14em] text-dark-text">{{ project.category }}</p>
      <h3 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{{ project.title }}</h3>
      <p class="mt-4 text-sm text-white/80">{{ project.year }} · {{ project.client }}</p>
      <NuxtLink to="/proyek" class="mt-6 w-fit border-b border-white pb-1 text-sm font-semibold uppercase tracking-[0.08em]">Selengkapnya</NuxtLink>
    </div>
  </article>
</template>
```

Create `frontend/components/EquipmentRow.vue`:

```vue
<script setup lang="ts">
defineProps<{ item: { name: string; quantity: string } }>()
</script>

<template>
  <article class="flex items-end justify-between gap-4 border-t border-border py-5 first:border-t-0">
    <h3 class="text-sm font-semibold uppercase tracking-[0.08em] text-ink-secondary">{{ item.name }}</h3>
    <p class="text-3xl font-bold tracking-tight text-dark">{{ item.quantity }}</p>
  </article>
</template>
```

Replace `StatisticBlock.vue` template body:

```vue
<template>
  <div class="border-dark-surface px-6 py-8 text-left sm:border-l sm:first:border-l-0 lg:px-8">
    <p class="text-4xl font-bold tracking-tight text-white">{{ number }}</p>
    <p class="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-dark-text">{{ label }}</p>
  </div>
</template>
```

Replace `ServiceCard.vue` script and template:

```vue
<script setup lang="ts">
import { Building2, Construction, Landmark, Route } from 'lucide-vue-next'

const icons = { Building2, Construction, Landmark, Route }

defineProps<{
  number: string
  service: { title: string; description: string; icon: keyof typeof icons }
}>()
</script>

<template>
  <article class="grid gap-5 border-t border-border py-7 md:grid-cols-[5rem_1fr_auto] md:items-start">
    <p class="text-2xl font-bold tracking-tight text-brand">{{ number }}</p>
    <div>
      <h3 class="text-xl font-semibold text-ink-secondary">{{ service.title }}</h3>
      <p class="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">{{ service.description }}</p>
    </div>
    <NuxtLink to="/layanan" class="w-fit border-b border-brand pb-1 text-sm font-semibold uppercase tracking-[0.08em] text-brand">Selengkapnya</NuxtLink>
  </article>
</template>
```

Replace `ProjectCard.vue` article classes/template with compact border-led layout while retaining image, title, category, year, client, lazy loading, and `/proyek` link:

```vue
<template>
  <article class="group border-t border-border pt-5">
    <div class="aspect-[4/3] overflow-hidden bg-surface-bg">
      <img :src="project.image" :alt="project.alt" loading="lazy" class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]">
    </div>
    <div class="pt-5">
      <p class="text-xs font-semibold uppercase tracking-[0.12em] text-brand">{{ project.category }}</p>
      <h3 class="mt-3 text-xl font-semibold leading-snug text-ink-secondary">{{ project.title }}</h3>
      <p class="mt-3 text-sm text-ink-muted">{{ project.year }} · {{ project.client }}</p>
      <NuxtLink to="/proyek" class="mt-5 inline-flex border-b border-brand pb-1 text-sm font-semibold uppercase tracking-[0.08em] text-brand">Selengkapnya</NuxtLink>
    </div>
  </article>
</template>
```

- [ ] **Step 4: Run component test file**

Run: `npm --prefix frontend test -- tests/components.spec.ts`

Expected: PASS with 6 tests.

- [ ] **Step 5: Commit component redesign**

```bash
git add frontend/components/FeaturedProject.vue frontend/components/EquipmentRow.vue frontend/components/StatisticBlock.vue frontend/components/ServiceCard.vue frontend/components/ProjectCard.vue frontend/tests/components.spec.ts
git commit -m "feat: add editorial homepage components"
```

### Task 2: Compose Editorial Homepage and Layout Shell

**Files:**
- Modify: `frontend/pages/index.vue`
- Modify: `frontend/components/AppHeader.vue`
- Modify: `frontend/components/AppFooter.vue`
- Modify: `frontend/assets/css/main.css`
- Delete: `frontend/plugins/scroll-reveal.ts`
- Create: `frontend/tests/homepage.spec.ts`

**Interfaces:**
- Consumes `FeaturedProject`, `ProjectCard`, `EquipmentRow`, `ServiceCard`, `StatisticBlock`, `EmptyState`.
- `ServiceCard` requires `number`, using `String(index + 1).padStart(2, '0')`.
- `FeaturedProject` consumes first project only when `activeCategory === 'Semua'`.
- `ProjectCard` consumes remaining projects for `Semua`, or all filtered projects otherwise.

- [ ] **Step 1: Write failing homepage tests**

Create `frontend/tests/homepage.spec.ts`:

```ts
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import IndexPage from '../pages/index.vue'

const stubs = {
  NuxtLink: { props: ['to'], template: '<a :href="to"><slot /></a>' },
  FeaturedProject: { props: ['project'], template: '<article data-test="featured-project">{{ project.title }}</article>' },
  ProjectCard: { props: ['project'], template: '<article data-test="project-card">{{ project.title }}</article>' },
  EquipmentRow: { props: ['item'], template: '<article>{{ item.name }}</article>' },
  ServiceCard: { props: ['number', 'service'], template: '<article>{{ number }} {{ service.title }}</article>' },
  StatisticBlock: { props: ['number', 'label'], template: '<div>{{ number }} {{ label }}</div>' },
  SectionHeading: { props: ['heading'], template: '<h2>{{ heading }}</h2>' },
}

it('renders editorial hero and four verified statistics', () => {
  const wrapper = mount(IndexPage, { global: { stubs, directives: { reveal: () => {} } } })
  expect(wrapper.find('h1').text()).toBe('Membangun standar baru untuk setiap proyek')
  expect(wrapper.text()).toContain('10+ Tahun Pengalaman')
  expect(wrapper.text()).toContain('12 Klien Mitra')
})

it('shows first project as featured in Semua category', () => {
  const wrapper = mount(IndexPage, { global: { stubs, directives: { reveal: () => {} } } })
  expect(wrapper.find('[data-test="featured-project"]').text()).toContain('Rekonstruksi Jalan Tol Jagorawi')
  expect(wrapper.findAll('[data-test="project-card"]')).toHaveLength(5)
})

it('shows exact empty state for Jembatan', async () => {
  const wrapper = mount(IndexPage, { global: { stubs, directives: { reveal: () => {} } } })
  await wrapper.get('button').trigger('click')
  await wrapper.get('button:nth-of-type(3)').trigger('click')
  expect(wrapper.text()).toContain('Belum ada proyek di kategori ini')
})
```

- [ ] **Step 2: Run homepage tests to verify red state**

Run: `npm --prefix frontend test -- tests/homepage.spec.ts`

Expected: FAIL because `IndexPage` does not render `FeaturedProject` and current `Semua` grid contains six compact cards.

- [ ] **Step 3: Implement editorial homepage composition**

In `frontend/pages/index.vue`:

1. Replace `filteredProjects` with:

```ts
const filteredProjects = computed(() => activeCategory.value === 'Semua'
  ? projects
  : projects.filter((project) => project.category === activeCategory.value))
const featuredProject = computed(() => activeCategory.value === 'Semua' ? filteredProjects.value[0] : null)
const compactProjects = computed(() => activeCategory.value === 'Semua'
  ? filteredProjects.value.slice(1)
  : filteredProjects.value)
const heroProject = projects[0]
```

2. Hero section must retain exact existing hero copy and use static full-bleed image. Insert approved metadata after CTAs:

```vue
<div class="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/30 pt-5 text-xs font-semibold uppercase tracking-[0.1em] text-white/80">
  <span>{{ heroProject.category }}</span>
  <span>{{ heroProject.year }}</span>
  <span>{{ heroProject.client }}</span>
</div>
```

3. Replace statistics wrapper with:

```vue
<section class="bg-dark">
  <div class="mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
    <StatisticBlock number="10+" label="Tahun Pengalaman" />
    <StatisticBlock number="22+" label="Proyek Selesai" />
    <StatisticBlock number="35" label="Unit Peralatan" />
    <StatisticBlock number="12" label="Klien Mitra" />
  </div>
</section>
```

4. Replace service grid with numbered rows:

```vue
<div class="mt-12">
  <ServiceCard v-for="(service, index) in services" :key="service.title" :number="String(index + 1).padStart(2, '0')" :service="service" />
</div>
```

5. Replace project output with featured/compact blocks:

```vue
<div v-if="filteredProjects.length" class="mt-10">
  <FeaturedProject v-if="featuredProject" :project="{ ...featuredProject, image: constructionImage }" />
  <div class="mt-8 grid gap-x-8 gap-y-10 md:grid-cols-2">
    <ProjectCard v-for="project in compactProjects" :key="`${project.title}-${project.year}-${project.client}`" :project="{ ...project, image: constructionImage }" />
  </div>
</div>
<EmptyState v-else class="mt-10" />
```

6. Replace equipment card grid with:

```vue
<div class="mt-12 lg:grid lg:grid-cols-2 lg:gap-x-16">
  <EquipmentRow v-for="item in equipment" :key="item.name" :item="item" />
</div>
```

7. Remove all `v-reveal` attributes. Update section classes to use square/near-square presentation, dark hero field, and strict dividers. Keep exact supplied copy unchanged.

In `frontend/components/AppHeader.vue`, remove rounded logo badge style and use wordmark plus a `border border-brand` contact CTA. Keep same nav labels, routes, and aria attributes.

In `frontend/components/AppFooter.vue`, remove rounded logo badge, preserve exact supplied footer text, and add thin dividers between footer groups as needed.

In `frontend/assets/css/main.css`, delete `.reveal` utility rules and `.reveal` reduced-motion selectors. Retain global motion override inside `prefers-reduced-motion`.

Delete `frontend/plugins/scroll-reveal.ts`.

- [ ] **Step 4: Run homepage test file**

Run: `npm --prefix frontend test -- tests/homepage.spec.ts`

Expected: PASS with 3 tests.

- [ ] **Step 5: Run full tests and generate static site**

Run: `npm --prefix frontend test && npm --prefix frontend run generate`

Expected: all Vitest files PASS; Nuxt writes `.output/public` and exits `0`.

- [ ] **Step 6: Remove generated tracked artifacts**

Run:

```bash
git restore frontend/.nuxt frontend/.output frontend/node_modules
git status --short
```

Expected: only intended source/test changes remain.

- [ ] **Step 7: Commit page redesign**

```bash
git add frontend/pages/index.vue frontend/components/AppHeader.vue frontend/components/AppFooter.vue frontend/assets/css/main.css frontend/plugins/scroll-reveal.ts frontend/tests/homepage.spec.ts
git commit -m "feat: redesign homepage as editorial portfolio"
```

### Task 3: Review Editorial Redesign

**Files:**
- Review: all changes in Tasks 1–2

**Interfaces:**
- Verifies public homepage rendering and all existing project/category data behavior.

- [ ] **Step 1: Review responsive structure manually**

Run: `npm --prefix frontend run dev -- --host 127.0.0.1`

Inspect `http://127.0.0.1:3000/` at 320px and 1280px. Confirm no horizontal scroll; header navigation collapses at mobile; hero text stays readable; service rows, project split, equipment rows, legality strip, client grid, CTA, and footer remain readable.

- [ ] **Step 2: Review filter behavior**

At `http://127.0.0.1:3000/`, select `Semua`, `Jalan Tol`, `Jembatan`, and `Infrastruktur`. Confirm `Semua` shows one dominant feature plus five compact entries, `Jembatan` shows `Belum ada proyek di kategori ini`, and other categories show only matching projects.

- [ ] **Step 3: Verify repository diff and full test suite**

Run: `git diff main...HEAD --check && npm --prefix frontend test && npm --prefix frontend run generate`

Expected: no whitespace errors, all tests pass, generate succeeds.

- [ ] **Step 4: Remove generated tracked artifacts again**

Run:

```bash
git restore frontend/.nuxt frontend/.output frontend/node_modules
git status --short
```

Expected: clean working tree.

- [ ] **Step 5: Commit only if review requires source corrections**

```bash
git add frontend
git commit -m "fix: refine editorial homepage layout"
```

## Plan Self-Review

- Spec coverage: Tasks 1–2 cover editorial components, hero, dark stats, credentials, numbered services, featured project/filter, fleet, legal/client treatment, header/footer, motion removal, accessibility-preserving semantic structure, testing, and SSG.
- Placeholder scan: no TBD, TODO, or undefined interfaces.
- Type consistency: project and equipment prop shapes match existing JSON fields; numbered service prop is explicitly provided from page loop.
