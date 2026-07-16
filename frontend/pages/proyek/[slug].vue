<script setup lang="ts">
import projects from '~/data/projects.json'

const route = useRoute()
const slug = route.params.slug as string
const project = projects.find(p => p.slug === slug)

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Proyek tidak ditemukan' })
}

useHead({
  title: project.title,
  meta: [
    { name: 'description', content: project.description },
    { name: 'keywords', content: `proyek ${project.category.toLowerCase()}, ${project.title}, kontraktor ${project.category.toLowerCase()}, konstruksi ${project.category.toLowerCase()}, Remako Jaya Abadi` },
    { property: 'og:title', content: `${project.title} - PT. Remako Jaya Abadi` },
    { property: 'og:description', content: project.description },
    { property: 'og:image', content: `https://remakojayaabadi.com${project.image}` },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: project.alt },
    { property: 'og:url', content: `https://remakojayaabadi.com/proyek/${project.slug}` },
    { property: 'og:type', content: 'article' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${project.title} - PT. Remako Jaya Abadi` },
    { name: 'twitter:description', content: project.description },
    { name: 'twitter:image', content: `https://remakojayaabadi.com${project.image}` },
  ],
  link: [
    { rel: 'canonical', href: `https://remakojayaabadi.com/proyek/${project.slug}` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Beranda', item: 'https://remakojayaabadi.com' },
          { '@type': 'ListItem', position: 2, name: 'Proyek', item: 'https://remakojayaabadi.com/proyek' },
          { '@type': 'ListItem', position: 3, name: project.title, item: `https://remakojayaabadi.com/proyek/${project.slug}` },
        ],
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Project',
        name: project.title,
        description: project.description,
        image: `https://remakojayaabadi.com${project.image}`,
        url: `https://remakojayaabadi.com/proyek/${project.slug}`,
        provider: {
          '@type': 'Organization',
          name: 'PT. Remako Jaya Abadi',
          url: 'https://remakojayaabadi.com',
        },
        sponsor: {
          '@type': 'Organization',
          name: project.client,
        },
        datePublished: project.year,
        category: project.category,
      }),
    },
  ],
})
</script>

<template>
  <div>
    <!-- Hero Image -->
    <section class="relative h-[60vh] w-full overflow-hidden bg-dark">
      <img
        :src="project.image"
        :alt="project.alt"
        class="h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
    </section>

    <!-- Content -->
    <section class="relative -mt-32 bg-surface-bg py-20 lg:py-28">
      <div class="mx-auto max-w-7xl px-6 sm:px-12">
        <!-- Back Link -->
        <NuxtLink to="/proyek" class="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-brand hover:text-brand-dark">
          <span>←</span>
          <span>Kembali ke Proyek</span>
        </NuxtLink>

        <!-- Title -->
        <h1 class="mt-8 text-4xl font-bold leading-tight tracking-tight text-ink-secondary sm:text-5xl lg:text-6xl">
          {{ project.title }}
        </h1>

        <!-- Metadata Bar -->
        <div class="mt-8 grid gap-6 border-y border-border py-6 sm:grid-cols-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">Tahun</p>
            <p class="mt-2 text-lg font-semibold text-ink-secondary">{{ project.year }}</p>
          </div>
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">Klien</p>
            <p class="mt-2 text-lg font-semibold text-ink-secondary">{{ project.client }}</p>
          </div>
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">Kategori</p>
            <p class="mt-2 text-lg font-semibold text-ink-secondary">{{ project.category }}</p>
          </div>
        </div>

        <!-- Description -->
        <div class="mt-12 max-w-3xl">
          <p class="text-lg leading-relaxed text-ink-secondary">{{ project.description }}</p>
        </div>

        <!-- Gallery -->
        <div v-if="project.gallery && project.gallery.length > 0" class="mt-16">
          <h2 class="text-2xl font-bold tracking-tight text-ink-secondary">Galeri Proyek</h2>
          <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <img
              v-for="(img, index) in project.gallery"
              :key="index"
              :src="img"
              :alt="`${project.title} - Foto ${index + 1}`"
              class="aspect-video w-full rounded-lg object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
