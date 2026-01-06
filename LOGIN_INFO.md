# 🔐 Informasi Login Aplikasi Peternakan UMKM

## Kredensial Login

### Admin Account
- **Email:** admin@example.com
- **Password:** password
- **Role:** admin

### Investor Account  
- **Email:** investor01@example.com
- **Password:** password
- **Role:** investor

### Kios Account
- **Email:** kios01@example.com
- **Password:** password
- **Role:** penyedia_kios

### Peternak Account
- **Email:** anggita@an.com
- **Password:** password
- **Role:** peternak

## Cara Menggunakan

### 1. Jalankan Backend Server
```bash
# Di root folder (c:\xampp\htdocs\peternakan2)
npm run dev
```
Backend akan berjalan di: **http://localhost:3000**

### 2. Jalankan Frontend Server
```bash
# Di folder public
cd public
npm run dev
```
Frontend akan berjalan di: **http://localhost:5174**

### 3. Akses Aplikasi
Buka browser dan akses: **http://localhost:5174**

### 4. Login
1. Masukkan email dan password dari daftar di atas
2. Klik tombol Login
3. Anda akan diarahkan ke Dashboard

## Menambahkan User Baru

Ada 2 cara untuk menambahkan user baru:

### Cara 1: Melalui Form Register (Tanpa Login)
1. Di halaman login, klik link "Register" atau "Daftar"
2. Isi form:
   - Username
   - Email
   - Password
   - Nomor HP
   - Role (peternak/investor/penyedia_kios/admin)
3. Klik tombol "Register"

### Cara 2: Melalui Dashboard (Setelah Login sebagai Admin)
1. Login dengan akun admin (admin@example.com / password)
2. Klik menu "Manajemen User" di sidebar
3. Klik tombol "+ Tambah User" (hijau di kanan atas)
4. Isi form modal yang muncul:
   - Username
   - Email  
   - Password
   - Nomor HP
   - Role
5. Klik "Simpan"

## Troubleshooting

### Pesan "Backend server tidak aktif"
- Pastikan backend sudah running di port 3000
- Jalankan: `npm run dev` di root folder
- Cek dengan: `netstat -ano | Select-String ":3000"`

### Pesan "Tidak dapat memuat data"
- Pastikan Anda sudah login
- Refresh halaman dengan Ctrl+R atau F5
- Periksa console browser untuk error (F12)

### Session Expired
- Token JWT berlaku 15 menit
- Login ulang jika muncul pesan "Session expired"

## API Documentation
Swagger docs tersedia di: **http://localhost:3000/api-docs**

## Database
- **Host:** localhost
- **Port:** 5432
- **Database:** clean_arch_db
- **User:** postgres
- **Password:** (sesuai .env file Anda)
