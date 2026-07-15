<script setup lang="ts">
defineProps<{ item: { name: string; quantity: string } }>()
</script>

<template>
  <article class="flex items-end justify-between gap-4 border-t border-border py-5 first:border-t-0">
    <h3 class="text-sm font-semibold uppercase tracking-[0.08em] text-ink-secondary">{{ item.name }}</h3>
    <p class="text-3xl font-bold tracking-tight text-dark">{{ item.quantity }}</p>
  </article>
</template>
