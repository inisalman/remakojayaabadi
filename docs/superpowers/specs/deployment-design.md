# Easypanel Dockerfile Deployment Design

**Tanggal:** 2026-07-14  
**Status:** Disetujui

## Tujuan

Deploy production memakai native service Easypanel per aplikasi dan Dockerfile dari repository. Hindari Docker Compose sebagai jalur production. Pertahankan Nuxt static site generation, Strapi headless CMS, dan PostgreSQL private.

## Arsitektur

```text
Internet
  ├─ remakojayaabadi.com / www.remakojayaabadi.com
  │    Easypanel reverse proxy + TLS + HTTP redirect
  │    frontend service
  │    frontend/Dockerfile → Nuxt generate → NGINX static :80
  │
  └─ cms.remakojayaabadi.com
       Easypanel reverse proxy + TLS
       strapi service
       cms/Dockerfile → Strapi :1337
            │
            └─ internal network
                 PostgreSQL service Easypanel :5432
```

## Service

### Frontend

- Native App service Easypanel dari repository.
- Build memakai `frontend/Dockerfile` multi-stage.
- Stage build memakai Node.js untuk menjalankan `npm run generate`.
- Stage runtime memakai NGINX hanya untuk `.output/public` pada port `80`.
- Tidak menyimpan source Nuxt, `.env`, atau read token pada final image.
- NGINX hanya melayani file statis, fallback route static, dan cache header asset. TLS serta redirect HTTP ke HTTPS ditangani Easypanel.

### Strapi

- Native App service Easypanel dari repository.
- Build memakai `cms/Dockerfile` production.
- Port internal `1337`.
- Volume Easypanel dipasang ke path uploads yang sama dengan image final, umumnya `/opt/app/public/uploads`.
- Domain publik hanya `cms.remakojayaabadi.com`.

### PostgreSQL

- Dibuat memakai native database service Easypanel.
- Tidak memiliki domain atau port publik.
- Data persistence dikelola volume database Easypanel.
- Strapi terhubung memakai host, port, nama database, user, dan password dari service database.

## Konfigurasi domain dan jaringan

- Easypanel menangani reverse proxy, domain custom, sertifikat TLS, dan redirect `www`/HTTP sesuai konfigurasi domain.
- Frontend dan Strapi berkomunikasi pada jaringan internal Easypanel saat build.
- `NUXT_STRAPI_INTERNAL_URL` menyimpan URL internal Strapi dari hostname/service network Easypanel, misalnya `http://strapi:1337` bila hostname tersebut tersedia.
- `NUXT_PUBLIC_STRAPI_URL=https://cms.remakojayaabadi.com` hanya dipakai untuk URL media yang dikonsumsi browser.
- `NUXT_PUBLIC_SITE_URL=https://remakojayaabadi.com` dipakai canonical dan sitemap.

## Secret dan build

- Semua secret disimpan sebagai environment variable/build variable di Easypanel, bukan repository.
- `NUXT_STRAPI_READ_TOKEN` bersifat read-only, hanya tersedia untuk proses generate, tidak masuk `runtimeConfig.public`, JavaScript browser, log, atau final image.
- Token build diputar jika sempat terekspos.
- Build frontend dilakukan setelah Strapi aktif, schema tersedia, API token dibuat, dan endpoint published content dapat dibaca.

## Alur publish dan rebuild

1. Editor publish konten di Strapi.
2. Strapi webhook memanggil deploy hook frontend Easypanel.
3. Easypanel build ulang `frontend/Dockerfile`.
4. Nuxt mengambil konten published dari Strapi internal memakai token read-only.
5. Nuxt menghasilkan static output dan Easypanel mengganti deployment frontend.
6. Jalankan smoke test URL konten yang berubah.

Deploy hook harus memakai URL rahasia atau mekanisme autentikasi/signature yang didukung. Jangan membuka endpoint deploy tanpa proteksi.

## Docker Compose

- Bukan mekanisme deploy production.
- Boleh disediakan kemudian sebagai `docker-compose.yml` untuk local development dan troubleshooting.
- Compose lokal tidak menjadi sumber konfigurasi domain, TLS, volume production, secret production, atau lifecycle service Easypanel.

## Backup dan validasi

- Backup PostgreSQL terenkripsi harian disimpan off-server, retensi minimum 30 hari.
- Uploads disnapshot atau disinkronkan harian ke storage terpisah.
- Restore database dan uploads diuji bulanan.
- Konfigurasi upload Strapi diverifikasi terhadap versi Strapi aktual melalui uji file valid, file MIME palsu, executable, dan file melebihi batas ukuran.

## Acceptance criteria

- Frontend dan Strapi build dari Dockerfile masing-masing di Easypanel.
- PostgreSQL tidak terbuka ke internet.
- Domain production memakai TLS valid dan redirect domain sesuai kebijakan.
- Uploads dan database bertahan setelah redeploy.
- Token Strapi tidak muncul pada frontend publik atau final image.
- Publish Strapi memicu rebuild frontend yang berhasil.
- Backup off-server dan restore test tersedia.
