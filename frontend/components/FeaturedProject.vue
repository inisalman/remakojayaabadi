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
