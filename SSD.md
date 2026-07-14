# Software Design Document — Rema KJ Abadi

**Project:** [remakojayaabadi.com](http://remakojayaabadi.com/)  
**Client:** Perusahaan konstruksi  
**Dokumen:** SDD v1.0  
**Status:** Draft implementasi

## 1. Overview

### Problem statement
Website company profile saat ini perlu menjadi kanal pemasaran yang cepat, mudah ditemukan, dan mudah diperbarui tanpa bergantung pada developer. Editor client sudah familiar dengan WordPress; CMS harus memberi pengalaman pengelolaan konten visual dan sederhana, tanpa mengorbankan performa situs publik.

### Goal

- Menyajikan profil, layanan, proyek, dan kanal kontak perusahaan secara profesional.
- Menjadikan proyek/portofolio sebagai bukti kompetensi utama.
- Memungkinkan admin dan editor client mengubah konten, media, SEO, dan publikasi melalui Strapi.
- Menghasilkan situs statis Nuxt 3 yang cepat, SEO-ready, dan mudah dioperasikan di VPS Easypanel.

### Scope

**In scope**

- Website publik: Home, Tentang Kami, Layanan, Proyek, Detail Proyek, Kontak, Blog/Artikel, Karir, dan Testimoni.
- Nuxt 3 + TypeScript dalam mode static site generation (SSG).
- Strapi sebagai headless CMS, PostgreSQL sebagai database.
- REST API sebagai integrasi utama. GraphQL opsional bila diputuskan kemudian.
- Upload dan pengelolaan media melalui Strapi Media Library.
- SEO teknis, sitemap, robots.txt, JSON-LD, image optimization.
- Deployment Docker pada Easypanel.
- Pelatihan handoff untuk admin/editor client.

**Out of scope**

- Transaksi e-commerce dan payment gateway.
- Portal pelanggan, login pengunjung, atau dashboard proyek privat.
- Kalkulator RAB otomatis.
- Sistem rekrutmen/ATS penuh; Karir hanya formulir atau kontak lamaran.
- Multi-bahasa. [PERLU KEPUTUSAN: apakah Bahasa Inggris dibutuhkan saat launch?]
- Komentar publik pada artikel.

## 2. User Stories

### Pengunjung

- Sebagai calon client, saya ingin memahami profil dan layanan perusahaan agar dapat menilai kesesuaian vendor.
- Sebagai calon client, saya ingin melihat portofolio dengan foto, kategori, lokasi, tahun, dan ringkasan proyek agar dapat menilai pengalaman perusahaan.
- Sebagai pengunjung, saya ingin menghubungi perusahaan dari CTA, formulir, WhatsApp, telepon, email, atau peta agar proses inquiry cepat.
- Sebagai pencari kerja, saya ingin melihat lowongan aktif dan instruksi melamar.
- Sebagai pengguna mesin pencari, saya ingin halaman memiliki judul, deskripsi, URL, gambar, dan structured data yang relevan.

### Admin dan editor client

- Sebagai admin, saya ingin mengelola pengguna dan role agar akses editor terbatas pada tugasnya.
- Sebagai editor, saya ingin membuat, menyimpan draft, menjadwalkan, dan mempublikasikan layanan, proyek, artikel, serta halaman statis tanpa kode.
- Sebagai editor, saya ingin mengunggah gambar dengan alt text agar media siap dipakai dan SEO terjaga.
- Sebagai editor, saya ingin mengubah metadata SEO per halaman agar hasil pencarian dapat dioptimalkan.
- Sebagai editor, saya ingin melihat validasi field wajib agar konten publik tidak rusak.

## 3. Arsitektur Sistem

### Logical architecture

```text
Browser / Search Bot
        |
        | HTTPS :443
        v
NGINX container — static Nuxt output (.output/public)
        |
        | pre-rendered HTML, JS, CSS, optimized images
        v
Nuxt 3 static website
        |
        | build-time HTTPS REST request + Bearer API token
        v
Strapi container — CMS/Admin/API
        |
        | private Docker network :5432
        v
PostgreSQL container
```

Nuxt mengambil data Strapi pada saat `nuxi generate`. Hasilnya menjadi HTML statis untuk halaman publik dan di-serve NGINX. Setelah editor mempublikasikan konten, situs harus dibangun ulang dan dideploy ulang agar SSG memuat perubahan.

[PERLU KEPUTUSAN: pilih mekanisme rebuild setelah publish — manual via Easypanel, webhook ke CI/CD GitHub Actions, atau Strapi webhook ke deploy hook. Rekomendasi: GitHub Actions/deploy hook.] 

### Deployment topology Easypanel

```text
Internet
  ├─ https://remakojayaabadi.com        → NGINX/Nuxt static service
  ├─ https://www.remakojayaabadi.com    → redirect ke domain utama
  └─ https://cms.remakojayaabadi.com    → Strapi admin/API

Easypanel project: remakojayaabadi
  ├─ service: frontend
  │   ├─ build image Nuxt 3
  │   ├─ runtime image NGINX
  │   └─ public network, domain utama
  ├─ service: strapi
  │   ├─ Node.js Strapi
  │   ├─ persistent volume: /opt/app/public/uploads
  │   └─ public network, domain cms subdomain
  └─ service: postgres
      ├─ PostgreSQL 16
      ├─ private network only
      └─ persistent database volume
```

### Komponen

| Komponen | Tanggung jawab |
|---|---|
| Nuxt 3 | UI, route statis, rendering SSG, SEO metadata, pemanggilan data saat build. |
| Tailwind CSS | Design system responsif bergaya modern corporate, dominan biru dan putih. |
| Strapi | Admin panel, draft/publish, RBAC, Content API, Media Library, webhook publish. |
| PostgreSQL | Penyimpanan structured content, relasi, user/role CMS, metadata. |
| NGINX | Serve static asset, gzip/brotli bila tersedia, cache header, redirect HTTP ke HTTPS. |
| Easypanel | Build/deploy container, domain/SSL, environment variable, log, volume, restart policy. |

## 4. Content Model Strapi

### Konvensi umum

- Aktifkan Draft & Publish pada tipe konten publik.
- `slug` unik, lowercase, URL-safe; buat dari judul namun tetap dapat diedit.
- Semua media harus memiliki `alternativeText`; editor wajib mengisinya.
- Field SEO memakai component reusable `shared.seo`.
- Buat component reusable `shared.cta`, `shared.statistic`, `shared.social-link`, dan `shared.address`.

### Component `shared.seo`

| Field | Tipe | Aturan |
|---|---|---|
| metaTitle | String | Required, max 60 karakter, fallback ke judul halaman. |
| metaDescription | Text | Required, target 120–160 karakter. |
| shareImage | Media (single image) | OG image, rasio rekomendasi 1.91:1. |
| canonicalURL | String | Opsional; hanya URL HTTPS valid. |
| noIndex | Boolean | Default `false`. |

### Single type `Homepage`

| Field | Tipe | Keterangan |
|---|---|---|
| heroEyebrow | String | Label singkat hero. |
| heroTitle | String | Headline utama. |
| heroDescription | Text | Ringkasan nilai perusahaan. |
| heroImage | Media (single image) | Gambar hero. |
| primaryCta | Component `shared.cta` | CTA utama. |
| secondaryCta | Component `shared.cta` | CTA sekunder. |
| featuredServicesTitle | String | Judul section layanan. |
| featuredServices | Relation many-to-many `Service` | Maksimum 6 layanan. |
| featuredProjectsTitle | String | Judul section proyek. |
| featuredProjects | Relation many-to-many `Project` | Maksimum 6 proyek. |
| statistics | Component repeatable `shared.statistic` | Mis. tahun pengalaman/proyek selesai. |
| testimonials | Relation many-to-many `Testimonial` | Testimoni pilihan. |
| seo | Component `shared.seo` | Metadata home. |

### Single type `CompanyProfile`

| Field | Tipe | Keterangan |
|---|---|---|
| companyName | String | Nama legal/brand. |
| legalName | String | Opsional. |
| tagline | String | Tagline perusahaan. |
| overview | Rich text / Blocks | Profil singkat. |
| history | Rich text / Blocks | Sejarah perusahaan. |
| vision | Text | Visi. |
| missions | Component repeatable `shared.text-item` | Misi. |
| values | Component repeatable `shared.text-item` | Nilai perusahaan. |
| logo | Media (single image) | SVG/PNG logo. |
| aboutHeroImage | Media (single image) | Hero Tentang Kami. |
| certifications | Media (multiple) | Sertifikat/legalitas. |
| seo | Component `shared.seo` | Metadata halaman. |

### Collection type `TeamMember`

| Field | Tipe | Keterangan |
|---|---|---|
| name | String | Required. |
| position | String | Jabatan. |
| photo | Media (single image) | Foto personel. |
| bio | Rich text / Blocks | Opsional. |
| displayOrder | Integer | Default 0. |
| isFeatured | Boolean | Default false. |

### Collection type `Service`

| Field | Tipe | Keterangan |
|---|---|---|
| name | String | Required. |
| slug | UID dari `name` | Required, unique. |
| excerpt | Text | Ringkasan kartu layanan. |
| description | Rich text / Blocks | Konten detail. |
| icon | Media (single image) | SVG/PNG ikon. |
| coverImage | Media (single image) | Gambar detail. |
| benefits | Component repeatable `shared.text-item` | Keunggulan layanan. |
| projects | Relation one-to-many `Project` | Portofolio terkait. |
| seo | Component `shared.seo` | Metadata detail. |

### Collection type `Project`

| Field | Tipe | Keterangan |
|---|---|---|
| title | String | Required. |
| slug | UID dari `title` | Required, unique. |
| excerpt | Text | Ringkasan portofolio. |
| description | Rich text / Blocks | Detail proyek. |
| featuredImage | Media (single image) | Required. |
| gallery | Media (multiple images) | Galeri. |
| service | Relation many-to-one `Service` | Kategori layanan utama. |
| clientName | String | Tampilkan hanya bila disetujui. |
| location | String | Kota/provinsi. |
| completionYear | Integer | Validasi 1900–tahun sekarang. |
| projectValue | Decimal | Opsional, hanya bila boleh dipublikasi. |
| area | String | Mis. `2.500 m²`. |
| status | Enumeration | `completed`, `ongoing`. |
| isFeatured | Boolean | Default false. |
| seo | Component `shared.seo` | Metadata detail. |

### Collection type `Article`

| Field | Tipe | Keterangan |
|---|---|---|
| title | String | Required. |
| slug | UID dari `title` | Required, unique. |
| excerpt | Text | Ringkasan list. |
| content | Rich text / Blocks | Isi artikel. |
| coverImage | Media (single image) | Required. |
| author | Relation many-to-one `TeamMember` | Penulis/editor tampil. |
| publishedAt | Datetime | Dari Draft & Publish. |
| category | Relation many-to-one `ArticleCategory` | Kategori. |
| seo | Component `shared.seo` | Metadata artikel. |

### Collection type `ArticleCategory`

| Field | Tipe | Keterangan |
|---|---|---|
| name | String | Required, unique. |
| slug | UID dari `name` | Required, unique. |
| description | Text | Opsional. |

### Collection type `Testimonial`

| Field | Tipe | Keterangan |
|---|---|---|
| quote | Text | Required. |
| clientName | String | Required. |
| clientPosition | String | Jabatan/perusahaan, opsional. |
| clientPhoto | Media (single image) | Opsional. |
| rating | Integer | 1–5, default 5. |
| isFeatured | Boolean | Default false. |

### Single type `Contact`

| Field | Tipe | Keterangan |
|---|---|---|
| phone | String | Format E.164 bila memungkinkan. |
| whatsapp | String | Nomor tanpa pemisah. |
| email | Email | Required. |
| address | Component `shared.address` | Alamat lengkap. |
| googleMapsEmbedUrl | String | URL embed Google Maps. |
| officeHours | Component repeatable `shared.text-item` | Jam kerja. |
| socialLinks | Component repeatable `shared.social-link` | Sosial media. |
| contactHeroImage | Media (single image) | Hero kontak. |
| seo | Component `shared.seo` | Metadata halaman. |

### Collection type `Career`

| Field | Tipe | Keterangan |
|---|---|---|
| title | String | Required. |
| slug | UID dari `title` | Required, unique. |
| employmentType | Enumeration | `full-time`, `contract`, `internship`. |
| location | String | Lokasi kerja. |
| description | Rich text / Blocks | Deskripsi. |
| requirements | Rich text / Blocks | Kualifikasi. |
| applicationEmail | Email | Atau URL formulir eksternal. |
| applicationUrl | String | Opsional. |
| closingDate | Date | Opsional. |
| isOpen | Boolean | Default true. |
| seo | Component `shared.seo` | Metadata detail. |

### Form contact
Form kontak tidak disimpan otomatis sebagai public collection type. Implementasikan endpoint server-side atau provider email terpisah agar spam protection dan notifikasi dapat dikontrol.

[PERLU KEPUTUSAN: gunakan SMTP perusahaan, Resend, Brevo, atau layanan lain untuk pengiriman inquiry.]

### Contoh schema Strapi

`src/api/project/content-types/project/schema.json`:

```json
{
  "kind": "collectionType",
  "collectionName": "projects",
  "info": {
    "singularName": "project",
    "pluralName": "projects",
    "displayName": "Project"
  },
  "options": { "draftAndPublish": true },
  "attributes": {
    "title": { "type": "string", "required": true },
    "slug": { "type": "uid", "targetField": "title", "required": true },
    "excerpt": { "type": "text", "required": true },
    "description": { "type": "blocks" },
    "featuredImage": { "type": "media", "multiple": false, "required": true, "allowedTypes": ["images"] },
    "gallery": { "type": "media", "multiple": true, "allowedTypes": ["images"] },
    "service": { "type": "relation", "relation": "manyToOne", "target": "api::service.service" },
    "location": { "type": "string" },
    "completionYear": { "type": "integer" },
    "isFeatured": { "type": "boolean", "default": false },
    "seo": { "type": "component", "component": "shared.seo" }
  }
}
```

## 5. API Design

### Prinsip

- Base URL: `https://cms.remakojayaabadi.com/api`.
- Nuxt build memakai read-only API token melalui `Authorization: bearer <token>`.
- Endpoint publik hanya membuka `find` dan `findOne` pada tipe yang memang perlu dibaca pengunjung.
- Query selalu eksplisit memakai `fields`, `filters`, `sort`, `pagination`, dan `populate`; jangan memakai `populate=*` di production kecuali audit payload membuktikan aman.
- Filter hanya konten published. Draft tidak boleh muncul pada build production.

### Endpoint

| Kebutuhan | Endpoint REST |
|---|---|
| Home | `GET /api/homepage?populate[featuredServices][populate][0]=icon&populate[featuredProjects][populate][0]=featuredImage&populate[seo][populate][0]=shareImage` |
| Profil perusahaan | `GET /api/company-profile?populate[logo]=true&populate[aboutHeroImage]=true&populate[seo][populate][0]=shareImage` |
| Layanan | `GET /api/services?fields[0]=name&fields[1]=slug&fields[2]=excerpt&sort=name:asc&populate[icon]=true` |
| Detail layanan | `GET /api/services?filters[slug][$eq]=${slug}&populate[coverImage]=true&populate[projects][populate][0]=featuredImage&populate[seo][populate][0]=shareImage` |
| Proyek | `GET /api/projects?fields[0]=title&fields[1]=slug&fields[2]=excerpt&fields[3]=location&fields[4]=completionYear&sort=completionYear:desc&populate[featuredImage]=true&populate[service][fields][0]=name` |
| Detail proyek | `GET /api/projects?filters[slug][$eq]=${slug}&populate[featuredImage]=true&populate[gallery]=true&populate[service]=true&populate[seo][populate][0]=shareImage` |
| Artikel | `GET /api/articles?sort=publishedAt:desc&populate[coverImage]=true&populate[category]=true&pagination[pageSize]=12` |
| Detail artikel | `GET /api/articles?filters[slug][$eq]=${slug}&populate[coverImage]=true&populate[author][populate][0]=photo&populate[category]=true&populate[seo][populate][0]=shareImage` |
| Karir | `GET /api/careers?filters[isOpen][$eq]=true&sort=publishedAt:desc` |
| Kontak | `GET /api/contact?populate[contactHeroImage]=true&populate[seo][populate][0]=shareImage` |

### Contoh request

```bash
curl --get 'https://cms.remakojayaabadi.com/api/projects' \
  --data-urlencode 'filters[slug][$eq]=gedung-perkantoran-jakarta' \
  --data-urlencode 'populate[featuredImage]=true' \
  --data-urlencode 'populate[gallery]=true' \
  --data-urlencode 'populate[service]=true' \
  -H 'Authorization: bearer <STRAPI_READ_TOKEN>'
```

### Contoh response

```json
{
  "data": [
    {
      "id": 12,
      "documentId": "j8x3n4kq72m0p1",
      "title": "Gedung Perkantoran Jakarta",
      "slug": "gedung-perkantoran-jakarta",
      "excerpt": "Pembangunan gedung perkantoran modern.",
      "location": "Jakarta Selatan",
      "completionYear": 2025,
      "featuredImage": {
        "id": 42,
        "url": "/uploads/gedung_cover_a1b2c3.webp",
        "alternativeText": "Fasad Gedung Perkantoran Jakarta"
      },
      "service": { "id": 3, "name": "Konstruksi Gedung" }
    }
  ],
  "meta": { "pagination": { "page": 1, "pageSize": 25, "pageCount": 1, "total": 1 } }
}
```

## 6. Frontend Architecture

### Struktur folder

```text
frontend/
├─ app.vue
├─ nuxt.config.ts
├─ pages/
│  ├─ index.vue
│  ├─ tentang-kami.vue
│  ├─ layanan/index.vue
│  ├─ layanan/[slug].vue
│  ├─ proyek/index.vue
│  ├─ proyek/[slug].vue
│  ├─ artikel/index.vue
│  ├─ artikel/[slug].vue
│  ├─ karir/index.vue
│  ├─ karir/[slug].vue
│  └─ kontak.vue
├─ components/
│  ├─ layout/{AppHeader,AppFooter,MobileNavigation}.vue
│  ├─ home/{Hero,ServiceSection,ProjectSection,TestimonialSection}.vue
│  ├─ project/{ProjectCard,ProjectGallery,ProjectFacts}.vue
│  ├─ shared/{SectionHeading,BaseButton,SeoHead,EmptyState}.vue
│  └─ contact/ContactForm.vue
├─ composables/
│  ├─ useStrapiApi.ts
│  ├─ useStrapiMedia.ts
│  └─ usePageSeo.ts
├─ types/strapi.ts
├─ utils/slug.ts
├─ assets/css/main.css
└─ public/
   ├─ robots.txt
   └─ favicon.ico
```

### Routing

Nuxt file-based routing memetakan URL berikut:

- `/`, `/tentang-kami`, `/layanan`, `/proyek`, `/artikel`, `/karir`, `/kontak`.
- `/layanan/[slug]`, `/proyek/[slug]`, `/artikel/[slug]`, `/karir/[slug]`.
- Slug invalid menghasilkan `404` melalui `createError({ statusCode: 404 })`.

### Data fetching

- Jalankan request Strapi pada server/build menggunakan `useAsyncData` atau wrapper `$fetch`.
- API token tidak pernah masuk `runtimeConfig.public`; simpan pada private runtime config.
- Base URL boleh public bila browser perlu URL media; token tetap private.
- Gunakan key cache deterministik, mis. `project:${route.params.slug}`.
- Untuk SSG, data berubah hanya pada generate/deploy. Jangan mengandalkan client fetch untuk konten utama yang wajib SEO.

`composables/useStrapiApi.ts`:

```ts
export const useStrapiApi = () => {
  const config = useRuntimeConfig()

  return $fetch.create({
    baseURL: `${config.public.strapiUrl}/api`,
    headers: {
      Authorization: `bearer ${config.strapiReadToken}`,
    },
  })
}
```

`pages/proyek/[slug].vue`:

```vue
<script setup lang="ts">
const route = useRoute()
const api = useStrapiApi()

const { data, error } = await useAsyncData(
  `project:${route.params.slug}`,
  () => api('/projects', {
    query: {
      'filters[slug][$eq]': route.params.slug,
      'populate[featuredImage]': true,
      'populate[gallery]': true,
      'populate[service]': true,
      'populate[seo][populate][0]': 'shareImage',
    },
  }),
)

const project = computed(() => data.value?.data?.[0])
if (error.value || !project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Proyek tidak ditemukan' })
}

usePageSeo(project)
</script>
```

### State management

Tidak perlu Pinia untuk content read-only. Gunakan `useState` untuk state kecil lintas komponen seperti navigasi mobile, consent cookie, atau toast. Tambahkan Pinia hanya jika ada fitur interaktif kompleks yang memiliki state bersama.

### Style system

- Tailwind dengan token warna: `brand-50` sampai `brand-900`, neutral, success, warning, error.
- Utamakan permukaan putih, teks slate/navy, dan aksen biru; kontras teks minimal WCAG AA.
- Gunakan layout responsif mobile-first, `max-w-*`, spacing konsisten, dan komponen CTA reusable.

## 7. SEO Strategy

### Wajib per halaman

- `title`, `meta description`, canonical URL, Open Graph, dan Twitter card dari `shared.seo` Strapi.
- Satu `h1` per halaman; heading berjenjang dan semantic landmark.
- Slug pendek, deskriptif, stabil; redirect 301 bila slug diubah.
- Alt text wajib untuk gambar editorial/proyek.
- Halaman detail proyek/artikel di-prerender saat generate.

`composables/usePageSeo.ts`:

```ts
export const usePageSeo = (entity: Ref<any>) => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const seo = computed(() => entity.value?.seo ?? {})
  const title = computed(() => seo.value.metaTitle || entity.value?.title || 'Rema KJ Abadi')
  const description = computed(() => seo.value.metaDescription || entity.value?.excerpt || '')
  const canonical = computed(() => seo.value.canonicalURL || `${config.public.siteUrl}${route.path}`)

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: canonical,
    ogType: 'website',
    ogImage: () => seo.value.shareImage?.url,
    twitterCard: 'summary_large_image',
  })

  useHead({ link: [{ rel: 'canonical', href: canonical }] })
}
```

### Nuxt modules dan generate

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/sitemap', '@nuxtjs/robots', 'nuxt-schema-org', '@nuxt/image'],
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml'],
    },
  },
  routeRules: {
    '/': { prerender: true },
    '/layanan/**': { prerender: true },
    '/proyek/**': { prerender: true },
    '/artikel/**': { prerender: true },
    '/karir/**': { prerender: true },
  },
  runtimeConfig: {
    strapiReadToken: '',
    public: {
      siteUrl: 'https://remakojayaabadi.com',
      strapiUrl: 'https://cms.remakojayaabadi.com',
    },
  },
})
```

Tambahkan dynamic URL ke sitemap dari query Strapi. Bila modul sitemap tidak meng-crawl seluruh route dinamis saat generate, set `nitro.prerender.routes` secara programatis dari daftar slug pada build.

### Structured data

- Home: `Organization` dan `LocalBusiness`.
- Proyek: `CreativeWork` atau `Project` generik bila schema spesifik tidak relevan.
- Artikel: `Article`.
- Breadcrumb: `BreadcrumbList` pada halaman detail.
- Kontak: alamat, telepon, email, geo/Maps bila tersedia.

```vue
<script setup lang="ts">
useSchemaOrg([
  defineOrganization({
    name: 'Rema KJ Abadi',
    url: 'https://remakojayaabadi.com',
    logo: 'https://remakojayaabadi.com/logo.png',
  }),
  defineLocalBusiness({
    name: 'Rema KJ Abadi',
    telephone: '+62...',
    email: 'info@remakojayaabadi.com',
  }),
])
</script>
```

### Image optimization

- Gunakan `NuxtImg`/`NuxtPicture`, ukuran eksplisit, lazy loading untuk gambar di bawah fold.
- Hero/LCP image memakai `preload`/`fetchpriority="high"` seperlunya.
- Prefer WebP/AVIF; simpan original cukup besar untuk responsive transform.
- Jangan optimize URL Strapi dengan provider IPX tanpa akses image source saat runtime; gunakan provider remote/CDN yang dipilih atau URL image Strapi langsung.

## 8. Deployment Plan

### Environment variables

**Strapi**

```dotenv
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
APP_KEYS=change-me-1,change-me-2,change-me-3,change-me-4
API_TOKEN_SALT=change-me
ADMIN_JWT_SECRET=change-me
TRANSFER_TOKEN_SALT=change-me
JWT_SECRET=change-me
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=remakojayaabadi
DATABASE_USERNAME=remakja
DATABASE_PASSWORD=change-me
DATABASE_SSL=false
PUBLIC_URL=https://cms.remakojayaabadi.com
```

**Nuxt build**

```dotenv
NUXT_STRAPI_READ_TOKEN=<read-only-api-token>
NUXT_PUBLIC_STRAPI_URL=https://cms.remakojayaabadi.com
NUXT_PUBLIC_SITE_URL=https://remakojayaabadi.com
```

Simpan secret hanya di Easypanel/GitHub Secrets. Jangan commit `.env` produksi.

### Docker Compose referensi

Easypanel dapat memakai service UI; compose berikut menjadi referensi lokal/portable.

```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: remakojayaabadi
      POSTGRES_USER: remakja
      POSTGRES_PASSWORD: ${DATABASE_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  strapi:
    build: ./cms
    environment:
      NODE_ENV: production
      HOST: 0.0.0.0
      PORT: 1337
      DATABASE_CLIENT: postgres
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: remakojayaabadi
      DATABASE_USERNAME: remakja
      DATABASE_PASSWORD: ${DATABASE_PASSWORD}
      APP_KEYS: ${APP_KEYS}
      API_TOKEN_SALT: ${API_TOKEN_SALT}
      ADMIN_JWT_SECRET: ${ADMIN_JWT_SECRET}
      TRANSFER_TOKEN_SALT: ${TRANSFER_TOKEN_SALT}
      JWT_SECRET: ${JWT_SECRET}
    depends_on: [postgres]
    volumes:
      - strapi_uploads:/opt/app/public/uploads
    restart: unless-stopped

  frontend:
    build:
      context: ./frontend
      args:
        NUXT_STRAPI_READ_TOKEN: ${NUXT_STRAPI_READ_TOKEN}
        NUXT_PUBLIC_STRAPI_URL: https://cms.remakojayaabadi.com
        NUXT_PUBLIC_SITE_URL: https://remakojayaabadi.com
    depends_on: [strapi]
    ports: ['8080:80']
    restart: unless-stopped

volumes:
  postgres_data:
  strapi_uploads:
```

### Nuxt Dockerfile

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG NUXT_STRAPI_READ_TOKEN
ARG NUXT_PUBLIC_STRAPI_URL
ARG NUXT_PUBLIC_SITE_URL
ENV NUXT_STRAPI_READ_TOKEN=$NUXT_STRAPI_READ_TOKEN
ENV NUXT_PUBLIC_STRAPI_URL=$NUXT_PUBLIC_STRAPI_URL
ENV NUXT_PUBLIC_SITE_URL=$NUXT_PUBLIC_SITE_URL
RUN npm run generate

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/.output/public /usr/share/nginx/html
EXPOSE 80
```

### NGINX static config

```nginx
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ $uri.html /404.html;
  }

  location ~* \.(?:css|js|mjs|woff2|svg|png|jpg|jpeg|webp|avif)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
    try_files $uri =404;
  }
}
```

### Langkah deploy

1. Buat project `remakojayaabadi` di Easypanel.
2. Buat PostgreSQL service + persistent volume. Jangan expose port DB ke public internet.
3. Deploy Strapi dengan volume uploads. Set semua secret environment variable, lalu buka `cms.remakojayaabadi.com/admin` untuk bootstrap admin pertama.
4. Buat content type/component, role editor, public/API permission, dan read-only API token.
5. Masukkan konten awal dan media. Verifikasi endpoint API dari environment build.
6. Build/deploy frontend Nuxt. Pastikan `npm run generate` selesai setelah Strapi bisa diakses.
7. Hubungkan domain utama ke frontend dan `cms` subdomain ke Strapi. Aktifkan SSL LetsEncrypt pada Easypanel.
8. Uji route, 404, sitemap, robots, canonical, API error, dan form kontak di domain production.
9. Konfigurasikan webhook rebuild setelah content publish.
10. Backup PostgreSQL dan uploads sebelum handoff.

## 9. Security

### Strapi RBAC

- `Super Admin`: hanya technical owner; akses penuh, tidak diberikan ke operasional harian client.
- `Admin`: kelola semua content, editor, media, dan setting content yang diizinkan.
- `Editor`: create/update/publish content dan upload media; tidak boleh mengubah role, token, plugin config, atau user admin.
- `Public`: hanya `find`/`findOne` untuk konten publik yang diperlukan. Tidak boleh create/update/delete.
- Review permission per content type setelah migration. Jangan memberi wildcard permission.

### API token

- Buat token read-only dengan scope endpoint publik saja bila memungkinkan.
- Token Nuxt dipakai saat build dan masuk environment build; jangan expose ke browser, repo, console log, atau response API.
- Rotasi token setelah pergantian vendor/personel atau indikasi kebocoran.
- Bila semua endpoint public read-only, token boleh dihilangkan dari browser-facing URL. Build tetap dapat memakai token untuk endpoint terbatas.

### CORS

`config/middlewares.js`:

```js
module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://remakojayaabadi.com', 'https://www.remakojayaabadi.com'],
      methods: ['GET', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
]
```

Bila Nuxt hanya fetch saat build, batasi CORS tetap untuk domain produksi dan preview yang eksplisit. Jangan gunakan `origin: '*'` bersama credential.

### Rate limit dan perimeter

- Terapkan rate limit di reverse proxy/Easypanel untuk `/api/*`, `/admin/*`, dan endpoint form.
- Form kontak: rate limit per IP, CAPTCHA/honeypot, validation server-side, dan batas payload.
- Jangan publish admin Strapi melalui domain utama; gunakan `cms.` terpisah dan TLS wajib.
- Gunakan password unik + MFA bila integrasi IdP/plugin disetujui. [PERLU KEPUTUSAN: kebutuhan SSO/MFA admin.]
- Patch image Docker dan Strapi secara terjadwal; review log aplikasi dan access log.

### Upload validation

`config/plugins.js`:

```js
module.exports = {
  upload: {
    config: {
      sizeLimit: 10 * 1024 * 1024,
      security: {
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'],
        deniedTypes: ['application/x-sh', 'application/x-dosexec'],
      },
    },
  },
}
```

- Batasi MIME type, ukuran, dan jumlah upload.
- Validasi ulang file di server; ekstensi file tidak cukup.
- Production memakai persistent volume atau object storage S3-compatible. [PERLU KEPUTUSAN: gunakan local persistent volume atau object storage untuk media dan backup.]
- Hapus EXIF sensitif bila diperlukan; cek lisensi media sebelum publikasi.

### Backup dan recovery

- PostgreSQL: backup harian terenkripsi, retensi minimal 30 hari, restore test bulanan.
- Uploads: snapshot harian atau sync ke object storage.
- Simpan secret backup di lokasi terpisah; dokumentasikan RPO/RTO.
- [PERLU KEPUTUSAN: target RPO dan RTO yang disetujui client.]

## 10. Rollout Plan

| Fase | Aktivitas | Output / acceptance criteria |
|---|---|---|
| 1. Discovery & setup | Finalisasi domain, brand asset, akses VPS, repo, environment, analytics. | Akses teknis siap; keputusan terbuka diprioritaskan. |
| 2. CMS foundation | Setup Strapi/PostgreSQL, component, content type, RBAC, media policy. | Editor dapat login dan CRUD content sesuai role. |
| 3. Seed content | Input profil, layanan, minimal proyek unggulan, kontak, image alt text. | Data cukup untuk membangun seluruh halaman utama. |
| 4. Frontend | Implement Nuxt page, component, responsive UI Tailwind, Strapi integration. | Semua route tampil sesuai desain dan data CMS. |
| 5. SEO & quality | Metadata, sitemap, robots, JSON-LD, performance/accessibility check, 404. | URL penting terindeks-ready; Lighthouse baseline diset. |
| 6. Staging & UAT | Deploy staging, cross-browser/device test, validasi content client. | UAT sign-off dan daftar defect nol blocker. |
| 7. Production launch | Backup, deploy production, DNS/SSL, smoke test, Search Console/analytics. | Situs live dan monitoring aktif. |
| 8. Handoff | Training editor, SOP publish, SOP image/SEO, akses admin, runbook. | Client mampu edit dan publish dengan pendampingan minimal. |

## 11. Open Questions

1. Identitas final: nama legal, logo, brand guideline, warna, font, dan tone copy.
2. [PERLU KEPUTUSAN: apakah Blog/Artikel, Karir, dan Testimoni diluncurkan pada fase pertama atau disiapkan kemudian?]
3. Jumlah proyek awal, kategori layanan, informasi yang boleh dipublikasikan: client, nilai proyek, alamat, dan foto.
4. [PERLU KEPUTUSAN: perlu Bahasa Inggris, multi-bahasa, atau target negara tertentu?]
5. Alur form kontak: penerima email, SLA follow-up, anti-spam, serta penyimpanan inquiry.
6. [PERLU KEPUTUSAN: manual deploy atau otomatis rebuild via webhook/CI setiap Strapi publish?]
7. Kebutuhan analytics: Google Analytics 4, Google Search Console, Meta Pixel, dan consent cookie.
8. Media storage: volume VPS atau object storage; siapa pemilik akun dan biaya storage.
9. Kebijakan backup, retensi, RPO/RTO, serta PIC pemulihan insiden.
10. Akses client ke Easypanel, GitHub, domain/DNS, dan Strapi; tentukan ownership sebelum launch.
11. Kebutuhan legal: Privacy Policy, Terms, cookie banner, nomor izin, sertifikasi, dan disclosure proyek.
12. Target launch, tahapan UAT, serta PIC approver konten dan desain.

## Lampiran: Checklist handoff editor

- Gunakan gambar web-ready, minimum 1600px untuk hero, rasio konsisten, ukuran file terkompresi.
- Isi alt text yang menjelaskan gambar, bukan nama file.
- Isi `metaTitle` dan `metaDescription` setiap halaman/proyek/artikel.
- Preview konten sebelum publish; cek desktop dan mobile.
- Setelah publish, jalankan mekanisme rebuild; cek URL publik, sitemap, dan share preview.
- Jangan menghapus media yang masih dipakai entry lain.
- Laporkan perubahan akses, token, atau domain kepada PIC teknis.
'