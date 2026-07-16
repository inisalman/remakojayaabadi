<script setup lang="ts">
import { computed, ref } from 'vue'
import projects from '~/data/projects.json'

useHead({
  title: 'Proyek Kami',
  meta: [
    { name: 'description', content: 'Portofolio proyek konstruksi PT. Remako Jaya Abadi: jalan tol, jembatan, dan infrastruktur di seluruh Indonesia.' },
    { property: 'og:title', content: 'Proyek Kami - Remako Jaya Abadi' },
    { property: 'og:description', content: 'Portofolio proyek konstruksi PT. Remako Jaya Abadi: jalan tol, jembatan, dan infrastruktur di seluruh Indonesia.' },
    { property: 'og:url', content: 'https://remakojayaabadi.com/proyek' },
  ],
  link: [
    { rel: 'canonical', href: 'https://remakojayaabadi.com/proyek' },
  ],
})

const activeCategory = ref('Semua')
const categories = ['Semua', 'Jalan Tol', 'Jembatan', 'Infrastruktur']
const filteredProjects = computed(() => activeCategory.value === 'Semua'
  ? projects
  : projects.filter((project) => project.category === activeCategory.value))
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-dark py-20 text-white lg:py-28">
      <div class="mx-auto max-w-7xl px-6 sm:px-12">
        <h1 class="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">Proyek Kami</h1>
        <p class="mt-6 max-w-2xl text-lg text-dark-text">Jejak rekam proyek infrastruktur yang telah kami kerjakan di seluruh Indonesia</p>
      </div>
    </section>

    <!-- Filter & Projects Grid -->
    <section class="bg-surface-bg py-20 lg:py-28">
      <div class="mx-auto max-w-7xl px-6 sm:px-12">
        <!-- Filter Tabs -->
        <div class="flex flex-wrap gap-5 border-b border-border">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="border-b-2 px-1 pb-3 text-sm font-semibold uppercase tracking-[0.06em]"
            :class="activeCategory === category ? 'border-brand text-brand' : 'border-transparent text-ink-muted hover:text-ink'"
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>

        <!-- Projects Grid -->
        <div v-if="filteredProjects.length" class="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="project in filteredProjects"
            :key="project.slug"
            :to="`/proyek/${project.slug}`"
            class="group block"
          >
            <div class="overflow-hidden rounded-lg bg-surface shadow-card transition-all hover:shadow-card-hover">
              <div class="aspect-video overflow-hidden">
                <img
                  :src="project.image"
                  :alt="project.alt"
                  class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div class="p-6">
                <div class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">
                  <span>{{ project.category }}</span>
                  <span>•</span>
                  <span>{{ project.year }}</span>
                </div>
                <h3 class="mt-3 text-xl font-semibold text-ink-secondary group-hover:text-brand">
                  {{ project.title }}
                </h3>
                <p class="mt-2 text-sm text-ink-muted">{{ project.client }}</p>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="mt-20 text-center">
          <p class="text-ink-muted">Tidak ada proyek dalam kategori ini.</p>
        </div>
      </div>
    </section>
  </div>
</template>
