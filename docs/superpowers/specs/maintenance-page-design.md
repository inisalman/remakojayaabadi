# Maintenance Page Design

**Tanggal:** 2026-07-14  
**Status:** Disetujui

## Tujuan

Menyediakan website sementara yang profesional untuk domain production selama frontend utama sedang dibuat atau maintenance. Halaman harus dapat langsung di-deploy sebagai Native App Easypanel dari `frontend/Dockerfile`.

## Scope

- Satu halaman Nuxt 3 static site generation.
- Tailwind CSS untuk styling modern corporate biru-putih.
- Output static di-serve NGINX.
- Tanpa CTA, form, WhatsApp, email, social link, countdown, analytics, atau data eksternal.
- Tanpa gambar eksternal atau runtime dependency.

## Visual

- Latar putih dengan grid biru lembut sebagai aksen arsitektural.
- Wordmark teks `REMA KJ ABADI` pada bagian atas.
- Badge uppercase: `WEBSITE SEDANG DISIAPKAN`.
- Headline: `Membangun standar baru untuk setiap proyek.`
- Copy: `Website resmi Rema KJ Abadi sedang dalam pengembangan. Kami akan segera hadir dengan informasi layanan dan portofolio terbaru.`
- Kartu status navy dengan label `STATUS` dan nilai `Segera hadir`.
- Footer: `© 2026 Rema KJ Abadi. Seluruh hak cipta dilindungi.`

## Responsiveness dan aksesibilitas

- Layout mobile-first dengan konten utama maksimal 48rem.
- Teks body memenuhi minimal kontras WCAG AA terhadap background.
- Satu heading `h1`; landmark `main` dan `footer` semantik.
- Animasi dekoratif bersifat halus, menghormati `prefers-reduced-motion`, dan tidak diperlukan untuk memahami konten.
- Tidak ada interaksi yang membutuhkan keyboard atau mouse.

## Struktur file

```text
frontend/
├─ app.vue
├─ nuxt.config.ts
├─ package.json
├─ tsconfig.json
├─ tailwind.config.ts
├─ postcss.config.js
├─ Dockerfile
├─ nginx.conf
├─ assets/css/main.css
└─ pages/index.vue
```

## Build dan deploy

- `npm run generate` menghasilkan `.output/public`.
- Dockerfile multi-stage memakai Node.js 22 Alpine untuk build dan NGINX Alpine untuk runtime.
- Final image hanya menyalin `.output/public` dan `nginx.conf`; tidak memuat source, `.env`, atau token.
- NGINX listen pada port internal `80`; Easypanel mengatur domain, TLS, reverse proxy, dan redirect HTTP/`www`.
- Native App Easypanel memakai Dockerfile `frontend/Dockerfile` dari awal agar struktur repository tetap selaras dengan arsitektur multi-service.

## Acceptance criteria

- `npm run generate` selesai tanpa error dan menghasilkan output static.
- Image Docker berhasil dibuild dan menyajikan halaman pada port `80`.
- Halaman responsive pada viewport 320px sampai desktop.
- Tidak ada request ke resource eksternal.
- HTML memiliki satu `h1`, `main`, dan `footer`.
- Tampilan memakai palet biru-putih modern corporate dan tidak menampilkan aksi kontak.
