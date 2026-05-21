# 📋 Rencana Development — Dashboard Produk Jersey Klub Bola Eropa

> **Studi Kasus**: Dashboard Produk (Opsi 1)
> **Framework**: Next.js App Router
> **Tema**: Dashboard produk jersey klub sepakbola Eropa

---

## 1. Analisis Kebutuhan & Konsep yang Wajib Diterapkan

Berikut adalah **6 konsep utama** yang wajib terimplementasi beserta rencana penerapannya:

| # | Konsep | Rencana Penerapan |
|---|--------|-------------------|
| 1 | **Component-Based Architecture** | Memecah UI menjadi komponen reusable: `JerseyCard`, `FilterSidebar`, `SearchBar`, `CategoryBadge`, `Navbar`, `Footer`, dll. |
| 2 | **State Management** | `useState` untuk search query, filter aktif, sorting. `useEffect` untuk side-effects (debounce search, dll). |
| 3 | **Mekanisme React (Virtual DOM, Re-rendering)** | Demonstrasi re-render efisien saat user mengetik di search bar — hanya daftar jersey yang berubah yang di-update ke DOM asli. |
| 4 | **Client Side Rendering (CSR)** | Halaman interaktif seperti fitur pencarian & filter menggunakan `"use client"` directive. |
| 5 | **Server Side Rendering (SSR)** | Halaman daftar jersey utama & halaman detail jersey di-render di server (`async` Server Component) agar konten langsung muncul saat halaman dibuka. |
| 6 | **Next.js App Router** | Routing berbasis folder (`app/`) dengan dynamic routes `[id]` untuk detail produk, layout nesting, dan navigasi menggunakan `<Link>`. |

---

## 2. Arsitektur & Struktur Folder

```
penugasan-frontend-komatik/
├── app/
│   ├── layout.js              # Root layout (Navbar + Footer)
│   ├── page.js                # Landing / Homepage (SSR)
│   ├── globals.css            # Global styles
│   │
│   ├── jerseys/
│   │   ├── page.js            # Daftar semua jersey (SSR + CSR filter/search)
│   │   └── [id]/
│   │       └── page.js        # Detail jersey (SSR dengan dynamic route)
│   │
│   ├── categories/
│   │   └── page.js            # Halaman kategori (SSR)
│   │
│   └── about/
│       └── page.js            # Halaman tentang website
│
├── components/
│   ├── Navbar.js              # Navigasi utama
│   ├── Footer.js              # Footer website
│   ├── JerseyCard.js          # Card produk jersey (reusable)
│   ├── JerseyGrid.js          # Grid layout untuk daftar jersey
│   ├── SearchBar.js           # Input pencarian (CSR, useState)
│   ├── FilterSidebar.js       # Sidebar filter kategori (CSR, useState)
│   ├── CategoryBadge.js       # Badge kategori (reusable)
│   ├── SortDropdown.js        # Dropdown sorting (CSR)
│   ├── HeroSection.js         # Hero banner di homepage
│   └── LeagueShowcase.js      # Showcase liga di homepage
│
├── data/
│   └── jerseys.js             # Mock data jersey (array of objects)
│
├── public/
│   └── images/
│       └── jerseys/           # Gambar mock jersey
│
├── penjelasan penugasannya.md
├── penjelasan tema websitenya.md
├── rencana-development.md     # ← File ini
├── next.config.js
├── package.json
└── README.md
```

---

## 3. Data Model Jersey

Setiap objek jersey akan memiliki struktur berikut:

```js
{
  id: 1,
  clubName: "Manchester United",
  league: "Premier League",       // Kategori liga
  country: "England",
  season: "2024/2025",
  kitType: "Home",                // Home / Away / Third / GK / Special
  issueType: "Fan Issue",         // Player Issue / Fan Issue / Retro
  brand: "Adidas",
  gender: "Men",                  // Men / Women / Kids
  price: 899000,
  description: "Jersey kandang Manchester United musim 2024/2025...",
  image: "/images/jerseys/mu-home-2425.webp",
  rating: 4.5,
  isNew: true,
}
```

---

## 4. Halaman & Fitur

### 4.1. Homepage (`/`)
- **Render**: SSR (Server Component)
- **Konten**:
  - Hero section dengan banner menarik
  - Showcase liga-liga Eropa (Premier League, La Liga, dll.)
  - Featured / New Arrivals jersey
  - Quick stats (total jersey, total klub, total liga)
- **Konsep**: SSR, Component-Based Architecture

### 4.2. Daftar Jersey (`/jerseys`)
- **Render**: Hybrid SSR + CSR
  - Data jersey di-fetch/import di server → SSR
  - Fitur search & filter → CSR (`"use client"`)
- **Konten**:
  - Search bar (pencarian berdasarkan nama klub)
  - Filter sidebar (liga, kit type, issue type, brand, season)
  - Sort dropdown (harga, nama, rating)
  - Grid jersey cards
- **Konsep**: SSR, CSR, State Management (`useState`), Virtual DOM & Re-rendering

