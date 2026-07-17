<script setup lang="ts">
import { computed, ref } from 'vue'
import clients from '~/data/clients.json'
import equipment from '~/data/equipment.json'
import legalities from '~/data/legalities.json'
import projects from '~/data/projects.json'
import services from '~/data/services.json'
import team from '~/data/team.json'

useHead({
  title: 'Kontraktor Jalan & Jembatan Profesional',
  meta: [
    { name: 'description', content: 'PT. Remako Jaya Abadi — perusahaan konstruksi profesional spesialis jalan & jembatan dengan 10+ tahun pengalaman. Mengerjakan 22+ proyek tol nasional.' },
    { property: 'og:title', content: 'Remako Jaya Abadi — Kontraktor Jalan & Jembatan Profesional' },
    { property: 'og:description', content: 'Perusahaan konstruksi spesialis jalan & jembatan. 10+ tahun pengalaman, 22+ proyek tol nasional. Hubungi kami untuk proyek infrastruktur Anda.' },
    { property: 'og:url', content: 'https://remakojayaabadi.com' },
  ],
  link: [
    { rel: 'canonical', href: 'https://remakojayaabadi.com' },
  ],
})

// JSON-LD Structured Data
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'PT. Remako Jaya Abadi',
        alternateName: 'Remako Jaya Abadi',
        url: 'https://remakojayaabadi.com',
        logo: 'https://remakojayaabadi.com/favicon.svg',
        description: 'Perusahaan konstruksi profesional spesialis jalan & jembatan dengan 10+ tahun pengalaman.',
        foundingDate: '2024-12',
        email: 'pt.remakojayaabadi@gmail.com',
        telephone: '+628111960307',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Jl. At Taqwa No. 53',
          addressLocality: 'Jatisampurna',
          addressRegion: 'Jawa Barat',
          postalCode: '17434',
          addressCountry: 'ID',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Indonesia',
        },
        knowsAbout: ['Konstruksi Jalan', 'Konstruksi Jembatan', 'Jalan Tol', 'Infrastruktur'],
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'PT. Remako Jaya Abadi',
        image: 'https://remakojayaabadi.com/images/og-image.png',
        url: 'https://remakojayaabadi.com',
        telephone: '+628111960307',
        email: 'pt.remakojayaabadi@gmail.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Jl. At Taqwa No. 53',
          addressLocality: 'Jatisampurna',
          addressRegion: 'Jawa Barat',
          postalCode: '17434',
          addressCountry: 'ID',
        },
        priceRange: '$$',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '17:00',
        },
      }),
    },
  ],
})

const activeCategory = ref('Semua')
const categories = ['Semua', 'Jalan Tol', 'Jembatan', 'Infrastruktur']
const heroImage = '/images/hero/hero-bg.webp'
const aboutGallery = [
  '/images/projects/jagorawi-reconstruction.webp',
  '/images/projects/cikampek-reconstruction.webp',
  '/images/projects/jorr-reconstruction.webp',
  '/images/projects/kunciran-reconstruction.webp',
  '/images/projects/ciawi-widening.webp',
  '/images/projects/jagorawi-tahap2.webp',
  '/images/projects/dirgantara-halim.webp',
  '/images/about/heavy-equipment.webp',
]
const heroProject = projects[0]
const filteredProjects = computed(() => activeCategory.value === 'Semua'
  ? projects
  : projects.filter((project) => project.category === activeCategory.value))
const featuredProject = computed(() => activeCategory.value === 'Semua' ? filteredProjects.value[0] : null)
const compactProjects = computed(() => activeCategory.value === 'Semua'
  ? filteredProjects.value.slice(1)
  : filteredProjects.value)
</script>

