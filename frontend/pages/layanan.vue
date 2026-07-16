<script setup lang="ts">
import services from '~/data/services.json'

useHead({
  title: 'Layanan Kami',
  meta: [
    { name: 'description', content: 'Layanan konstruksi profesional: pembangunan jalan, rekonstruksi jalan tol, pembangunan jembatan, dan infrastruktur pendukung.' },
    { name: 'keywords', content: 'layanan konstruksi, pembangunan jalan, rekonstruksi jalan tol, pembangunan jembatan, infrastruktur pendukung, kontraktor jalan, kontraktor jembatan' },
    { property: 'og:title', content: 'Layanan Kami - PT. Remako Jaya Abadi' },
    { property: 'og:description', content: 'Layanan konstruksi profesional: pembangunan jalan, rekonstruksi jalan tol, pembangunan jembatan, dan infrastruktur pendukung.' },
    { property: 'og:url', content: 'https://remakojayaabadi.com/layanan' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'https://remakojayaabadi.com/images/og-image.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Layanan Kami - PT. Remako Jaya Abadi' },
    { name: 'twitter:description', content: 'Layanan konstruksi profesional: pembangunan jalan, rekonstruksi jalan tol, pembangunan jembatan, dan infrastruktur pendukung.' },
  ],
  link: [
    { rel: 'canonical', href: 'https://remakojayaabadi.com/layanan' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Beranda', item: 'https://remakojayaabadi.com' },
          { '@type': 'ListItem', position: 2, name: 'Layanan', item: 'https://remakojayaabadi.com/layanan' },
        ],
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Konstruksi',
        provider: {
          '@type': 'Organization',
          name: 'PT. Remako Jaya Abadi',
          url: 'https://remakojayaabadi.com',
        },
        areaServed: { '@type': 'Country', name: 'Indonesia' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Layanan Konstruksi',
          itemListElement: services.map((service, index) => ({
            '@type': 'Offer',
            position: index + 1,
            itemOffered: {
              '@type': 'Service',
              name: service.title,
              description: service.longDescription,
            },
          })),
        },
      }),
    },
  ],
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-dark py-20 text-white lg:py-28">
      <div class="absolute inset-0 z-0">
        <img src="/images/projects/jagorawi-toll.webp" alt="" class="h-full w-full object-cover opacity-30" />
        <div class="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark"></div>
      </div>
      <div class="relative z-10 mx-auto max-w-7xl px-6 sm:px-12">
        <h1 class="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">Layanan Kami</h1>
        <p class="mt-6 max-w-2xl text-lg text-dark-text">Solusi konstruksi terintegrasi untuk berbagai kebutuhan infrastruktur Anda</p>
      </div>
    </section>

    <!-- Services List -->
    <section class="bg-surface-bg py-20 lg:py-28">
      <div class="mx-auto max-w-7xl px-6 sm:px-12">
        <div class="space-y-16">
          <div v-for="(service, index) in services" :key="service.slug" class="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
            <div class="lg:sticky lg:top-24 lg:self-start">
              <div class="flex items-center gap-4">
                <span class="text-5xl font-bold text-brand">{{ String(index + 1).padStart(2, '0') }}</span>
                <h2 class="text-3xl font-bold tracking-tight text-ink-secondary">{{ service.title }}</h2>
              </div>
              <p class="mt-4 text-base leading-relaxed text-ink-muted">{{ service.description }}</p>
            </div>
            <div class="space-y-6">
              <p class="text-base leading-relaxed text-ink-secondary">{{ service.longDescription }}</p>
              <div>
                <h3 class="text-sm font-semibold uppercase tracking-[0.08em] text-ink-secondary">Scope Pekerjaan</h3>
                <ul class="mt-4 space-y-2">
                  <li v-for="item in service.scope" :key="item" class="flex items-start gap-3 text-sm text-ink-secondary">
                    <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand"></span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-dark py-20 text-white lg:py-28">
      <div class="mx-auto max-w-7xl px-6 sm:px-12">
        <h2 class="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Punya proyek yang ingin dibangun?</h2>
        <p class="mt-5 max-w-xl text-dark-text">Mari diskusikan kebutuhan infrastruktur Anda bersama tim kami.</p>
        <div class="mt-8 flex flex-wrap gap-4">
          <NuxtLink to="/#kontak" class="bg-surface px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-brand hover:bg-brand-tint">Hubungi Kami</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
