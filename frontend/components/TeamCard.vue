<script setup lang="ts">
defineProps<{ name: string; role: string }>()
</script>

<template>
  <div class="group text-center">
    <div class="relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden rounded-full bg-brand-tint ring-4 ring-white shadow-card transition-shadow duration-300 group-hover:shadow-card-hover">
      <div class="flex h-full w-full items-center justify-center">
        <span class="text-5xl font-bold text-brand/30">{{ name.charAt(0) }}</span>
      </div>
    </div>
    <div class="mt-5">
      <p class="text-base font-bold text-ink-secondary">{{ name }}</p>
      <p class="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-brand">{{ role }}</p>
    </div>
  </div>
</template>
