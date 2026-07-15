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
  <article class="group overflow-hidden rounded-xl bg-surface shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-card-hover">
    <div class="aspect-video overflow-hidden">
      <img
        :src="project.image"
        :alt="project.alt"
        loading="lazy"
        class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
      >
    </div>
    <div class="p-6">
      <p class="mb-2 text-xs font-medium uppercase tracking-[0.05em] text-brand">{{ project.category }}</p>
      <h3 class="text-xl font-semibold leading-snug text-ink-secondary">{{ project.title }}</h3>
      <p class="mt-2 text-sm leading-relaxed text-ink-muted">{{ project.excerpt }}</p>
      <p class="mt-3 text-xs font-medium uppercase tracking-[0.05em] text-ink-muted">{{ project.year }} · {{ project.client }}</p>
      <NuxtLink to="/proyek" class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark hover:underline">
        Selengkapnya <span aria-hidden="true">→</span>
      </NuxtLink>
    </div>
  </article>
</template>
