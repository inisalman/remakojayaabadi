<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow?: string
  heading: string
  subtext?: string
  centered?: boolean
}>(), {
  eyebrow: '',
  subtext: '',
  centered: false,
})
</script>

<template>
  <div :class="[centered ? 'mx-auto text-center' : 'text-left', 'max-w-2xl']">
    <p v-if="eyebrow" class="text-xs font-semibold uppercase tracking-[0.1em] text-brand">{{ eyebrow }}</p>
    <h2 class="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{{ heading }}</h2>
    <p v-if="subtext" class="mt-4 leading-relaxed text-ink-muted">{{ subtext }}</p>
  </div>
</template>
