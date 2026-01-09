# 🐛 Bug Fix: Login Error "Unexpected end of JSON input"

## Masalah yang Terjadi

Ketika user mencoba login, muncul error:
```
Failed to execute 'json' on 'Response': Unexpected end of JSON input
```

## Penyebab Masalah

1. **Backend server tidak berjalan** saat frontend mencoba melakukan request login
2. Backend server crash setelah selesai menjalankan migration database karena ada masalah dengan async IIFE execution di `database.ts`
3. TSX watch mode (`tsx watch` / `tsx --watch`) memiliki issue yang menyebabkan process exit setelah migration selesai

## Solusi yang Diterapkan

### 1. Memisahkan Migration dari Server Startup
File yang diubah: [`src/server.ts`](../src/server.ts)

**Sebelum:**
```typescript
import { runMigrations } from './config/database.js';

(async () => {
    await runMigrations();
    app.listen(PORT, ...);
})();
```

**Sesudah:**
```typescript
// Migration tidak otomatis dijalankan saat server start
const server = app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
```

### 2. Memperbaiki Database Connection
File yang diubah: [`src/config/database.ts`](../src/config/database.ts)

**Perubahan:**
- Mengubah dari `Client` ke `Pool` untuk koneksi yang lebih stabil
- Menghapus IIFE yang menyebabkan `process.exit(1)`
- Test connection dilakukan dengan promise chain, bukan async/await IIFE

### 3. Memperbaiki Error Middleware Response Format
File yang diubah: [`src/middlewares/error.middleware.ts`](../src/middlewares/error.middleware.ts)

**Perubahan:**
- Menambahkan `status: 'error'` di semua error response untuk konsistensi format

### 4. Update NPM Scripts
File yang diubah: [`package.json`](../package.json)

```json
{
  "scripts": {
    "dev": "tsx src/server.ts",          // Tanpa watch mode (stabil)
    "dev:watch": "tsx --watch src/server.ts",  // Dengan watch mode (opsional)
    "migrate": "tsx src/scripts/migrate.ts"     // Run migrations terpisah
  }
}
```

### 5. Password Correction
Password yang benar untuk user `anggita@an.com` adalah **"password"** (bukan "123456")

## Cara Menjalankan Aplikasi

### Setup Awal (Hanya Sekali)
```bash
# 1. Install dependencies
npm install

# 2. Setup database (jika belum)
npm run setup-db

# 3. Jalankan migration
npm run migrate
```

### Menjalankan Aplikasi
```bash
# Terminal 1: Backend Server
npm run dev
# Server akan berjalan di: http://localhost:3000
# API Docs: http://localhost:3000/api-docs

# Terminal 2: Frontend Server
cd public
npm run dev
# Frontend akan berjalan di: http://localhost:5173 (atau port lain)
```

### Login Credentials
- **Email:** `anggita@an.com`
- **Password:** `password`
- **Role:** `peternak`

## Testing Login API

Dengan PowerShell:
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"anggita@an.com","password":"password"}' `
  -UseBasicParsing | Select-Object StatusCode, Content
```

Response sukses:
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "accessToken": "eyJ...",
    "refreshToken": "eyJ..."
  }
}
```

## File-File yang Diubah

1. ✅ [`src/server.ts`](../src/server.ts) - Hapus auto-migration
2. ✅ [`src/config/database.ts`](../src/config/database.ts) - Ubah ke Pool, perbaiki async execution
3. ✅ [`src/middlewares/error.middleware.ts`](../src/middlewares/error.middleware.ts) - Format response
4. ✅ [`package.json`](../package.json) - Update scripts
5. ✅ User password di database - Update ke hash baru

## Catatan Penting

- ⚠️ **Jangan gunakan `tsx watch` atau `tsx --watch` untuk production** - gunakan proses manager seperti PM2
- ✅ Server harus berjalan **sebelum** mencoba login dari frontend
- ✅ Pastikan PostgreSQL service berjalan
- ✅ Port 3000 (backend) dan 5173 (frontend) harus bebas/tidak digunakan aplikasi lain

## Verifikasi Fix Berhasil

1. Backend server berjalan dan tidak crash:
   ```bash
   netstat -ano | findstr :3000
   # Harus ada output: TCP 0.0.0.0:3000 ... LISTENING
   ```

2. API login mengembalikan JSON response:
   ```bash
   # Status 200 dan ada accessToken
   ```

3. Frontend bisa connect ke backend tanpa CORS error

## Debugging Tips

Jika masih ada masalah:
1. **Cek backend logs** - Lihat terminal dimana `npm run dev` dijalankan
2. **Cek frontend network tab** - Buka DevTools > Network saat login
3. **Test API manual** - Gunakan Postman atau curl untuk test endpoint `/api/auth/login`
4. **Restart database** - Pastikan PostgreSQL service running

---

**Status:** ✅ Fixed
**Date:** January 7, 2025
**Fixed by:** GitHub Copilot
