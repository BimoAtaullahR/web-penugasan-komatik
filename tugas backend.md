Berdasarkan materi yang telah dipelajari pada pertemuan 3 (Backend Framework dan API Development) dan pertemuan 4 (Backend Development Best Practices), teman-teman diminta untuk membangun layanan backend dan mengintegrasikannya dengan project frontend yang telah dibuat pada penugasan sebelumnya.
Teman-teman diharapkan menerapkan praktik terbaik dalam perancangan API, arsitektur kode, keamanan, serta manajemen database.

Aspek Utama yang Harus Diimplementasikan:
REST API Design: Pembuatan endpoint CRUD dengan penamaan semantik dan penggunaan HTTP Status Codes yang tepat.
Database & ORM: Pengelolaan database SQL menggunakan ORM/Query Builder (Prisma, Drizzle, atau sejenisnya) dengan type-safety.
Advanced Architecture: Penerapan Layered Pattern dengan memisahkan Routes, Controllers, Services, dan Repositories.
Authentication & Authorization: Implementasi JWT (JSON Web Token) dan password hashing (Argon2/Bcrypt) untuk membatasi hak akses pengguna.
Security & Validation: Validasi request body/params menggunakan Zod atau Joi, serta penerapan dasar keamanan (CORS, Helmet, Rate Limiting).
Professional Error Handling: Penggunaan Global Error Handler Middleware dan custom error classes untuk standar respons yang konsisten.
Ketentuan Umum:
Gunakan Node.js dan framework Express.js.
Project ini adalah kelanjutan dari studi kasus frontend yang telah dipilih sebelumnya.
Project dikerjakan secara individu.
Seluruh konsep utama wajib diimplementasikan dan dihubungkan secara langsung (full-stack integration) dengan project frontend Anda.
Fokus utama pada pemahaman konsep, struktur arsitektur, dan keamanan API, bukan pada kompleksitas fitur.
Pengumpulan dalam bentuk link repository dan video presentasi (maksimal 10 menit).
Studi Kasus (Melanjutkan Project Sebelumnya):
1. Dashboard Produk
Buat backend API untuk mengelola data produk. Implementasikan autentikasi di mana hanya pengguna yang sudah login (memiliki token JWT) yang dapat menambah, mengubah, atau menghapus data produk, sementara pengguna publik hanya dapat melihat daftar produk.
2. Website Artikel / Blog
Buat backend API untuk sistem artikel. Implementasikan autentikasi bagi penulis untuk membuat dan mengedit artikelnya sendiri. Terapkan validasi ketat pada input judul dan konten artikel menggunakan Zod/Joi sebelum data disimpan ke database.
3. Sistem Pemesanan Tiket / Event
Buat backend API untuk mengelola tiket dan pemesanan. Implementasikan relasi database antara pengguna dan tiket yang dipesan. Gunakan error handling yang baik, misalnya ketika pengguna mencoba memesan tiket yang sudah habis (return status code 400).

Ekspektasi Implementasi:
Setiap project harus menunjukkan penerapan konsep secara terstruktur:
Layered Architecture: Kode tidak menumpuk di file route. Logika bisnis terisolasi di Service, dan query database berada di Repository.
Security & Validation: API tidak boleh crash saat menerima data yang salah dari frontend; harus mengembalikan respons error validasi yang jelas.
Authentication: Terdapat pembagian endpoint publik (bisa diakses siapa saja) dan endpoint protected (membutuhkan JWT di headers).
Database Integration: Data yang ditampilkan di frontend wajib berasal dari database melalui perantara REST API, bukan mock data (hardcode).
Ekspektasi Penjelasan Video:
Video tidak hanya menampilkan fungsionalitas aplikasi yang sudah berjalan, tetapi juga menjelaskan alur request dari frontend ke backend dan bagaimana kode backend disusun.
Contoh penjelasan:
“Pada project ini, saya melanjutkan studi kasus Dashboard Produk. Backend dibangun menggunakan Express.js dengan arsitektur Layered Pattern. Ketika frontend mengirim request pembuatan produk baru, request tersebut pertama kali masuk ke Route dan divalidasi oleh Middleware menggunakan Zod. Selain itu, route ini diproteksi, sehingga sistem memverifikasi JWT dari frontend. Jika token valid dan data sesuai, Controller akan meneruskannya ke Service untuk logika bisnis, lalu Repository menyimpan data tersebut ke PostgreSQL menggunakan Prisma ORM. Jika terjadi kesalahan, seperti format data salah, Global Error Handler akan menangkapnya dan mengembalikan status code 400 beserta pesan error yang seragam.”

Format Pengumpulan:
Link repository GitHub (Sertakan backend dan frontend, boleh multi-repo atau monorepo). Pastikan menyertakan file .env.example dan dokumentasi cara run project di README.md.
Video presentasi dan demo aplikasi (Link YouTube/Gdrive yang bisa diakses).
Video Wajib Mencakup:
Demo fitur integrasi aplikasi secara langsung (Frontend berinteraksi dengan API).
Penjelasan struktur arsitektur Layered Pattern (Routes, Controllers, Services, Repositories).
Penjelasan mekanisme Authentication (JWT) dan Authorization.
Penjelasan cara validasi data (Zod/Joi) dan penanganan error.
Mendemonstrasikan respons API melalui Postman/Thunder Client/Swagger (opsional tapi disarankan).