### 4.3. Detail Jersey (`/jerseys/[id]`)
- **Render**: SSR (Server Component dengan dynamic route)
- **Konten**:
  - Gambar jersey besar
  - Informasi lengkap (klub, liga, tipe, brand, harga, deskripsi)
  - Badge kategori
  - Tombol "Kembali ke Daftar"
  - Related jerseys dari klub yang sama
- **Konsep**: SSR, App Router (dynamic route `[id]`), Component reuse

### 4.4. Halaman Kategori (`/categories`)
- **Render**: SSR
- **Konten**:
  - Overview kategori berdasarkan Liga
  - Overview kategori berdasarkan Kit Type
  - Overview kategori berdasarkan Issue Type
  - Klik kategori → navigasi ke `/jerseys` dengan filter aktif
- **Konsep**: SSR, App Router, Component reuse

### 4.5. Halaman About (`/about`)
- **Render**: SSR
- **Konten**:
  - Penjelasan tentang website
  - Informasi pembuat
- **Konsep**: SSR, routing

---

## 5. Tahapan Development (Step-by-Step)

### 📌 Tahap 1: Inisialisasi Project
- [ ] Inisialisasi project Next.js dengan App Router (`npx create-next-app@latest`)
- [ ] Setup struktur folder sesuai arsitektur di atas
- [ ] Konfigurasi `globals.css` dengan design system (color palette, typography, spacing)
- [ ] Install Google Fonts (Inter / Outfit)

**Estimasi**: ~30 menit

---

### 📌 Tahap 2: Membuat Mock Data
- [ ] Buat file `data/jerseys.js` berisi array 15–20 mock jersey
  - Minimal mencakup 5 liga berbeda
  - Variasi kit type (Home, Away, Third, GK, Special)
  - Variasi issue type (Player Issue, Fan Issue, Retro)
  - Variasi brand (Adidas, Nike, Puma, dll.)
- [ ] Generate gambar mock jersey menggunakan AI image generation
- [ ] Simpan gambar di `public/images/jerseys/`

**Estimasi**: ~1 jam

---

### 📌 Tahap 3: Komponen Dasar (Component-Based Architecture)
- [ ] Buat `components/Navbar.js` — navigasi antar halaman
- [ ] Buat `components/Footer.js` — footer website
- [ ] Pasang Navbar & Footer di `app/layout.js` (Root Layout)
- [ ] Buat `components/JerseyCard.js` — card produk reusable
- [ ] Buat `components/CategoryBadge.js` — badge reusable untuk kategori

**Konsep yang ditunjukkan**: Component-Based Architecture, App Router (Layout)

**Estimasi**: ~1.5 jam

---

### 📌 Tahap 4: Homepage — SSR
- [ ] Buat `components/HeroSection.js` — hero banner
- [ ] Buat `components/LeagueShowcase.js` — showcase liga
- [ ] Implementasi `app/page.js` sebagai Server Component
  - Import data jersey langsung di server
  - Render featured jerseys & stats tanpa `"use client"`
- [ ] Verifikasi: konten langsung muncul di page source (SSR terbukti)

**Konsep yang ditunjukkan**: SSR, Component-Based Architecture

**Estimasi**: ~1.5 jam

---

### 📌 Tahap 5: Halaman Daftar Jersey — SSR + CSR Hybrid
- [ ] Buat `app/jerseys/page.js` (Server Component) yang import data & render initial list
- [ ] Buat `components/SearchBar.js` (`"use client"`)
  - `useState` untuk menyimpan query pencarian
  - `onChange` handler yang update state saat user mengetik
  - **Ini adalah demonstrasi utama mekanisme React**:
    - State berubah → React membuat Virtual DOM baru
    - React membandingkan (diffing) Virtual DOM baru vs lama
    - Hanya elemen yang berubah yang di-update ke DOM asli (reconciliation)
- [ ] Buat `components/FilterSidebar.js` (`"use client"`)
  - `useState` untuk menyimpan filter aktif (liga, kit type, issue type, brand)
  - Multi-select filter
- [ ] Buat `components/SortDropdown.js` (`"use client"`)
  - `useState` untuk opsi sorting aktif
- [ ] Buat `components/JerseyGrid.js` — wrapper Client Component yang menggabungkan search, filter, sort, dan menampilkan jersey cards yang sudah difilter
- [ ] Pastikan data diambil di server, lalu di-pass sebagai props ke Client Component

**Konsep yang ditunjukkan**: CSR (`"use client"`), State Management (`useState`), Virtual DOM & Re-rendering, SSR (data fetching), Component-Based Architecture

**Estimasi**: ~2.5 jam

---

### 📌 Tahap 6: Halaman Detail Jersey — Dynamic Route SSR
- [ ] Buat `app/jerseys/[id]/page.js` (Server Component)
  - Ambil parameter `id` dari `params`
  - Cari data jersey berdasarkan `id` dari mock data
  - Render detail lengkap
- [ ] Tampilkan related jerseys dari liga / klub yang sama
- [ ] Navigasi menggunakan `<Link>` dari `next/link`
- [ ] Tambahkan tombol kembali ke daftar

