<script setup lang="ts">
import { computed, ref } from 'vue'
import clients from '~/data/clients.json'
import equipment from '~/data/equipment.json'
import legalities from '~/data/legalities.json'
import projects from '~/data/projects.json'
import services from '~/data/services.json'

useHead({
  title: 'Remako Jaya Abadi',
  meta: [{ name: 'description', content: 'PT. Remako Jaya Abadi — perusahaan konstruksi profesional spesialis jalan & jembatan.' }],
})

const activeCategory = ref('Semua')
const categories = ['Semua', 'Jalan Tol', 'Jembatan', 'Infrastruktur']
const heroImage = '/images/hero/bridge-construction-v3.webp'
const aboutImage = '/images/about/heavy-equipment.webp'
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
    <div class="mx-auto max-w-7xl px-6 py-28 sm:px-12 lg:py-40">
      <div class="max-w-3xl">
        <p class="text-xs font-semibold uppercase tracking-[0.14em] text-dark-text">PERUSAHAAN KONSTRUKSI PROFESIONAL</p>
        <h1 class="mt-5 text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">Membangun standar baru untuk setiap proyek</h1>
        <p class="mt-7 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">PT. Remako Jaya Abadi berkomitmen memberikan solusi infrastruktur terbaik di bidang pembangunan jalan, jembatan, dan konstruksi lainnya. Dengan pengalaman lebih dari 10 tahun, kami telah menyelesaikan berbagai proyek infrastruktur strategis.</p>
        <div class="mt-9 flex flex-wrap gap-4"><NuxtLink to="/proyek" class="bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] hover:bg-brand-dark">Lihat Proyek</NuxtLink><NuxtLink to="/kontak" class="border border-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] hover:bg-white hover:text-dark">Hubungi Kami</NuxtLink></div>
        <div class="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/30 pt-5 text-xs font-semibold uppercase tracking-[0.1em] text-white/80"><span>{{ heroProject.category }}</span><span>{{ heroProject.year }}</span><span>{{ heroProject.client }}</span></div>
      </div>
    </div>
  </section>

  <section class="bg-dark"><div class="mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4"><StatisticBlock number="10+" label="Tahun Pengalaman" /><StatisticBlock number="22+" label="Proyek Selesai" /><StatisticBlock number="35" label="Unit Peralatan" /><StatisticBlock number="12" label="Klien Mitra" /></div></section>

  <section class="bg-surface-bg py-20 lg:py-28"><div class="mx-auto grid max-w-7xl gap-12 px-6 sm:px-12 lg:grid-cols-[1fr_1.1fr] lg:items-end"><div><SectionHeading eyebrow="TENTANG KAMI" heading="Mitra terpercaya untuk infrastruktur masa depan" /><p class="mt-7 leading-relaxed text-ink-secondary">PT. Remako Jaya Abadi berdiri sejak Desember 2024 dengan tim berpengalaman lebih dari 10 tahun di industri konstruksi. Kami berfokus pada kualitas, keselamatan, dan ketepatan waktu dalam setiap proyek yang kami kerjakan. Dengan mengutamakan prinsip keberlanjutan, kami menciptakan solusi konstruksi yang ramah lingkungan dan memberikan manfaat jangka panjang bagi masyarakat.</p><NuxtLink to="/tentang-kami" class="mt-8 inline-flex border-b border-brand pb-1 text-sm font-semibold uppercase tracking-[0.08em] text-brand">Selengkapnya</NuxtLink><div class="mt-10 grid grid-cols-2 border-y border-border"><p class="py-4 text-xs font-semibold uppercase tracking-[0.08em] text-ink-secondary">SBU Jalan</p><p class="border-l border-border py-4 pl-5 text-xs font-semibold uppercase tracking-[0.08em] text-ink-secondary">SBU Jembatan</p></div></div><img :src="aboutImage" alt="Peralatan konstruksi PT. Remako Jaya Abadi" loading="lazy" class="aspect-[4/3] w-full object-cover"></div></section>

  <section class="bg-surface py-20 lg:py-28"><div class="mx-auto max-w-7xl px-6 sm:px-12"><SectionHeading eyebrow="LAYANAN KAMI" heading="Solusi konstruksi yang terintegrasi" subtext="Kami menangani berbagai jenis pekerjaan konstruksi infrastruktur dengan standar kualitas tinggi." /><div class="mt-12"><ServiceCard v-for="(service, index) in services" :key="service.title" :number="String(index + 1).padStart(2, '0')" :service="service" /></div></div></section>

  <section class="bg-surface-bg py-20 lg:py-28"><div class="mx-auto max-w-7xl px-6 sm:px-12"><SectionHeading eyebrow="PROYEK UNGGULAN" heading="Jejak rekam yang membuktikan kompetensi" subtext="Dari ruas tol Jagorawi hingga Jakarta–Cikampek, kami mengerjakan proyek infrastruktur strategis nasional." /><div class="mt-9 flex flex-wrap gap-5 border-b border-border" role="tablist" aria-label="Filter kategori proyek"><button v-for="category in categories" :key="category" type="button" role="tab" :aria-selected="activeCategory === category" class="border-b-2 px-1 pb-3 text-sm font-semibold uppercase tracking-[0.06em]" :class="activeCategory === category ? 'border-brand text-brand' : 'border-transparent text-ink-muted hover:text-ink'" @click="activeCategory = category">{{ category }}</button></div><div v-if="filteredProjects.length" class="mt-10"><FeaturedProject v-if="featuredProject" :project="featuredProject" /><div class="mt-8 grid gap-x-8 gap-y-10 md:grid-cols-2"><ProjectCard v-for="project in compactProjects" :key="`${project.title}-${project.year}-${project.client}`" :project="project" /></div></div><EmptyState v-else class="mt-10" /><div class="mt-10"><NuxtLink to="/proyek" class="inline-flex border-b border-brand pb-1 text-sm font-semibold uppercase tracking-[0.08em] text-brand">Lihat Semua Proyek</NuxtLink></div></div></section>

  <section class="bg-surface py-20 lg:py-28"><div class="mx-auto grid max-w-7xl gap-12 px-6 sm:px-12 lg:grid-cols-[.8fr_1.2fr]"><SectionHeading eyebrow="PERALATAN" heading="Kapasitas operasional yang siap dikerjakan" subtext="Didukung 35 unit heavy equipment untuk berbagai kebutuhan proyek konstruksi." /><div><EquipmentRow v-for="item in equipment" :key="item.name" :item="item" /></div></div></section>

  <section class="bg-surface-bg py-20 lg:py-28"><div class="mx-auto max-w-7xl px-6 sm:px-12"><SectionHeading eyebrow="LEGALITAS" heading="Terverifikasi dan terdaftar resmi" subtext="Perusahaan kami memiliki dokumen legalitas lengkap dan sertifikasi badan usaha." /><div class="mt-12 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-5"><article v-for="item in legalities" :key="item.label" class="border-b border-r border-border p-5"><p class="text-sm font-semibold text-ink-secondary">{{ item.label }}</p><p class="mt-2 text-sm leading-relaxed text-ink-muted">{{ item.description }}</p></article></div></div></section>

  <section class="bg-surface py-20 lg:py-28"><div class="mx-auto max-w-7xl px-6 sm:px-12"><SectionHeading eyebrow="KLIEN KAMI" heading="Dipercaya oleh perusahaan konstruksi nasional" subtext="Kami bangga menjadi mitra terpercaya untuk berbagai perusahaan konstruksi ternama." /><div class="mt-12 grid border-l border-t border-border sm:grid-cols-3 lg:grid-cols-6"><div v-for="client in clients" :key="client.name" class="grid min-h-24 place-items-center border-b border-r border-border p-4 text-center text-xs font-semibold text-ink-secondary">{{ client.name }}</div></div></div></section>

  <section class="bg-dark py-20 text-white lg:py-28"><div class="mx-auto max-w-7xl px-6 sm:px-12"><h2 class="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Punya proyek yang ingin dibangun?</h2><p class="mt-5 max-w-xl text-dark-text">Mari diskusikan kebutuhan infrastruktur Anda bersama tim kami.</p><div class="mt-8 flex flex-wrap gap-4"><NuxtLink to="/kontak" class="bg-surface px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-brand hover:bg-brand-tint">Hubungi Kami</NuxtLink><NuxtLink to="/layanan" class="border border-dark-text px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] hover:bg-dark-surface">Lihat Layanan</NuxtLink></div><p class="mt-10 border-t border-dark-surface pt-5 text-sm text-dark-text">pt.remakojayaabadi@gmail.com · 08111960-307 · Jl. At Taqwa No. 53, Jatisampurna, Bekasi</p></div></section>
</template>
