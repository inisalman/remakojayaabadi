<script setup lang="ts">
defineProps<{ number: string; label: string }>()
</script>

<template>
  <div class="border-dark-surface px-6 py-8 text-left sm:border-l sm:first:border-l-0 lg:px-8">
    <p class="text-4xl font-bold tracking-tight text-white">{{ number }}</p>
    <p class="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-dark-text">{{ label }}</p>
  </div>
</template>
