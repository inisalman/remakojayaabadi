# Easypanel Deployment Documentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Revise `SSD.md` and `tasklist.md` so production deployment uses native Easypanel services built from service-specific Dockerfiles.

**Architecture:** Production has three native Easypanel services: frontend built from `frontend/Dockerfile`, Strapi built from `cms/Dockerfile`, and managed PostgreSQL. Easypanel owns domains, TLS, reverse proxy, redirects, service networking, persistent volumes, and environment variables. Docker Compose remains local-only documentation.

**Tech Stack:** Easypanel native App and PostgreSQL services, Dockerfile, Nuxt 3 SSG, NGINX, Strapi, PostgreSQL 16.

## Global Constraints

- Production deploy uses native Easypanel services, not Docker Compose.
- Frontend Dockerfile generates Nuxt static output and serves it via NGINX on internal port `80`.
- Strapi Dockerfile serves CMS/API on internal port `1337`.
- PostgreSQL is a private managed Easypanel service with no public domain or port.
- Easypanel owns TLS, reverse proxy, custom domains, and HTTP/`www` redirects.
- `NUXT_STRAPI_READ_TOKEN` is read-only, private to build, and absent from final frontend image and browser code.
- `NUXT_STRAPI_INTERNAL_URL` is used only for build-time server-to-server Strapi API access.
- `NUXT_PUBLIC_STRAPI_URL=https://cms.remakojayaabadi.com` is used for browser media URLs.
- Docker Compose is optional and local-only.

---

## File Structure

- Modify: `SSD.md` — replace production Compose topology and deployment wording with native Easypanel Dockerfile service model; define internal/public URLs, secret boundaries, webhook safeguards, and local-only Compose status.
- Modify: `tasklist.md` — replace Compose production task with native service checklist and add readiness, upload validation, protected webhook, and off-server backup tasks.
- Reference: `docs/superpowers/specs/deployment-design.md` — approved deployment decisions; no edits.

### Task 1: Revise SSD deployment architecture

**Files:**
- Modify: `SSD.md:64-109`
- Modify: `SSD.md:589-732`

**Interfaces:**
- Consumes: Deployment decisions in `docs/superpowers/specs/deployment-design.md`.
- Produces: SSD deployment architecture defining three native Easypanel services and Dockerfile build paths.

- [ ] **Step 1: Replace logical architecture explanation after diagram**

Replace current build/deploy explanation with:

```markdown
Nuxt mengambil data Strapi hanya saat `nuxi generate`. Hasil generate menjadi HTML statis dan asset yang di-serve NGINX. Editor tidak mengubah situs publik secara langsung; publish Strapi harus memicu rebuild frontend agar SSG memuat konten published terbaru.

Production memakai native service Easypanel, bukan Docker Compose: frontend dibangun dari `frontend/Dockerfile`, Strapi dari `cms/Dockerfile`, dan PostgreSQL memakai database service Easypanel. Easypanel menangani reverse proxy, domain, TLS, redirect HTTP ke HTTPS, dan redirect `www` ke domain utama.

[PERLU KEPUTUSAN: pilih mekanisme rebuild setelah publish — Strapi webhook ke Easypanel deploy hook atau GitHub Actions. Rekomendasi: Strapi webhook ke deploy hook yang dilindungi secret/signature.]
```

- [ ] **Step 2: Replace Easypanel topology section**

Replace current topology text with:

```markdown
### Deployment topology Easypanel

```text
Internet
  ├─ https://remakojayaabadi.com        → Easypanel reverse proxy → frontend :80
  ├─ https://www.remakojayaabadi.com    → redirect ke domain utama oleh Easypanel
  └─ https://cms.remakojayaabadi.com    → Easypanel reverse proxy → Strapi :1337

