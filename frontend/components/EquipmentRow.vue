<script setup lang="ts">
import { Tractor, Truck, Construction } from 'lucide-vue-next'

const props = defineProps<{ item: { name: string; quantity: string; icon: string } }>()

const iconMap: Record<string, any> = {
  Tractor,
  Truck,
  Construction,
}

const icon = computed(() => iconMap[props.item.icon] || Construction)
</script>

<template>
  <article class="group flex items-center gap-5 rounded-lg border border-border bg-surface p-5 transition-all hover:border-brand/30 hover:shadow-card-hover">
    <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-brand-tint text-brand transition-colors group-hover:bg-brand group-hover:text-white">
      <component :is="icon" class="h-6 w-6" />
    </div>
    <div class="min-w-0 flex-1">
      <h3 class="text-sm font-semibold text-ink-secondary">{{ item.name }}</h3>
      <p class="mt-0.5 text-xs text-ink-muted">{{ item.quantity }}</p>
    </div>
  </article>
</template>
