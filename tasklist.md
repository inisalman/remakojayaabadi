# Task List — Remako Jaya Abadi

Sumber: [SSD.md](SSD.md)

## 0. Keputusan dan akses awal

- [ ] Finalkan identitas: nama legal, logo, brand guideline, warna, font, tone copy.
- [ ] Tentukan fitur fase pertama: Blog/Artikel, Karir, Testimoni.
- [ ] Tentukan kebutuhan Bahasa Inggris atau multi-bahasa.
- [ ] Tetapkan konten proyek yang boleh dipublikasikan: client, nilai, alamat, foto.
- [ ] Tentukan penerima inquiry, SLA follow-up, anti-spam, dan penyimpanan form.
- [ ] Pilih provider email/form: SMTP perusahaan, Resend, Brevo, atau lain.
- [ ] Pilih mekanisme rebuild setelah publish: deploy hook atau GitHub Actions.
- [ ] Tentukan analytics: GA4, Search Console, Meta Pixel, consent cookie.
- [ ] Pilih storage media: persistent volume VPS atau object storage.
- [ ] Tetapkan backup, retensi, RPO, RTO, dan PIC pemulihan.
- [ ] Tetapkan akses dan ownership Easypanel, GitHub, domain/DNS, Strapi.
- [ ] Finalkan kebutuhan legal: Privacy Policy, Terms, cookie banner, izin, sertifikasi.
- [ ] Tetapkan target launch, tahapan UAT, dan PIC approver.
- [ ] Siapkan akses VPS/Easypanel, domain/DNS, repository, dan environment.

## 1. Infrastruktur dan deployment

- [ ] Buat project `remakojayaabadi` di Easypanel.
- [ ] Siapkan service PostgreSQL 16 pada private network.
- [ ] Pasang persistent volume PostgreSQL.
- [ ] Siapkan service Strapi dengan persistent volume uploads.
- [ ] Siapkan service frontend Nuxt dengan runtime NGINX.
- [ ] Buat Dockerfile frontend multi-stage: Node 22 build dan NGINX runtime.
- [ ] Buat konfigurasi NGINX static fallback, cache asset, gzip/brotli bila tersedia.
- [ ] Buat Dockerfile dan konfigurasi production Strapi.
- [ ] Tambahkan `docker-compose.yml` referensi lokal/portable.
- [ ] Set environment variable Strapi di secret manager Easypanel.
- [ ] Set environment variable Nuxt build di secret manager Easypanel.
- [ ] Pastikan secret produksi tidak masuk repository atau browser.
- [ ] Hubungkan `remakojayaabadi.com` ke frontend.
- [ ] Buat redirect `www.remakojayaabadi.com` ke domain utama.
- [ ] Hubungkan `cms.remakojayaabadi.com` ke Strapi.
- [ ] Aktifkan SSL LetsEncrypt untuk semua domain.

## 2. CMS Strapi dan database

- [ ] Inisialisasi Strapi dan koneksi PostgreSQL.
- [ ] Bootstrap Super Admin pertama.
- [ ] Aktifkan Draft & Publish pada content type publik.
- [ ] Buat component `shared.seo`.
- [ ] Buat component `shared.cta`.
- [ ] Buat component `shared.statistic`.
- [ ] Buat component `shared.social-link`.
- [ ] Buat component `shared.address`.
- [ ] Buat component `shared.text-item`.
- [ ] Buat single type `Homepage`.
- [ ] Buat single type `CompanyProfile`.
- [ ] Buat single type `Contact`.
- [ ] Buat collection type `TeamMember`.
- [ ] Buat collection type `Service`.
- [ ] Buat collection type `Project`.
- [ ] Buat collection type `Article`.
- [ ] Buat collection type `ArticleCategory`.
- [ ] Buat collection type `Testimonial`.
- [ ] Buat collection type `Career`.
- [ ] Terapkan slug UID unik, lowercase, URL-safe.
- [ ] Terapkan field SEO reusable pada halaman/content detail relevan.
- [ ] Tambahkan validasi field wajib, batas karakter, enum, dan relasi sesuai SSD.
- [ ] Validasi `completionYear` proyek dari 1900 sampai tahun berjalan.
- [ ] Jadikan `alternativeText` media wajib melalui SOP/validasi editor.
- [ ] Konfigurasi upload: batas 10 MB, MIME whitelist, validasi server-side.

