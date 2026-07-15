<script setup lang="ts">
import { Building2, Construction, Landmark, Route } from 'lucide-vue-next'

const icons = { Building2, Construction, Landmark, Route }

defineProps<{ service: { title: string; description: string; icon: keyof typeof icons } }>()
</script>

<template>
  <article class="rounded-xl bg-surface p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-card-hover">
    <component :is="icons[service.icon]" class="h-8 w-8 text-brand" aria-hidden="true" />
    <h3 class="mt-5 text-xl font-semibold text-ink-secondary">{{ service.title }}</h3>
    <p class="mt-3 text-sm leading-relaxed text-ink-muted">{{ service.description }}</p>
    <NuxtLink to="/layanan" class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark hover:underline">
      Selengkapnya <span aria-hidden="true">→</span>
    </NuxtLink>
  </article>
</template>