Easypanel project: remakojayaabadi
  ├─ service: frontend (Native App)
  │   ├─ source repository, Dockerfile: frontend/Dockerfile
  │   ├─ build: Nuxt 3 `npm run generate`
  │   ├─ runtime: NGINX static :80
  │   └─ public domain: remakojayaabadi.com
  ├─ service: strapi (Native App)
  │   ├─ source repository, Dockerfile: cms/Dockerfile
  │   ├─ runtime: Strapi :1337
  │   ├─ persistent volume: path uploads image final
  │   └─ public domain: cms.remakojayaabadi.com
  └─ service: postgres (Managed PostgreSQL)
      ├─ PostgreSQL 16
      ├─ private network only; no domain or public port
      └─ managed persistent database volume
```

```

- [ ] **Step 3: Replace deployment plan introduction and environment variables**

Replace the deployment plan introduction and Nuxt variable block with:

```markdown
Easypanel deploys frontend dan Strapi sebagai Native App dari repository dan Dockerfile masing-masing. Konfigurasi domain, TLS, environment variable, internal network, dan persistent mount dilakukan di UI Easypanel. Docker Compose hanya boleh dipakai sebagai referensi local development/troubleshooting, bukan deployment production.

**Nuxt build**

```dotenv
# URL internal service Easypanel; sesuaikan hostname service aktual.
NUXT_STRAPI_INTERNAL_URL=http://strapi:1337

# URL publik untuk URL media yang dipakai browser.
NUXT_PUBLIC_STRAPI_URL=https://cms.remakojayaabadi.com
NUXT_PUBLIC_SITE_URL=https://remakojayaabadi.com

# Read-only; tersedia hanya saat proses build/generate.
NUXT_STRAPI_READ_TOKEN=<read-only-api-token>
```

Simpan secret hanya di Easypanel/GitHub Secrets. Jangan commit `.env` produksi. `NUXT_STRAPI_READ_TOKEN` tidak boleh masuk `runtimeConfig.public`, browser bundle, log build, atau final image NGINX.
```

- [ ] **Step 4: Replace Compose section and Dockerfile deployment notes**

Replace Compose heading through pre-deploy steps content with:

```markdown
### Docker Compose lokal (opsional)

`docker-compose.yml` dapat ditambahkan untuk local development atau troubleshooting. File ini bukan sumber konfigurasi production dan tidak mengatur domain, TLS, secret production, volume production, atau lifecycle service Easypanel.

### Dockerfile frontend

`frontend/Dockerfile` memakai multi-stage build: Node.js 22 Alpine menjalankan `npm ci` dan `npm run generate`; NGINX Alpine hanya menerima `.output/public`. NGINX listen pada port `80` internal. TLS dan redirect HTTP/`www` tidak dikonfigurasi di container karena ditangani Easypanel.

Build variable frontend ditambahkan melalui konfigurasi build environment Easypanel. Token harus read-only, tidak dicetak ke log, dan tidak tersisa pada final stage/image.

### NGINX static config

NGINX menyediakan fallback static route dan cache header untuk asset. Konfigurasi tidak memuat sertifikat, private key, atau redirect HTTPS.
```

- [ ] **Step 5: Replace deployment steps**

Replace current numbered deployment list with:

```markdown
### Langkah deploy

1. Buat project `remakojayaabadi` di Easypanel dan hubungkan repository.
2. Buat managed PostgreSQL 16; aktifkan persistence; jangan buat domain atau expose port publik.
3. Buat Native App `strapi` dari `cms/Dockerfile`; pasang persistent volume pada path uploads image final; set semua secret environment variable.
4. Deploy Strapi, bootstrap admin pertama, lalu buat component/content type, role, permission, dan API token read-only.
5. Masukkan minimal konten published dan media; verifikasi endpoint Content API memakai token build.
6. Buat Native App `frontend` dari `frontend/Dockerfile`; set `NUXT_STRAPI_INTERNAL_URL` memakai hostname internal Strapi aktual serta variable publik dan token build.
7. Build/deploy frontend setelah Strapi siap dan endpoint published dapat dibaca. Pastikan output final hanya static asset NGINX.
8. Pasang domain utama pada frontend dan `cms` subdomain pada Strapi. Konfigurasikan redirect `www` serta HTTP ke HTTPS di Easypanel; verifikasi TLS.
9. Uji route, 404, sitemap, robots, canonical, API error, dan form kontak pada domain production.
10. Konfigurasikan Strapi webhook ke protected Easypanel deploy hook frontend; publish satu entry dan verifikasi rebuild SSG berhasil.
11. Konfigurasikan backup PostgreSQL dan uploads ke lokasi off-server; lakukan restore test sebelum handoff.
```