## 3. Akses, API, dan keamanan CMS

- [ ] Buat role `Admin`, `Editor`, dan `Public`.
- [ ] Batasi `Super Admin` hanya untuk technical owner.
- [ ] Konfigurasi RBAC per content type tanpa wildcard permission.
- [ ] Batasi role Public ke `find` dan `findOne` untuk konten publik.
- [ ] Buat API token read-only untuk proses build Nuxt.
- [ ] Pastikan token tidak masuk `runtimeConfig.public`, log, response, atau repo.
- [ ] Konfigurasi CORS hanya untuk domain production dan preview eksplisit.
- [ ] Terapkan rate limit untuk `/api/*`, `/admin/*`, dan endpoint form.
- [ ] Pisahkan admin Strapi pada domain `cms.` dengan TLS wajib.
- [ ] Tentukan MFA/SSO admin bila dibutuhkan.
- [ ] Dokumentasikan rotasi API token dan akses vendor/personel.
- [ ] Jadwalkan patch image Docker dan Strapi serta review log.

## 4. Frontend Nuxt

- [ ] Inisialisasi Nuxt 3 + TypeScript + Tailwind CSS.
- [ ] Buat token Tailwind `brand`, `neutral`, `success`, `warning`, `error`.
- [ ] Buat shell aplikasi dan layout global.
- [ ] Buat `AppHeader`, `AppFooter`, dan `MobileNavigation`.
- [ ] Buat komponen shared: `SectionHeading`, `BaseButton`, `SeoHead`, `EmptyState`.
- [ ] Buat komponen home: `Hero`, `ServiceSection`, `ProjectSection`, `TestimonialSection`.
- [ ] Buat komponen proyek: `ProjectCard`, `ProjectGallery`, `ProjectFacts`.
- [ ] Buat `ContactForm`.
- [ ] Buat `useStrapiApi.ts` dengan token private saat build.
- [ ] Buat `useStrapiMedia.ts`.
- [ ] Buat `usePageSeo.ts`.
- [ ] Buat type TypeScript untuk response Strapi.
- [ ] Buat util slug bila diperlukan.
- [ ] Implement halaman `/`.
- [ ] Implement halaman `/tentang-kami`.
- [ ] Implement halaman `/layanan` dan `/layanan/[slug]`.
- [ ] Implement halaman `/proyek` dan `/proyek/[slug]`.
- [ ] Implement halaman `/artikel` dan `/artikel/[slug]` bila masuk fase pertama.
- [ ] Implement halaman `/karir` dan `/karir/[slug]` bila masuk fase pertama.
- [ ] Implement halaman `/kontak`.
- [ ] Tampilkan 404 untuk slug invalid dengan `createError`.
- [ ] Gunakan cache key data deterministik per route.
- [ ] Pastikan konten utama di-fetch saat build/server, bukan client-only.
- [ ] Buat UI responsif mobile-first dan penuhi kontras WCAG AA.

## 5. Form kontak

- [ ] Pilih implementasi endpoint server-side atau provider email terpisah.
- [ ] Tambahkan validasi input server-side.
- [ ] Tambahkan rate limit per IP.
- [ ] Tambahkan CAPTCHA atau honeypot.
- [ ] Batasi ukuran payload form.
- [ ] Kirim notifikasi inquiry ke penerima yang disetujui.
- [ ] Uji spam protection, error state, dan notifikasi pengiriman.

## 6. SEO, SSG, dan performa