<template>
  <section class="relative isolate overflow-hidden bg-dark text-white">
    <img :src="heroImage" alt="Pembangunan jembatan oleh PT. Remako Jaya Abadi" fetchpriority="high" class="absolute inset-0 -z-20 h-full w-full object-cover">
    <div class="absolute inset-0 -z-10 bg-dark/75" />
    <div class="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-16 sm:px-12 sm:py-20 lg:min-h-0 lg:py-40">
      <div class="max-w-3xl">
        <p class="text-xs font-semibold uppercase tracking-[0.14em] text-dark-text">PERUSAHAAN KONSTRUKSI PROFESIONAL</p>
        <h1 class="mt-3 text-3xl font-bold leading-[1.02] tracking-tight sm:mt-5 sm:text-6xl lg:text-7xl">Membangun standar baru untuk setiap proyek</h1>
        <p class="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:mt-7 sm:text-base lg:text-lg">PT. Remako Jaya Abadi berkomitmen memberikan solusi infrastruktur terbaik di bidang pembangunan jalan, jembatan, dan konstruksi lainnya. Dengan pengalaman lebih dari 10 tahun, kami telah menyelesaikan berbagai proyek infrastruktur strategis.</p>
        <div class="mt-6 flex flex-wrap gap-3 sm:mt-9 sm:gap-4"><NuxtLink to="#proyek" class="bg-brand px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] hover:bg-brand-dark sm:px-6 sm:py-3 sm:text-sm">Lihat Proyek</NuxtLink><a href="https://wa.me/628111960307" target="_blank" rel="noopener" class="border border-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] hover:bg-white hover:text-dark sm:px-6 sm:py-3 sm:text-sm">Hubungi Kami</a></div>
        <div class="mt-6 grid grid-cols-4 gap-2 border-t border-white/30 pt-4 sm:mt-10 sm:flex sm:flex-wrap sm:gap-4 sm:pt-5"><div class="rounded-lg border border-white/20 px-3 py-2 text-center sm:px-5 sm:py-3"><p class="text-lg font-bold text-white sm:text-2xl">10+</p><p class="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/70 sm:text-xs">Tahun Pengalaman</p></div><div class="rounded-lg border border-white/20 px-3 py-2 text-center sm:px-5 sm:py-3"><p class="text-lg font-bold text-white sm:text-2xl">22+</p><p class="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/70 sm:text-xs">Proyek Selesai</p></div><div class="rounded-lg border border-white/20 px-3 py-2 text-center sm:px-5 sm:py-3"><p class="text-lg font-bold text-white sm:text-2xl">35</p><p class="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/70 sm:text-xs">Unit Peralatan</p></div><div class="rounded-lg border border-white/20 px-3 py-2 text-center sm:px-5 sm:py-3"><p class="text-lg font-bold text-white sm:text-2xl">12</p><p class="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/70 sm:text-xs">Klien Mitra</p></div></div>
      </div>
    </div>
  </section>


  <section id="tentang-kami" class="bg-surface-bg py-20 lg:py-28"><div class="mx-auto max-w-7xl px-6 sm:px-12"><div class="grid gap-12 lg:grid-cols-2 lg:items-center"><div><SectionHeading eyebrow="TENTANG KAMI" heading="Mitra terpercaya untuk infrastruktur masa depan" /><p class="mt-7 leading-relaxed text-ink-secondary">PT. Remako Jaya Abadi berdiri sejak Desember 2024 dengan tim berpengalaman lebih dari 10 tahun di industri konstruksi. Kami berfokus pada kualitas, keselamatan, dan ketepatan waktu dalam setiap proyek yang kami kerjakan. Dengan mengutamakan prinsip keberlanjutan, kami menciptakan solusi konstruksi yang ramah lingkungan dan memberikan manfaat jangka panjang bagi masyarakat.</p><NuxtLink to="/layanan" class="mt-8 inline-flex border-b border-brand pb-1 text-sm font-semibold uppercase tracking-[0.08em] text-brand">Selengkapnya</NuxtLink><div class="mt-10 grid grid-cols-2 border-y border-border"><p class="py-4 text-xs font-semibold uppercase tracking-[0.08em] text-ink-secondary">SBU Jalan</p><p class="border-l border-border py-4 pl-5 text-xs font-semibold uppercase tracking-[0.08em] text-ink-secondary">SBU Jembatan</p></div></div><div class="relative h-80 overflow-hidden rounded-xl sm:h-96 lg:h-[28rem]"><div class="about-gallery flex h-full gap-4"><img v-for="(img, idx) in aboutGallery" :key="idx" :src="img" :alt="`Galeri proyek PT. Remako Jaya Abadi ${idx + 1}`" loading="lazy" class="h-full w-auto flex-shrink-0 rounded-xl object-cover shadow-lg"><img v-for="(img, idx) in aboutGallery" :key="`dup-${idx}`" :src="img" :alt="`Galeri proyek PT. Remako Jaya Abadi ${idx + 1}`" loading="lazy" class="h-full w-auto flex-shrink-0 rounded-xl object-cover shadow-lg"></div></div></div><div class="mt-20 border-t border-border pt-16 lg:mt-24 lg:pt-20"><div class="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between"><div class="max-w-2xl"><SectionHeading eyebrow="TIM KAMI" heading="Profesional berpengalaman di balik setiap proyek" subtext="Tim inti kami terdiri dari profesional yang telah berkontribusi dalam berbagai proyek infrastruktur strategis nasional." /></div></div><div class="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5"><TeamCard v-for="member in team" :key="member.name" :name="member.name" :role="member.role" /></div></div></div></section>

  <section id="layanan" class="bg-surface py-20 lg:py-28"><div class="mx-auto max-w-7xl px-6 sm:px-12"><SectionHeading eyebrow="LAYANAN KAMI" heading="Solusi konstruksi yang terintegrasi" subtext="Kami menangani berbagai jenis pekerjaan konstruksi infrastruktur dengan standar kualitas tinggi." /><div class="mt-12"><ServiceCard v-for="(service, index) in services" :key="service.title" :number="String(index + 1).padStart(2, '0')" :service="service" /></div></div></section>

  <section id="proyek" class="bg-surface-bg py-20 lg:py-28"><div class="mx-auto max-w-7xl px-6 sm:px-12"><SectionHeading eyebrow="PROYEK UNGGULAN" heading="Jejak rekam yang membuktikan kompetensi" subtext="Dari ruas tol Jagorawi hingga Jakarta–Cikampek, kami mengerjakan proyek infrastruktur strategis nasional." /><div class="mt-9 flex flex-wrap gap-5 border-b border-border" role="tablist" aria-label="Filter kategori proyek"><button v-for="category in categories" :key="category" type="button" role="tab" :aria-selected="activeCategory === category" class="border-b-2 px-1 pb-3 text-sm font-semibold uppercase tracking-[0.06em]" :class="activeCategory === category ? 'border-brand text-brand' : 'border-transparent text-ink-muted hover:text-ink'" @click="activeCategory = category">{{ category }}</button></div><div v-if="filteredProjects.length" class="mt-10"><FeaturedProject v-if="featuredProject" :project="featuredProject" /><div class="mt-8 grid gap-x-8 gap-y-10 md:grid-cols-2"><ProjectCard v-for="project in compactProjects" :key="`${project.title}-${project.year}-${project.client}`" :project="project" /></div></div><EmptyState v-else class="mt-10" /><div class="mt-10"><NuxtLink to="/proyek" class="inline-flex border-b border-brand pb-1 text-sm font-semibold uppercase tracking-[0.08em] text-brand">Lihat Semua Proyek</NuxtLink></div></div></section>

  <section class="bg-surface py-20 lg:py-28"><div class="mx-auto max-w-7xl px-6 sm:px-12"><SectionHeading eyebrow="PERALATAN" heading="Kapasitas operasional yang siap dikerjakan" subtext="Didukung 35 unit heavy equipment untuk berbagai kebutuhan proyek konstruksi." /><div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><EquipmentRow v-for="item in equipment" :key="item.name" :item="item" /></div></div></section>

  <section class="bg-surface-bg py-20 lg:py-28"><div class="mx-auto max-w-7xl px-6 sm:px-12"><SectionHeading eyebrow="LEGALITAS" heading="Terverifikasi dan terdaftar resmi" subtext="Perusahaan kami memiliki dokumen legalitas lengkap dan sertifikasi badan usaha." /><div class="mt-12 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-5"><article v-for="item in legalities" :key="item.label" class="border-b border-r border-border p-5"><p class="text-sm font-semibold text-ink-secondary">{{ item.label }}</p><p class="mt-2 text-sm leading-relaxed text-ink-muted">{{ item.description }}</p></article></div></div></section>

  <section class="bg-surface py-20 lg:py-28"><div class="mx-auto max-w-7xl px-6 sm:px-12"><SectionHeading eyebrow="KLIEN KAMI" heading="Dipercaya oleh perusahaan konstruksi nasional" subtext="Kami bangga menjadi mitra terpercaya untuk berbagai perusahaan konstruksi ternama." /><div class="mt-12 grid border-l border-t border-border sm:grid-cols-3 lg:grid-cols-6"><div v-for="client in clients" :key="client.name" class="grid min-h-24 place-items-center border-b border-r border-border p-4 text-center text-xs font-semibold text-ink-secondary">{{ client.name }}</div></div></div></section>

  <section id="kontak" class="bg-dark py-20 text-white lg:py-28"><div class="mx-auto max-w-7xl px-6 sm:px-12"><h2 class="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Punya proyek yang ingin dibangun?</h2><p class="mt-5 max-w-xl text-dark-text">Mari diskusikan kebutuhan infrastruktur Anda bersama tim kami.</p><div class="mt-8 flex flex-wrap gap-4"><a href="https://wa.me/628111960307" target="_blank" rel="noopener" class="bg-surface px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-brand hover:bg-brand-tint">Hubungi Kami</a><NuxtLink to="#layanan" class="border border-dark-text px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] hover:bg-dark-surface">Lihat Layanan</NuxtLink></div><p class="mt-10 border-t border-dark-surface pt-5 text-sm text-dark-text">pt.remakojayaabadi@gmail.com · 08111960-307 · Jl. At Taqwa No. 53, Jatisampurna, Bekasi</p></div></section>
</template>
