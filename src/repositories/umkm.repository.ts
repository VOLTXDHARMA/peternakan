import { db } from '../config/database';

// ===== REPOSITORY UMKM =====

export const findAllUmkm = async () => {
    const result = await db.query('SELECT * FROM umkm');
    return result.rows;
};

export const findUmkmById = async (id: string | number) => {
    const result = await db.query('SELECT * FROM umkm WHERE id = $1', [id]);
    return result.rows[0] || null;
};

export const insertUmkm = async (data: {
    user_id: number;
    nama_lengkap: string;
    jenis_usaha: string;
    lokasi_peternakan?: string;
    jenis_peternakan_utama?: string;
    foto_profile?: string;
}) => {
    const result = await db.query(
        `INSERT INTO umkm (user_id, nama_lengkap, jenis_usaha, lokasi_peternakan, jenis_peternakan_utama, foto_profile)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [
            data.user_id,
            data.nama_lengkap,
            data.jenis_usaha,
            data.lokasi_peternakan || null,
            data.jenis_peternakan_utama || null,
            data.foto_profile || null
        ]
    );
    return result.rows[0];
};

export const updateUmkm = async (id: string | number, data: Partial<{
    user_id: number;
    nama_lengkap: string;
    jenis_usaha: string;
    lokasi_peternakan: string;
    jenis_peternakan_utama: string;
    foto_profile: string;
}>) => {
    const fields = Object.keys(data);
    const values = Object.values(data);
    if (fields.length === 0) return null;
    const setClause = fields.map((f, i) => `${f} = $${i + 2}`).join(', ');
    const result = await db.query(
        `UPDATE umkm SET ${setClause} WHERE id = $1 RETURNING *`,
        [id, ...values]
    );
    return result.rows[0];
};

export const deleteUmkm = async (id: string | number) => {
    await db.query('DELETE FROM umkm WHERE id = $1', [id]);
    return true;
};
