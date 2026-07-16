export default defineNuxtConfig({
  compatibilityDate: '2025-03-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxtjs/seo'],
  css: ['~/assets/css/main.css'],
  googleFonts: { families: { Inter: [400, 500, 600, 700] } },
  nitro: { prerender: { crawlLinks: false, routes: ['/'] } },

  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      titleTemplate: '%s | Remako Jaya Abadi',
      title: 'Kontraktor Jalan & Jembatan Profesional',
      meta: [
        { name: 'description', content: 'PT. Remako Jaya Abadi — perusahaan konstruksi profesional spesialis jalan & jembatan dengan 10+ tahun pengalaman. Mengerjakan 22+ proyek tol nasional.' },
        { name: 'keywords', content: 'kontraktor jalan, kontraktor jembatan, konstruksi tol, PT Remako Jaya Abadi, pembangunan jalan tol, rekonstruksi jalan, konstruksi infrastruktur, Bekasi, Jawa Barat' },
        { name: 'author', content: 'PT. Remako Jaya Abadi' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Remako Jaya Abadi' },
        { property: 'og:locale', content: 'id_ID' },
        { property: 'og:image', content: 'https://remakojayaabadi.com/images/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'PT. Remako Jaya Abadi - Kontraktor Jalan & Jembatan Profesional' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://remakojayaabadi.com/images/og-image.png' },
        { name: 'theme-color', content: '#4647AE' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.json' },
      ],
    },
  },

  site: {
    url: 'https://remakojayaabadi.com',
    name: 'Remako Jaya Abadi',
    description: 'PT. Remako Jaya Abadi — perusahaan konstruksi profesional spesialis jalan & jembatan',
    defaultLocale: 'id',
  },

  sitemap: {
    enabled: true,
  },

  robots: {
    enabled: true,
  },

  ogImage: {
    enabled: false,
  },

  schemaOrg: {
    enabled: true,
  },
})