- [ ] **Step 6: Update security references**

Add these bullets under API token, rate limit, upload validation, and backup sections:

```markdown
- `NUXT_STRAPI_READ_TOKEN` hanya tersedia pada build frontend; pastikan tidak tersimpan pada final image NGINX melalui inspeksi image dan bundle publik.
- Deploy hook frontend harus memakai URL rahasia atau signature/authentication yang didukung; jangan expose trigger deploy tanpa proteksi.
- Path persistent upload harus diverifikasi terhadap path aplikasi dalam image Strapi final sebelum mount dibuat.
- Uji konfigurasi upload sesuai versi Strapi terpasang: JPEG/PNG/WebP/AVIF/SVG valid diterima; file executable, MIME palsu, dan file di atas batas ukuran ditolak.
- Backup PostgreSQL dan uploads harus disimpan off-server; snapshot volume lokal tidak cukup sebagai satu-satunya strategi recovery.
```

- [ ] **Step 7: Review SSD links and consistency**

Run:

```powershell
Select-String -Path "SSD.md" -Pattern "Docker Compose|depends_on|ports:|internal URL|deploy hook|NUXT_STRAPI_INTERNAL_URL|off-server" -Context 1,1
```

Expected: Compose only described as local-only; no `depends_on` or production `ports:` instructions remain; internal URL, protected deploy hook, and off-server backup requirements exist.

- [ ] **Step 8: Commit SSD revision**

```powershell
git add SSD.md
git commit -m "docs: align SSD with Easypanel Dockerfile deploy"
```

Expected: one commit changing only `SSD.md`.

### Task 2: Revise task list for native Easypanel deployment

**Files:**
- Modify: `tasklist.md:22-39`
- Modify: `tasklist.md:67`
- Modify: `tasklist.md:154-169`

**Interfaces:**
- Consumes: Revised deployment requirements in `SSD.md` and approved spec.
- Produces: Executable checklist matching native Easypanel deployment model.

- [ ] **Step 1: Replace infrastructure and deployment checklist**

Replace section `## 1. Infrastruktur dan deployment` with:

```markdown
## 1. Infrastruktur dan deployment

- [ ] Buat project `remakojayaabadi` di Easypanel dan hubungkan repository.
- [ ] Buat managed PostgreSQL 16 pada private network tanpa domain atau port publik.
- [ ] Verifikasi persistent database volume managed Easypanel.
- [ ] Buat Native App Strapi dari `cms/Dockerfile`.
- [ ] Verifikasi path uploads dari image Strapi final, lalu pasang persistent volume Easypanel pada path tersebut.
- [ ] Buat Native App frontend dari `frontend/Dockerfile`.
- [ ] Buat Dockerfile frontend multi-stage: Node 22 build dan NGINX static runtime.
- [ ] Buat Dockerfile dan konfigurasi production Strapi.
- [ ] Buat konfigurasi NGINX static fallback dan cache asset tanpa TLS/redirect di container.
- [ ] Dokumentasikan `docker-compose.yml` hanya bila diperlukan untuk local development/troubleshooting.
- [ ] Set secret environment variable Strapi di Easypanel.
- [ ] Set build environment frontend di Easypanel: internal Strapi URL, URL publik, site URL, dan read-only token.
- [ ] Pastikan token build tidak masuk browser bundle, log, source repository, atau final image NGINX.
- [ ] Pastikan Strapi siap, schema ada, token dibuat, dan content published dapat dibaca sebelum build frontend.
- [ ] Hubungkan `remakojayaabadi.com` ke frontend.
- [ ] Buat redirect `www.remakojayaabadi.com` ke domain utama di Easypanel.
- [ ] Hubungkan `cms.remakojayaabadi.com` ke Strapi.
- [ ] Aktifkan dan verifikasi TLS serta redirect HTTP ke HTTPS di Easypanel.
```