- [ ] Tambahkan `@nuxtjs/sitemap`, `@nuxtjs/robots`, `nuxt-schema-org`, `@nuxt/image`.
- [ ] Konfigurasi SSG `nuxi generate` dan prerender route publik.
- [ ] Generate/prerender semua route dinamis dari slug Strapi.
- [ ] Buat sitemap termasuk URL dinamis.
- [ ] Buat `robots.txt`.
- [ ] Tambahkan title, meta description, canonical, Open Graph, Twitter card per halaman.
- [ ] Pastikan satu `h1`, heading berjenjang, dan semantic landmark setiap halaman.
- [ ] Buat strategi redirect 301 saat slug berubah.
- [ ] Tambahkan JSON-LD `Organization` dan `LocalBusiness` pada home.
- [ ] Tambahkan JSON-LD `CreativeWork`/`Project` pada detail proyek.
- [ ] Tambahkan JSON-LD `Article` pada detail artikel.
- [ ] Tambahkan `BreadcrumbList` pada halaman detail.
- [ ] Gunakan `NuxtImg`/`NuxtPicture`, dimensi eksplisit, lazy loading bawah fold.
- [ ] Preload hero/LCP image bila perlu.
- [ ] Gunakan WebP/AVIF bila tersedia.
- [ ] Audit provider image remote/CDN; jangan pakai IPX tanpa source runtime.
- [ ] Tetapkan Lighthouse baseline performa dan aksesibilitas.

## 7. Konten awal

- [ ] Input profil perusahaan, sejarah, visi, misi, nilai, logo, dan sertifikasi.
- [ ] Input data kontak, jam kerja, peta, dan sosial media.
- [ ] Input seluruh layanan dan benefit.
- [ ] Input minimal proyek unggulan lengkap dengan galeri dan metadata.
- [ ] Input testimoni bila masuk fase pertama.
- [ ] Input artikel dan kategori bila masuk fase pertama.
- [ ] Input lowongan aktif bila masuk fase pertama.
- [ ] Lengkapi alt text setiap media.
- [ ] Lengkapi `metaTitle`, `metaDescription`, OG image, dan canonical konten.
- [ ] Review izin publikasi foto, data client, nilai proyek, dan alamat.

## 8. CI/CD, backup, staging, dan launch

- [ ] Konfigurasi deploy/rebuild otomatis dari Strapi webhook atau GitHub Actions.
- [ ] Pastikan publish Strapi memicu build SSG dan deploy frontend.
- [ ] Buat backup PostgreSQL harian terenkripsi dengan retensi minimal 30 hari.
- [ ] Buat snapshot/sync harian untuk uploads.
- [ ] Simpan secret backup terpisah.
- [ ] Uji restore database dan uploads bulanan.
- [ ] Deploy staging.
- [ ] Jalankan cross-browser dan cross-device test.
- [ ] Uji route, 404, sitemap, robots, canonical, API error, dan form pada staging.
- [ ] Lakukan UAT bersama client; selesaikan seluruh defect blocker.
- [ ] Backup sebelum production launch.
- [ ] Deploy production dan jalankan smoke test domain live.
- [ ] Konfigurasi Search Console dan analytics yang disetujui.
- [ ] Aktifkan monitoring log, error, dan uptime.

## 9. Handoff

- [ ] Buat SOP editor untuk draft, preview, schedule, publish, dan rebuild.
- [ ] Buat SOP upload gambar, kompresi, rasio, dan alt text.
- [ ] Buat SOP SEO: `metaTitle`, `metaDescription`, canonical, share image.
- [ ] Buat SOP jangan menghapus media yang masih dipakai entry lain.
- [ ] Buat runbook akses, token, domain, deploy, backup, dan recovery.
- [ ] Latih admin/editor client.
- [ ] Serahkan akses sesuai ownership yang disetujui.
- [ ] Dapatkan konfirmasi handoff dari client.
