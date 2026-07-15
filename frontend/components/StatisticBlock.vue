<script setup lang="ts">
defineProps<{ number: string; label: string }>()
</script>

<template>
  <div class="p-6 text-center">
    <p class="text-4xl font-bold text-brand">{{ number }}</p>
    <p class="mt-2 text-xs font-medium uppercase tracking-[0.05em] text-ink-muted">{{ label }}</p>
  </div>
</template>
