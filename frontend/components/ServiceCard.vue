<script setup lang="ts">
import { Building2, Construction, Landmark, Route } from 'lucide-vue-next'

const icons = { Building2, Construction, Landmark, Route }

defineProps<{
  number: string
  service: { title: string; description: string; icon: keyof typeof icons }
}>()
</script>

<template>
  <article class="grid gap-5 border-t border-border py-7 md:grid-cols-[5rem_1fr_auto] md:items-start">
    <p class="text-2xl font-bold tracking-tight text-brand">{{ number }}</p>
    <div>
      <h3 class="text-xl font-semibold text-ink-secondary">{{ service.title }}</h3>
      <p class="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">{{ service.description }}</p>
    </div>
    <NuxtLink to="/layanan" class="w-fit border-b border-brand pb-1 text-sm font-semibold uppercase tracking-[0.08em] text-brand">Selengkapnya</NuxtLink>
  </article>
</template>