- [ ] **Step 2: Replace upload task**

Replace the upload configuration task with:

```markdown
- [ ] Konfigurasi dan uji upload sesuai versi Strapi: batas 10 MB; JPEG/PNG/WebP/AVIF/SVG valid diterima; executable, MIME palsu, dan file melebihi batas ditolak.
```

- [ ] **Step 3: Add protected deploy hook task**

Add this task after API token rotation task:

```markdown
- [ ] Konfigurasi deploy hook frontend yang dilindungi URL rahasia atau signature/authentication; jangan expose trigger deploy tanpa proteksi.
```

- [ ] **Step 4: Replace CI/CD, backup, staging, and launch tasks affected by deployment**

Replace affected deployment/backup lines with:

```markdown
- [ ] Konfigurasi Strapi webhook ke protected Easypanel deploy hook atau GitHub Actions.
- [ ] Publish entry test; verifikasi webhook memicu build ulang `frontend/Dockerfile`, SSG membaca content published, dan deployment sukses.
- [ ] Buat backup PostgreSQL harian terenkripsi ke lokasi off-server dengan retensi minimal 30 hari.
- [ ] Buat snapshot/sync uploads harian ke lokasi off-server.
- [ ] Uji restore PostgreSQL dan uploads dari backup off-server bulanan.
```

- [ ] **Step 5: Verify checklist terms**

Run:

```powershell
Select-String -Path "tasklist.md" -Pattern "Docker Compose|Native App|protected|off-server|internal Strapi URL|final image" -Context 0,0
```

Expected: Native App, protected hook, off-server backup, internal URL, and final image checks are present; Compose is local-only.

- [ ] **Step 6: Commit task list revision**

```powershell
git add tasklist.md
git commit -m "docs: update Easypanel deployment task list"
```

Expected: one commit changing only `tasklist.md`.

### Task 3: Final documentation verification

**Files:**
- Verify: `SSD.md`
- Verify: `tasklist.md`
- Verify: `docs/superpowers/specs/deployment-design.md`

**Interfaces:**
- Consumes: Both revised deployment documents.
- Produces: Verified documentation aligned with approved architecture.

- [ ] **Step 1: Check working tree**

Run:

```powershell
git status --short
git log --oneline -3
```

Expected: no unintended files; recent commits include SSD and task list revisions.

- [ ] **Step 2: Check prohibited production Compose assumptions**

Run:

```powershell
Select-String -Path "SSD.md","tasklist.md" -Pattern "depends_on|ports: \['8080:80'\]|Compose berikut menjadi referensi lokal/portable" -Context 0,0
```

Expected: no matches.

- [ ] **Step 3: Check required production terms**

Run:

```powershell
Select-String -Path "SSD.md","tasklist.md" -Pattern "Native App|frontend/Dockerfile|cms/Dockerfile|NUXT_STRAPI_INTERNAL_URL|protected|off-server" -Context 0,0
```

Expected: each required term appears in relevant documentation.

- [ ] **Step 4: Review diff**

Run:

```powershell
git show --stat --oneline HEAD~2..HEAD
git diff HEAD~2..HEAD -- SSD.md tasklist.md
```

Expected: only planned deployment documentation changes; no secret values, real tokens, or unrelated edits.

- [ ] **Step 5: Commit any verification-only correction**

If a documentation inconsistency exists, correct it, then run:

```powershell
git add SSD.md tasklist.md
git commit -m "docs: clarify Easypanel deployment details"
```

Expected: no commit when review finds no inconsistency.
