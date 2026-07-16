<script setup lang="ts">
defineProps<{ name: string; role: string }>()
</script>

<template>
  <div class="group relative overflow-hidden">
    <div class="aspect-[3/4] w-full overflow-hidden bg-dark-surface">
      <div class="absolute inset-0 z-10 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
      <div class="flex h-full w-full items-center justify-center">
        <span class="text-6xl font-bold text-white/10">{{ name.charAt(0) }}</span>
      </div>
    </div>
    <div class="absolute bottom-0 left-0 right-0 z-20 p-5">
      <p class="text-base font-semibold text-white">{{ name }}</p>
      <p class="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-dark-text">{{ role }}</p>
    </div>
  </div>
</template>
