import { db } from '../config/database.js';

export type TernakCreate = {
    user_id: string;
    umkm_id?: number;
    kode_ternak: string;
    jenis_ternak: string;
    ras?: string;
    jenis_kelamin: string;
    tanggal_lahir?: string; // ISO date
    umur_bulan?: number;
    berat_awal?: number;
    berat_sekarang?: number;
    kondisi: string;
    harga_beli?: number;
    foto_ternak?: string;
    status: string;
};

export type TernakUpdate = Partial<Omit<TernakCreate, 'user_id' | 'kode_ternak'>> & { kondisi?: string; status?: string };

const baseSelect = `SELECT id, user_id, umkm_id, kode_ternak, jenis_ternak, ras, jenis_kelamin, umur_bulan, berat_awal, berat_sekarang, kondisi, harga_beli, foto_ternak, status, created_at, updated_at FROM ternak`;

export const findAllTernak = async () => {
    const result = await db.query(baseSelect + ' ORDER BY created_at DESC');
    return result.rows;
};

export const findTernakById = async (id: string) => {
    const result = await db.query(baseSelect + ' WHERE id = $1', [id]);
    return result.rows[0] || null;
};

export const insertTernak = async (data: TernakCreate) => {
    const result = await db.query(
        `INSERT INTO ternak (user_id, umkm_id, kode_ternak, jenis_ternak, ras, jenis_kelamin, tanggal_lahir, umur_bulan, berat_awal, berat_sekarang, kondisi, harga_beli, foto_ternak, status)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
         RETURNING id, user_id, umkm_id, kode_ternak, jenis_ternak, ras, jenis_kelamin, umur_bulan, berat_awal, berat_sekarang, kondisi, harga_beli, foto_ternak, status, created_at, updated_at`,
        [
            data.user_id,
            data.umkm_id || null,
            data.kode_ternak,
            data.jenis_ternak,
            data.ras || null,
            data.jenis_kelamin,
            data.tanggal_lahir || null,
            data.umur_bulan || null,
            data.berat_awal || null,
            data.berat_sekarang || null,
            data.kondisi,
            data.harga_beli || null,
            data.foto_ternak || null,
            data.status
        ]
    );
    return result.rows[0];
};

export const updateTernak = async (id: string, data: TernakUpdate) => {
    const existing = await findTernakById(id);
    if (!existing) return null;

    const merged = {
        ras: data.ras ?? existing.ras,
        jenis_kelamin: data.jenis_kelamin ?? existing.jenis_kelamin,
        tanggal_lahir: data.tanggal_lahir ?? existing.tanggal_lahir,
        umur_bulan: data.umur_bulan ?? existing.umur_bulan,
        berat_awal: data.berat_awal ?? existing.berat_awal,
        berat_sekarang: data.berat_sekarang ?? existing.berat_sekarang,
        kondisi: data.kondisi ?? existing.kondisi,
        harga_beli: data.harga_beli ?? existing.harga_beli,
        foto_ternak: data.foto_ternak ?? existing.foto_ternak,
        status: data.status ?? existing.status
    };

    const result = await db.query(
        `UPDATE ternak SET ras = $1, jenis_kelamin = $2, tanggal_lahir = $3, umur_bulan = $4, berat_awal = $5, berat_sekarang = $6, kondisi = $7, harga_beli = $8, foto_ternak = $9, status = $10, updated_at = NOW()
         WHERE id = $11
         RETURNING id, user_id, kode_ternak, jenis_ternak, ras, jenis_kelamin, umur_bulan, berat_awal, berat_sekarang, kondisi, harga_beli, foto_ternak, status, created_at, updated_at`,
        [
            merged.ras,
            merged.jenis_kelamin,
            merged.tanggal_lahir,
            merged.umur_bulan,
            merged.berat_awal,
            merged.berat_sekarang,
            merged.kondisi,
            merged.harga_beli,
            merged.foto_ternak,
            merged.status,
            id
        ]
    );
    return result.rows[0];
};

export const deleteTernak = async (id: string): Promise<boolean> => {
    const result = await db.query('DELETE FROM ternak WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
};