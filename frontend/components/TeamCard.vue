<script setup lang="ts">
defineProps<{ name: string; role: string }>()
</script>

<template>
  <div class="group flex items-center gap-4 rounded-lg border border-border bg-surface p-4 transition-all hover:border-brand/30 hover:shadow-card-hover">
    <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand transition-colors group-hover:bg-brand group-hover:text-white">
      <span class="text-lg font-bold">{{ name.charAt(0) }}</span>
    </div>
    <div class="min-w-0">
      <p class="text-sm font-bold text-ink-secondary">{{ name }}</p>
      <p class="text-xs font-semibold uppercase tracking-[0.08em] text-brand">{{ role }}</p>
    </div>
  </div>
</template>
