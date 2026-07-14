<script setup lang="ts">
useHead({
  title: 'Rema KJ Abadi | Segera Hadir',
  meta: [
    {
      name: 'description',
      content: 'Website resmi Rema KJ Abadi sedang dalam pengembangan.',
    },
  ],
})
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-[#f8fbff] text-ink">
    <div class="architect-grid absolute inset-0 opacity-70" aria-hidden="true" />
    <div class="absolute -left-24 top-20 h-64 w-64 rounded-full bg-brand-100 blur-3xl" aria-hidden="true" />
    <div class="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-brand-300/30 blur-3xl" aria-hidden="true" />

    <main class="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-3xl flex-col px-6 pb-12 pt-8 sm:px-10 sm:pt-12">
      <header class="flex items-center gap-3" aria-label="Rema KJ Abadi">
        <span class="grid h-10 w-10 place-items-center rounded-xl bg-navy text-sm font-bold text-white shadow-panel">R</span>
        <span class="text-sm font-bold tracking-[0.2em] text-navy">REMA KJ ABADI</span>
      </header>

      <section class="my-auto py-20 sm:py-28" aria-labelledby="maintenance-title">
        <div class="float-slow mb-8 inline-flex items-center gap-2 rounded-full border border-brand-300 bg-white/85 px-4 py-2 text-xs font-bold tracking-[0.14em] text-brand-700 shadow-sm backdrop-blur">
          <span class="h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
          WEBSITE SEDANG DISIAPKAN
        </div>

        <h1 id="maintenance-title" class="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-navy sm:text-6xl">
          Membangun standar baru untuk setiap proyek.
        </h1>

        <p class="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
          Website resmi Rema KJ Abadi sedang dalam pengembangan. Kami akan segera hadir dengan informasi layanan dan portofolio terbaru.
        </p>

        <div class="mt-10 max-w-md rounded-2xl bg-navy p-6 text-white shadow-panel sm:p-7">
          <p class="text-xs font-bold tracking-[0.18em] text-brand-300">STATUS</p>
          <p class="mt-2 text-2xl font-semibold">Segera hadir</p>
          <div class="mt-5 h-px bg-white/15" />
          <p class="mt-4 text-sm leading-6 text-slate-300">Kami sedang menyiapkan pengalaman digital yang lebih baik untuk Anda.</p>
        </div>
      </section>
    </main>

    <footer class="relative mx-auto w-full max-w-3xl px-6 pb-8 text-xs text-slate-500 sm:px-10">
      © 2026 Rema KJ Abadi. Seluruh hak cipta dilindungi.
    </footer>
  </div>
</template>
