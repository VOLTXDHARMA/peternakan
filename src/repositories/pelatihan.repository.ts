// Import koneksi database dari konfigurasi
import { db } from '../config/database';

// ===== REPOSITORY PELATIHAN =====

// Fungsi untuk mengambil semua pelatihan dari database
export const findAllPelatihan = async () => {
    const result = await db.query('SELECT * FROM pelatihan');
    return result.rows;
};

// Fungsi untuk mengambil pelatihan berdasarkan ID
export const findPelatihanById = async (id: string | number) => {
    const result = await db.query('SELECT * FROM pelatihan WHERE id = $1', [id]);
    return result.rows[0] || null;
};

// Fungsi untuk menambah pelatihan baru ke database
export const insertPelatihan = async (data: {
    judul_pelatihan: string;
    deskripsi: string;
    kategori: string;
    tingkat_kesulitan: string;
    durasi_menit: number;
    instruktur?: string;
    tumbnail?: string;
    video_url?: string;
    dokumen_url?: string;
    passing_score?: number;
    is_published?: boolean;
}) => {
    const result = await db.query(
        `INSERT INTO pelatihan (judul_pelatihan, deskripsi, kategori, tingkat_kesulitan, durasi_menit, instruktur, tumbnail, video_url, dokumen_url, passing_score, is_published)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
        [
            data.judul_pelatihan,
            data.deskripsi,
            data.kategori,
            data.tingkat_kesulitan,
            data.durasi_menit,
            data.instruktur,
            data.tumbnail,
            data.video_url,
            data.dokumen_url,
            data.passing_score || 70,
            data.is_published || false
        ]
    );
    return result.rows[0];
};

// Fungsi untuk mengupdate data pelatihan berdasarkan ID
export const updatePelatihan = async (id: string | number, data: Partial<{
    judul_pelatihan: string;
    deskripsi: string;
    kategori: string;
    tingkat_kesulitan: string;
    durasi_menit: number;
    instruktur: string;
    tumbnail: string;
    video_url: string;
    dokumen_url: string;
    passing_score: number;
    is_published: boolean;
}>) => {
    const fields = Object.keys(data);
    const values = Object.values(data);
    const setClause = fields.map((f, i) => `${f} = $${i + 2}`).join(', ');
    const result = await db.query(
        `UPDATE pelatihan SET ${setClause} WHERE id = $1 RETURNING *`,
        [id, ...values]
    );
    return result.rows[0];
};

// Fungsi untuk menghapus pelatihan berdasarkan ID
export const deletePelatihan = async (id: string | number) => {
    await db.query('DELETE FROM pelatihan WHERE id = $1', [id]);
    return true;
};