**Konsep yang ditunjukkan**: App Router (dynamic route `[id]`, `params`), SSR, Component reuse

**Estimasi**: ~1.5 jam

---

### 📌 Tahap 7: Halaman Kategori & About
- [ ] Buat `app/categories/page.js` — overview semua kategori
  - Grupkan jersey berdasarkan liga, kit type, issue type
  - Tampilkan count per kategori
  - Link navigasi ke `/jerseys?filter=...`
- [ ] Buat `app/about/page.js` — halaman info website & pembuat

**Konsep yang ditunjukkan**: SSR, App Router, Component reuse

**Estimasi**: ~1 jam

---

### 📌 Tahap 8: Styling & Polish
- [ ] Terapkan design system yang konsisten
  - Color palette tema gelap (dark mode) atau terang
  - Warna aksen sesuai nuansa olahraga/sepakbola
- [ ] Tambahkan hover effects pada jersey cards
- [ ] Tambahkan transisi halus pada filter & search
- [ ] Pastikan layout rapi dan proporsional
- [ ] (Opsional) Tambahkan responsive design untuk mobile

**Estimasi**: ~1.5 jam

---

### 📌 Tahap 9: Testing & Verifikasi Konsep
- [ ] Verifikasi **SSR**: Buka page source → konten jersey sudah ada di HTML
- [ ] Verifikasi **CSR**: Search & filter berjalan di client tanpa reload halaman
- [ ] Verifikasi **State Management**: Ketik di search → state berubah → UI update
- [ ] Verifikasi **Virtual DOM**: Hanya elemen yang berubah yang di-re-render (cek React DevTools → Highlight Updates)
- [ ] Verifikasi **Component-Based**: Komponen digunakan ulang di berbagai halaman
- [ ] Verifikasi **App Router**: Navigasi antar halaman tanpa full reload, dynamic route berfungsi
- [ ] Jalankan `npm run build` untuk memastikan tidak ada error

**Estimasi**: ~1 jam

---

### 📌 Tahap 10: Persiapan Video Presentasi
- [ ] Siapkan script presentasi (maks 10 menit)
- [ ] Jelaskan setiap konsep yang diterapkan:
  1. **Component-Based Architecture** → tunjukkan struktur komponen & reusability
  2. **State Management** → tunjukkan `useState` di SearchBar & FilterSidebar
  3. **Mekanisme React** → jelaskan Virtual DOM diffing saat search
  4. **CSR** → tunjukkan `"use client"` directive & interaksi tanpa reload
  5. **SSR** → tunjukkan page source yang sudah berisi konten
  6. **App Router** → tunjukkan struktur folder routing & navigasi
- [ ] Record video demo + penjelasan

**Estimasi**: ~2 jam

---

## 6. Pemetaan Konsep per Halaman

| Halaman | SSR | CSR | State Mgmt | Virtual DOM | Component | App Router |
|---------|:---:|:---:|:----------:|:-----------:|:---------:|:----------:|
| Homepage `/` | ✅ | — | — | — | ✅ | ✅ |
| Daftar Jersey `/jerseys` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Detail `/jerseys/[id]` | ✅ | — | — | — | ✅ | ✅ |
| Kategori `/categories` | ✅ | — | — | — | ✅ | ✅ |
| About `/about` | ✅ | — | — | — | ✅ | ✅ |

> **Catatan**: Halaman `/jerseys` adalah "showcase utama" karena mendemonstrasikan hampir semua konsep sekaligus.

---

## 7. Estimasi Total Waktu

| Tahap | Estimasi |
|-------|----------|
| Inisialisasi Project | 30 menit |
| Mock Data & Gambar | 1 jam |
| Komponen Dasar | 1.5 jam |
| Homepage (SSR) | 1.5 jam |
| Daftar Jersey (SSR + CSR) | 2.5 jam |
| Detail Jersey (Dynamic Route) | 1.5 jam |
| Kategori & About | 1 jam |
| Styling & Polish | 1.5 jam |
| Testing & Verifikasi | 1 jam |
| Persiapan Video | 2 jam |
| **Total** | **~14 jam** |

---

## 8. Tech Stack & Dependencies

| Item | Detail |
|------|--------|
| Framework | Next.js 14+ (App Router) |
| Language | JavaScript (JSX) |
| Styling | Vanilla CSS / CSS Modules |
| Font | Google Fonts (Inter / Outfit) |
| Data | Mock data lokal (`data/jerseys.js`) |
| Images | AI-generated mock jersey images |
| Routing | Next.js App Router (folder-based) |

> **Penting**: Tidak diperlukan database atau API eksternal. Semua data adalah mock data lokal yang di-import langsung.

---

## 9. Checklist Pengumpulan

- [ ] Semua 6 konsep utama terimplementasi
- [ ] Website berjalan tanpa error (`npm run build` sukses)
- [ ] Video presentasi ≤ 10 menit
- [ ] Video menjelaskan **penerapan konsep**, bukan hanya menampilkan hasil
- [ ] Video mencakup demo layar (screen recording)
