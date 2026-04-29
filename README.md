# Laporan Otomatis — Shared DB

Aplikasi laporan shift dengan database bersama via Express + file JSON.

## Struktur Folder

```
laporan-app/
├── server.js          ← Express server
├── package.json
├── .gitignore
├── public/
│   └── index.html     ← Frontend HTML
└── db/                ← Folder DB (otomatis dibuat saat server start)
    ├── shift1.json
    └── shift2.json
```

## Cara Deploy ke Railway

1. Push folder ini ke GitHub repository baru
2. Buka [railway.app](https://railway.app) → New Project → Deploy from GitHub Repo
3. Pilih repo tersebut
4. Railway otomatis deteksi Node.js dan jalankan `npm start`
5. Setelah deploy, Railway kasih URL publik — buka dan langsung bisa dipakai bareng

## Jalankan Lokal

```bash
npm install
npm start
```

Buka `http://localhost:3000`

## API Endpoint

| Method | URL | Keterangan |
|--------|-----|------------|
| GET | `/api/db/shift1` | Ambil data shift 1 |
| GET | `/api/db/shift2` | Ambil data shift 2 |
| POST | `/api/db/shift1` | Simpan data shift 1 |
| POST | `/api/db/shift2` | Simpan data shift 2 |
| DELETE | `/api/db/shift1` | Reset data shift 1 |
| DELETE | `/api/db/shift2` | Reset data shift 2 |

## Catatan

- Data disimpan di folder `db/` dalam format JSON
- Semua user yang buka URL yang sama akan membaca dan menulis DB yang sama
- Auto-refresh setiap 15 detik agar data selalu sinkron antar user
