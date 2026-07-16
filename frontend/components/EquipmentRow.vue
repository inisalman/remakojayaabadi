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
  <article class="group flex flex-col items-center gap-4 rounded-xl border border-border bg-surface p-8 text-center transition-all hover:border-brand/30 hover:shadow-card-hover">
    <div class="flex h-16 w-16 items-center justify-center rounded-xl bg-brand-tint text-brand transition-colors group-hover:bg-brand group-hover:text-white">
      <component :is="icon" class="h-8 w-8" />
    </div>
    <div>
      <h3 class="text-base font-bold text-ink-secondary">{{ item.name }}</h3>
      <p class="mt-2 text-2xl font-bold tracking-tight text-dark">{{ item.quantity }}</p>
    </div>
  </article>
</template>
