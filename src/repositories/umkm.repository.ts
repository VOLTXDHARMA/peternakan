import { db } from '../config/database';

const baseSelect = `SELECT id, user_id, nama_lengkap, jenis_usaha, lokasi_peternakan, jenis_peternakan_utama, foto_profile, created_at, updated_at FROM umkm`;

export const findAllUmkm = async () => {
    const result = await db.query(baseSelect + ' ORDER BY created_at DESC');
    return result.rows;
};

export const findUmkmById = async (id: string) => {
    const result = await db.query(baseSelect + ' WHERE id = $1', [id]);
    return result.rows[0] || null;
};

export const insertUmkm = async (data: any) => {
    const result = await db.query(
        `INSERT INTO umkm (user_id, nama_lengkap, jenis_usaha, lokasi_peternakan, jenis_peternakan_utama, foto_profile)
         VALUES ($1,$2,$3,$4,$5,$6)
         RETURNING id, user_id, nama_lengkap, jenis_usaha, lokasi_peternakan, jenis_peternakan_utama, foto_profile, created_at, updated_at`,
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

export const updateUmkm = async (id: string, data: any) => {
    const existing = await findUmkmById(id);
    if (!existing) return null;
    const merged = {
        nama_lengkap: data.nama_lengkap ?? existing.nama_lengkap,
        jenis_usaha: data.jenis_usaha ?? existing.jenis_usaha,
        lokasi_peternakan: data.lokasi_peternakan ?? existing.lokasi_peternakan,
        jenis_peternakan_utama: data.jenis_peternakan_utama ?? existing.jenis_peternakan_utama,
        foto_profile: data.foto_profile ?? existing.foto_profile
    };
    const result = await db.query(
        `UPDATE umkm SET nama_lengkap=$1, jenis_usaha=$2, lokasi_peternakan=$3, jenis_peternakan_utama=$4, foto_profile=$5, updated_at=NOW()
         WHERE id=$6 RETURNING id, user_id, nama_lengkap, jenis_usaha, lokasi_peternakan, jenis_peternakan_utama, foto_profile, created_at, updated_at`,
        [merged.nama_lengkap, merged.jenis_usaha, merged.lokasi_peternakan, merged.jenis_peternakan_utama, merged.foto_profile, id]
    );
    return result.rows[0];
};

export const deleteUmkm = async (id: string): Promise<boolean> => {
    const result = await db.query('DELETE FROM umkm WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
};
