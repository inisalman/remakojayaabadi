# Design Spec — Halaman Layanan & Proyek

> Tanggal: 2026-07-16
> Status: Approved

## Ringkasan

Menambahkan halaman `/layanan` dan `/proyek` beserta detail proyek `/proyek/[slug]` sebagai landing page expansion.

## Struktur Halaman

### `/layanan` — Listing Layanan
- Hero section: judul "Layanan Kami" + subtext
- 4 service cards besar: icon, judul, deskripsi panjang, scope pekerjaan (bullet points)
- CTA section: "Punya proyek? Hubungi kami" → scroll ke #kontak di homepage

### `/proyek` — Listing Proyek
- Hero section: judul "Proyek Kami" + subtext
- Filter tabs: Semua / Jalan Tol / Jembatan / Infrastruktur
- Grid kartu proyek: image, judul, tahun, klien, kategori
- Klik card → `/proyek/[slug]`

### `/proyek/[slug]` — Detail Proyek
- Hero image besar full-width
- Metadata bar: tahun, klien, kategori
- Deskripsi panjang tentang proyek
- Galeri foto (grid gambar)
- Back link: "← Kembali ke Proyek"

## Data Updates

### `services.json` — tambah field
- `slug` (string) — URL-friendly identifier
- `longDescription` (string) — deskripsi panjang untuk halaman layanan
- `scope` (string[]) — daftar scope pekerjaan

### `projects.json` — tambah field
- `slug` (string) — URL-friendly identifier
- `description` (string) — deskripsi panjang
- `gallery` (string[]) — array path gambar galeri

## Navigasi

- Link "Selengkapnya" di section Layanan homepage → `/layanan`
- Link "Lihat Semua Proyek" di section Proyek homepage → `/proyek`
- Card proyek di listing → `/proyek/[slug]`

## File yang Dibuat

```
frontend/
├── pages/
│   ├── layanan.vue          ← halaman listing layanan
│   └── proyek/
│       ├── index.vue        ← halaman listing proyek
│       └── [slug].vue       ← halaman detail proyek
```

## Desain Visual

- Konsisten dengan design system yang sudah ada (warna brand, font Inter, spacing)
- Pola layout mengikuti Bechtel reference (dari design.md)
- Card hover effect: subtle lift + shadow
- Responsive: mobile-first

## SEO

- Setiap halaman punya title, description, OG tags
- JSON-LD structured data untuk Service dan Project
