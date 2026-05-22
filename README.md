# Komatik: Dashboard Produk Jersey

Proyek ini adalah implementasi *full-stack* untuk studi kasus "Dashboard Produk" (Katalog Jersey). Proyek ini dibangun menggunakan arsitektur *Monorepo* yang menggabungkan frontend modern dan backend REST API yang kokoh, aman, serta terstruktur.

## 🚀 Fitur Utama

- **Katalog Publik**: Pengguna publik dapat melihat daftar produk jersey, melakukan pencarian, *sorting*, dan *filtering* (berdasarkan liga, tipe kit, dsb).
- **Manajemen Produk (Admin Only)**: Pengguna yang telah terautentikasi (Admin) dapat melakukan operasi CRUD (Create, Read, Update, Delete) pada data produk.
- **Validasi Ketat & Error Handling**: Semua input pengguna divalidasi dengan ketat, mencegah aplikasi *crash* dan memberikan pesan *error* yang terstruktur (HTTP 400).
- **Keamanan Lapis Ganda**: Menggunakan JWT dalam *HTTP-Only Cookies*, enkripsi *password* dengan Bcrypt, perlindungan *header* via Helmet, dan pencegahan *bruteforce* via Rate Limiting.

---

## 🛠️ Tech Stack & Arsitektur

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Data Fetching**: React Query (`@tanstack/react-query`)
- **State Management**: Zustand (diimplementasikan via internal package `@komatik/favorites-store`)

### Backend
- **Lingkungan & Framework**: Node.js dengan [Express.js](https://expressjs.com/)
- **Database**: PostgreSQL
- **ORM**: [Prisma ORM](https://www.prisma.io/) (*Type-safe database client*)
- **Arsitektur**: **Layered Pattern**
  - **Routes**: Menentukan *endpoint* dan *middleware*.
  - **Controllers**: Menerima request HTTP dan mengirim respons JSON.
  - **Services**: Menangani logika bisnis inti.
  - **Repositories**: Berinteraksi langsung dengan database.
- **Keamanan & Validasi**:
  - **Zod**: Untuk validasi *schema* input *request body* dan *query params*.
  - **Bcryptjs**: Untuk *hashing password*.
  - **JSON Web Token (JWT)**: Untuk autentikasi sesi via *HTTP-Only Cookie* / *Bearer Token*.
  - **Helmet & CORS**: Standar keamanan HTTP.
  - **Express Rate Limit**: Mencegah *spam request*.

---

## 💻 Panduan Instalasi & Menjalankan Proyek

### Prasyarat
- **Node.js** (Versi 18 atau terbaru)
- **Docker** (Untuk menjalankan database PostgreSQL secara lokal)

### Langkah-langkah Setup

1. **Install semua dependensi (Frontend & Backend):**
   ```bash
   npm install
   ```

2. **Siapkan *Environment Variables*:**
   ```bash
   cp .env.example .env
   ```

3. **Jalankan Database PostgreSQL via Docker:**
   ```bash
   docker compose up -d
   ```

4. **Sinkronisasi Schema Database & Jalankan Seeding:**
   Perintah ini akan membuat tabel di database dan mengisi data awal (termasuk produk dummy dan akun admin).
   ```bash
   npm exec --workspace=backend -- npx prisma db push
   npm exec --workspace=backend -- npx prisma db seed
   ```

### Menjalankan Aplikasi

Anda dapat menjalankan Frontend dan Backend secara bersamaan dari *root* folder:
```bash
npm run dev
```
Atau menjalankannya secara terpisah:
- **Frontend Saja**: `npm run dev:frontend`
- **Backend Saja**: `npm run dev:backend`

Frontend akan berjalan di **[http://localhost:3000](http://localhost:3000)** dan Backend (API) di **http://localhost:4000**.

---

## 🔐 Kredensial Admin Demo

Setelah Anda menjalankan perintah `seed` di atas, sebuah akun admin akan dibuat secara otomatis dengan data berikut:

- **Username**: `admin`
- **Password**: `admin123`

Gunakan kredensial ini di halaman login untuk mendapatkan akses menambah, mengubah, dan menghapus jersey.

---

## 📚 Catatan Autentikasi (API)
- API secara bawaan menanamkan token sesi ke dalam **HTTP-Only Cookies** setelah pengguna sukses login.
- Endpoint terproteksi (`POST`, `PUT`, `DELETE` di `/api/v1/jerseys`) juga mendukung autentikasi konvensional menggunakan *header*: `Authorization: Bearer <token>`.
