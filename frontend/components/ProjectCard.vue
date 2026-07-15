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
