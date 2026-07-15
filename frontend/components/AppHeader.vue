<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'

const open = ref(false)
const links = [
  { label: 'Tentang Kami', to: '/tentang-kami' },
  { label: 'Layanan', to: '/layanan' },
  { label: 'Proyek', to: '/proyek' },
  { label: 'Kontak', to: '/kontak' },
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-border bg-surface">
    <div class="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 sm:px-12">
      <NuxtLink to="/" class="flex items-center gap-3 font-semibold text-ink">
        <span class="grid h-10 w-10 place-items-center rounded-lg bg-brand text-lg font-bold text-white">R</span>
        <span>Remako Jaya Abadi</span>
      </NuxtLink>
      <nav class="hidden items-center gap-7 lg:flex" aria-label="Navigasi utama">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="text-sm font-semibold uppercase tracking-[0.02em] text-ink-secondary hover:text-brand">{{ link.label }}</NuxtLink>
      </nav>
      <NuxtLink to="/kontak" class="hidden rounded-lg bg-brand px-5 py-3 text-sm font-semibold uppercase tracking-[0.02em] text-white hover:bg-brand-dark lg:block">Hubungi Kami</NuxtLink>
      <button class="rounded-md p-2 text-ink lg:hidden" :aria-label="open ? 'Tutup menu navigasi' : 'Buka menu navigasi'" :aria-expanded="open" @click="open = !open">
        <X v-if="open" class="h-6 w-6" /><Menu v-else class="h-6 w-6" />
      </button>
    </div>
    <nav v-if="open" class="border-t border-border bg-surface px-6 py-5 lg:hidden" aria-label="Navigasi mobile">
      <div class="mx-auto grid max-w-7xl gap-1 sm:px-6">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="py-3 text-base font-semibold text-ink-secondary" @click="open = false">{{ link.label }}</NuxtLink>
        <NuxtLink to="/kontak" class="mt-3 rounded-lg bg-brand px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.02em] text-white" @click="open = false">Hubungi Kami</NuxtLink>
      </div>
    </nav>
  </header>
</template>
