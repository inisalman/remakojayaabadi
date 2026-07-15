<script setup lang="ts">
import { computed, ref } from 'vue'
import { Construction, Tractor, Truck } from 'lucide-vue-next'
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
const filteredProjects = computed(() => activeCategory.value === 'Semua'
  ? projects
  : projects.filter((project) => project.category === activeCategory.value))
const equipmentIcons = { Construction, Tractor, Truck }
const constructionImage = 'https://placehold.co/1200x675/4647AE/FFFFFF?text=Construction'
</script>

<template>
  <section class="relative isolate overflow-hidden bg-dark">
    <img :src="constructionImage" alt="Konstruksi infrastruktur" class="absolute inset-0 -z-20 h-full w-full object-cover" fetchpriority="high">
    <div class="absolute inset-0 -z-10 bg-gradient-to-r from-dark/95 via-dark/75 to-dark/35" />
    <div class="mx-auto max-w-7xl px-6 py-28 sm:px-12 lg:py-40">
      <div class="max-w-3xl text-white" v-reveal>
        <p class="text-xs font-semibold tracking-[0.1em] text-dark-text">PERUSAHAAN KONSTRUKSI PROFESIONAL</p>
        <h1 class="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">Membangun standar baru untuk setiap proyek</h1>
        <p class="mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-xl">PT. Remako Jaya Abadi berkomitmen memberikan solusi infrastruktur terbaik di bidang pembangunan jalan, jembatan, dan konstruksi lainnya. Dengan pengalaman lebih dari 10 tahun, kami telah menyelesaikan berbagai proyek infrastruktur strategis.</p>
        <div class="mt-9 flex flex-wrap gap-4"><NuxtLink to="/proyek" class="rounded-lg bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-[0.02em] hover:bg-brand-dark">Lihat Proyek</NuxtLink><NuxtLink to="/kontak" class="rounded-lg border border-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.02em] hover:bg-white hover:text-brand">Hubungi Kami</NuxtLink></div>
      </div>
    </div>
  </section>

  <section class="bg-surface"><div class="mx-auto grid max-w-7xl divide-y divide-border px-6 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-12 lg:grid-cols-4"><StatisticBlock number="10+" label="Tahun Pengalaman" /><StatisticBlock number="22+" label="Proyek Selesai" /><StatisticBlock number="35" label="Unit Peralatan" /><StatisticBlock number="12" label="Klien Mitra" /></div></section>

  <section class="bg-surface-bg py-20 lg:py-28"><div class="mx-auto grid max-w-7xl gap-12 px-6 sm:px-12 lg:grid-cols-2 lg:items-center" v-reveal><div><SectionHeading eyebrow="TENTANG KAMI" heading="Mitra terpercaya untuk infrastruktur masa depan" /><p class="mt-6 leading-relaxed text-ink-secondary">PT. Remako Jaya Abadi berdiri sejak Desember 2024 dengan tim berpengalaman lebih dari 10 tahun di industri konstruksi. Kami berfokus pada kualitas, keselamatan, dan ketepatan waktu dalam setiap proyek yang kami kerjakan. Dengan mengutamakan prinsip keberlanjutan, kami menciptakan solusi konstruksi yang ramah lingkungan dan memberikan manfaat jangka panjang bagi masyarakat.</p><NuxtLink to="/tentang-kami" class="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark hover:underline">Selengkapnya <span aria-hidden="true">→</span></NuxtLink></div><img :src="constructionImage" alt="Peralatan konstruksi PT. Remako Jaya Abadi" loading="lazy" class="aspect-[4/3] w-full rounded-xl object-cover shadow-card"></div></section>

  <section class="bg-surface py-20 lg:py-28"><div class="mx-auto max-w-7xl px-6 sm:px-12" v-reveal><SectionHeading centered eyebrow="LAYANAN KAMI" heading="Solusi konstruksi yang terintegrasi" subtext="Kami menangani berbagai jenis pekerjaan konstruksi infrastruktur dengan standar kualitas tinggi." /><div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"><ServiceCard v-for="service in services" :key="service.title" :service="service" /></div></div></section>

  <section class="bg-surface-bg py-20 lg:py-28"><div class="mx-auto max-w-7xl px-6 sm:px-12" v-reveal><SectionHeading centered eyebrow="PROYEK UNGGULAN" heading="Jejak rekam yang membuktikan kompetensi" subtext="Dari ruas tol Jagorawi hingga Jakarta–Cikampek, kami mengerjakan proyek infrastruktur strategis nasional." /><div class="mt-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter kategori proyek"><button v-for="category in categories" :key="category" type="button" role="tab" :aria-selected="activeCategory === category" class="rounded-full px-4 py-2 text-sm font-semibold" :class="activeCategory === category ? 'bg-brand text-white' : 'bg-surface text-ink-secondary hover:bg-brand-tint'" @click="activeCategory = category">{{ category }}</button></div><div v-if="filteredProjects.length" class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"><ProjectCard v-for="project in filteredProjects" :key="`${project.title}-${project.year}-${project.client}`" :project="{ ...project, image: constructionImage }" /></div><EmptyState v-else class="mt-10" /><div class="mt-10 text-center"><NuxtLink to="/proyek" class="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark hover:underline">Lihat Semua Proyek <span aria-hidden="true">→</span></NuxtLink></div></div></section>

  <section class="bg-surface py-20 lg:py-28"><div class="mx-auto max-w-7xl px-6 sm:px-12" v-reveal><SectionHeading centered eyebrow="PERALATAN" heading="Kapasitas operasional yang siap dikerjakan" subtext="Didukung 35 unit heavy equipment untuk berbagai kebutuhan proyek konstruksi." /><div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6"><article v-for="item in equipment" :key="item.name" class="rounded-xl border border-border p-5 text-center"><component :is="equipmentIcons[item.icon as keyof typeof equipmentIcons] || Construction" class="mx-auto h-8 w-8 text-brand" /><h3 class="mt-4 font-semibold text-ink-secondary">{{ item.name }}</h3><p class="mt-1 text-sm text-ink-muted">{{ item.quantity }}</p></article></div></div></section>

  <section class="bg-surface-bg py-20 lg:py-28"><div class="mx-auto max-w-7xl px-6 sm:px-12" v-reveal><SectionHeading centered eyebrow="LEGALITAS" heading="Terverifikasi dan terdaftar resmi" subtext="Perusahaan kami memiliki dokumen legalitas lengkap dan sertifikasi badan usaha." /><div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5"><article v-for="item in legalities" :key="item.label" class="overflow-hidden rounded-xl bg-surface shadow-card"><img :src="constructionImage" :alt="item.alt" loading="lazy" class="aspect-[4/3] w-full object-cover"><div class="p-4"><h3 class="font-semibold text-ink-secondary">{{ item.label }}</h3><p class="mt-1 text-sm text-ink-muted">{{ item.description }}</p></div></article></div></div></section>

  <section class="bg-surface py-20 lg:py-28"><div class="mx-auto max-w-7xl px-6 sm:px-12" v-reveal><SectionHeading centered eyebrow="KLIEN KAMI" heading="Dipercaya oleh perusahaan konstruksi nasional" subtext="Kami bangga menjadi mitra terpercaya untuk berbagai perusahaan konstruksi ternama." /><div class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"><div v-for="client in clients" :key="client.name" class="grid min-h-24 place-items-center rounded-lg border border-border p-4 text-center text-xs font-semibold text-ink-muted grayscale transition hover:text-brand hover:grayscale-0">{{ client.name }}</div></div></div></section>

  <section class="bg-dark py-20 text-center text-white lg:py-28"><div class="mx-auto max-w-3xl px-6 sm:px-12" v-reveal><h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Punya proyek yang ingin dibangun?</h2><p class="mt-5 text-dark-text">Mari diskusikan kebutuhan infrastruktur Anda bersama tim kami.</p><div class="mt-8 flex flex-wrap justify-center gap-4"><NuxtLink to="/kontak" class="rounded-lg bg-surface px-6 py-3 text-sm font-semibold uppercase tracking-[0.02em] text-brand hover:bg-brand-tint">Hubungi Kami</NuxtLink><NuxtLink to="/layanan" class="rounded-lg border border-dark-text px-6 py-3 text-sm font-semibold uppercase tracking-[0.02em] text-white hover:bg-dark-surface">Lihat Layanan</NuxtLink></div><p class="mt-8 text-sm text-dark-text">pt.remakojayaabadi@gmail.com · 08111960-307 · Jl. At Taqwa No. 53, Jatisampurna, Bekasi</p></div></section>
</template>
