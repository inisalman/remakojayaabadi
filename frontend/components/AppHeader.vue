<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'

const open = ref(false)
const links = [
  { label: 'Tentang Kami', to: '/#tentang-kami' },
  { label: 'Layanan', to: '/layanan' },
  { label: 'Proyek', to: '/proyek' },
  { label: 'Kontak', to: '/#kontak' },
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-border bg-surface">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-12">
      <NuxtLink to="/" class="flex items-center gap-3"><img src="/images/logo.webp" alt="Logo PT. Remako Jaya Abadi" class="h-[54px] w-auto"><span class="text-sm font-bold uppercase tracking-[0.1em] text-dark">PT. Remako Jaya Abadi</span></NuxtLink>
      <nav class="hidden items-center gap-7 lg:flex" aria-label="Navigasi utama"><NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="border-b-2 border-transparent text-xs font-semibold uppercase tracking-[0.08em] text-ink-secondary hover:border-brand hover:text-brand">{{ link.label }}</NuxtLink></nav>
      <NuxtLink to="/#kontak" class="hidden border border-brand px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-brand hover:bg-brand hover:text-white lg:block">Hubungi Kami</NuxtLink>
      <button class="p-2 text-ink lg:hidden" :aria-label="open ? 'Tutup menu navigasi' : 'Buka menu navigasi'" :aria-expanded="open" @click="open = !open"><X v-if="open" class="h-6 w-6" /><Menu v-else class="h-6 w-6" /></button>
    </div>
    <nav v-if="open" class="border-t border-border bg-surface px-6 py-5 lg:hidden" aria-label="Navigasi mobile"><div class="mx-auto grid max-w-7xl gap-1"><NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="border-b border-border py-4 text-sm font-semibold uppercase tracking-[0.08em] text-ink-secondary" @click="open = false">{{ link.label }}</NuxtLink><NuxtLink to="/#kontak" class="mt-4 border border-brand px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.08em] text-brand" @click="open = false">Hubungi Kami</NuxtLink></div></nav>
  </header>
</template>
