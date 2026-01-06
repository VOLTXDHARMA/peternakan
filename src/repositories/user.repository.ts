

// Import koneksi database dari konfigurasi
// Object 'db' adalah client PostgreSQL yang sudah terkoneksi
import { db } from '../config/database.js';


// ===== REPOSITORY USER =====
// Repository bertanggung jawab untuk melakukan query langsung ke database
// Semua fungsi di sini adalah async karena operasi database memerlukan waktu

// Fungsi untuk mengambil semua user dari database
// Return: array berisi data user (tanpa password)
export const findAllUsers = async () => {
    // Query SELECT untuk mengambil semua user kecuali field password
    const result = await db.query(
        'SELECT id, username, email, role, is_verified, created_at FROM users'
    );
    // Kembalikan array rows dari hasil query
    return result.rows;
};

// Fungsi untuk mengambil user berdasarkan ID
// Parameter: id (string) - ID user yang akan dicari
// Return: object user jika ditemukan, null jika tidak ditemukan
export const findUserById = async (id: string) => {
    // Query SELECT dengan WHERE untuk mencari user berdasarkan ID
    // Gunakan $1 sebagai placeholder untuk mencegah SQL injection
    const result = await db.query(
        'SELECT id, username, email, role, is_verified, created_at FROM users WHERE id = $1',
        [id] // Parameter id akan menggantikan $1
    );
    // Kembalikan row pertama atau null jika tidak ada hasil
    return result.rows[0] || null;
};

// Fungsi untuk mengambil user berdasarkan EMAIL (biasanya untuk login)
// Parameter: email (string) - email user yang akan dicari
// Return: object user lengkap (termasuk password) jika ditemukan, null jika tidak
export const findByEmail = async (email: string) => {
    // Query SELECT semua field termasuk password untuk keperluan autentikasi
    const result = await db.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    return result.rows[0] || null;
};

// Fungsi untuk menambah user baru ke database
// Parameter: data user (username, email, password, nomor_hp, role)
// Return: data user yang baru dibuat (tanpa password)
export const insertUser = async (data: {
    username: string;
    email: string;
    password: string;
    nomor_hp?: string;
    role?: string;
}) => {
    // Query INSERT untuk menambah user baru
    // Gunakan RETURNING untuk mendapatkan data user yang baru dibuat
    const result = await db.query(
        `INSERT INTO users (username, email, password, nomor_hp, role, is_verified)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, username, email, role, created_at`,
        [
            data.username,        // $1 - username
            data.email,           // $2 - email
            data.password,        // $3 - password (sudah di-hash)
            data.nomor_hp || null, // $4 - nomor HP (optional, default null)
            data.role || "peternak", // $5 - role (default "peternak")
            true                  // $6 - is_verified (default true)
        ]
    );

    // Kembalikan data user yang baru dibuat (row pertama dari result)
    return result.rows[0];
};

// Fungsi untuk mengupdate data user berdasarkan ID
// Parameter: id user dan data yang akan diupdate
// Return: data user yang sudah diupdate, atau null jika user tidak ditemukan
export const modifyUser = async (id: string, data: {
    username?: string;
    email?: string;
    nomor_hp?: string;
    role?: string;
}) => {
    // Pertama, cari user yang akan diupdate
    const existing = await findUserById(id);
    // Jika user tidak ditemukan, kembalikan null
    if (!existing) return null;

    // Gabungkan data lama dengan data baru
    // Data baru akan menimpa data lama, jika tidak ada data baru gunakan data lama
    const updated = {
        username: data.username || existing.username,
        email: data.email || existing.email,
        nomor_hp: data.nomor_hp || existing.nomor_hp,
        role: data.role || existing.role,
    };

    // Query UPDATE untuk mengupdate user di database
    const result = await db.query(
        `UPDATE users 
         SET username = $1, email = $2, nomor_hp = $3, role = $4 
         WHERE id = $5
         RETURNING id, username, email, role, updated_at`,
        [
            updated.username,  // $1
            updated.email,     // $2
            updated.nomor_hp,  // $3
            updated.role,      // $4
            id                 // $5
        ]
    );

    // Kembalikan data user yang sudah diupdate
    return result.rows[0];
};

// Fungsi untuk menghapus user berdasarkan ID
// Parameter: id (string) - ID user yang akan dihapus
// Return: boolean - true jika berhasil dihapus, false jika gagal atau user tidak ditemukan
export const removeUserById = async (id: string): Promise<boolean> => {
    // Query DELETE untuk menghapus user dari database
    const result = await db.query('DELETE FROM users WHERE id = $1', [id]);
    // Kembalikan true jika ada baris yang terhapus (rowCount > 0)
    // Gunakan ?? 0 untuk handle null (jika rowCount undefined)
    return (result.rowCount ?? 0) > 0;
};
