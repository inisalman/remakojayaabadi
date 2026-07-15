# Frontend Docker Build Context Design

**Tanggal:** 2026-07-15
**Status:** Disetujui

## Tujuan

Memperbaiki `frontend/Dockerfile` agar build berhasil saat Easypanel memakai `frontend` sebagai Docker build context.

## Root cause

Easypanel memanggil Docker dengan:

```text
-f .../code/frontend/Dockerfile .../code/frontend
```

Karena context adalah direktori `frontend`, instruksi `COPY frontend/...` mencari `frontend/frontend/...` dan gagal.

## Perubahan

Ubah tiga source path di `frontend/Dockerfile` menjadi relatif terhadap build context:

```dockerfile
COPY package*.json ./
COPY . ./
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

Tahap Node tetap menjalankan `npm ci` dan `npm run generate`. Tahap NGINX tetap menyalin `/app/.output/public` ke directory static NGINX.

## Verifikasi

Jalankan build dengan context `frontend` dan Dockerfile `frontend/Dockerfile`, setara pemanggilan Easypanel:

```sh
docker build -f frontend/Dockerfile frontend
```
