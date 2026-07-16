export default defineNuxtConfig({
  compatibilityDate: '2025-03-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
  css: ['~/assets/css/main.css'],
  googleFonts: { families: { Inter: [400, 500, 600, 700] } },
  nitro: { prerender: { crawlLinks: false, routes: ['/'] } },
})
