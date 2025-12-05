
// Import koneksi database dari konfigurasi
import { db } from '../config/database';


// ===== REPOSITORY USER =====

// Fungsi untuk mengambil semua user dari database
export const findAllUsers = async () => {
    const result = await db.query(
        'SELECT id, username, email, role, is_verified, created_at FROM users'
    );
    return result.rows;
};

// Fungsi untuk mengambil user berdasarkan ID
export const findUserById = async (id: string) => {
    const result = await db.query(
        'SELECT id, username, email, role, is_verified, created_at FROM users WHERE id = $1',
        [id]
    );
    return result.rows[0] || null;
};

// Fungsi untuk mengambil user berdasarkan EMAIL (biasanya untuk login)
export const findByEmail = async (email: string) => {
    const result = await db.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    return result.rows[0] || null;
};

// Fungsi untuk menambah user baru ke database
export const insertUser = async (data: {
    username: string;
    email: string;
    password: string;
    nomor_hp?: string;
    role?: string;
}) => {
    const result = await db.query(
        `INSERT INTO users (username, email, password, nomor_hp, role, is_verified)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, username, email, role, created_at`,
        [
            data.username,
            data.email,
            data.password,
            data.nomor_hp || null,
            data.role || "peternak",
            true
        ]
    );

    return result.rows[0];
};

// Fungsi untuk mengupdate data user berdasarkan ID
export const modifyUser = async (id: string, data: {
    username?: string;
    email?: string;
    nomor_hp?: string;
    role?: string;
}) => {
    const existing = await findUserById(id);
    if (!existing) return null;

    const updated = {
        username: data.username || existing.username,
        email: data.email || existing.email,
        nomor_hp: data.nomor_hp || existing.nomor_hp,
        role: data.role || existing.role,
    };

    const result = await db.query(
        `UPDATE users 
         SET username = $1, email = $2, nomor_hp = $3, role = $4 
         WHERE id = $5
         RETURNING id, username, email, role, updated_at`,
        [
            updated.username,
            updated.email,
            updated.nomor_hp,
            updated.role,
            id
        ]
    );

    return result.rows[0];
};

// Fungsi untuk menghapus user berdasarkan ID
export const removeUserById = async (id: string): Promise<boolean> => {
    const result = await db.query('DELETE FROM users WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
};
