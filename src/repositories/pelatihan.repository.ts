import { db } from '../config/database';

const baseSelect = `SELECT id, judul_pelatihan, deskripsi, kategori, tingkat_kesulitan, durasi_menit, instruktur, thumbnail, video_url, dokumen_url, passing_score, is_published, created_at, updated_at FROM pelatihan`;

export const findAllPelatihan = async () => {
    const result = await db.query(baseSelect + ' ORDER BY created_at DESC');
    return result.rows;
};

export const findPelatihanById = async (id: string) => {
    const result = await db.query(baseSelect + ' WHERE id = $1', [id]);
    return result.rows[0] || null;
};

export const insertPelatihan = async (data: any) => {
    const result = await db.query(
        `INSERT INTO pelatihan (judul_pelatihan, deskripsi, kategori, tingkat_kesulitan, durasi_menit, instruktur, thumbnail, video_url, dokumen_url, passing_score, is_published)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
         RETURNING id, judul_pelatihan, deskripsi, kategori, tingkat_kesulitan, durasi_menit, instruktur, thumbnail, video_url, dokumen_url, passing_score, is_published, created_at, updated_at`,
        [
            data.judul_pelatihan,
            data.deskripsi,
            data.kategori,
            data.tingkat_kesulitan,
            data.durasi_menit || null,
            data.instruktur || null,
            data.thumbnail || null,
            data.video_url || null,
            data.dokumen_url || null,
            data.passing_score ?? 70,
            data.is_published ?? false
        ]
    );
    return result.rows[0];
};

export const updatePelatihan = async (id: string, data: any) => {
    const existing = await findPelatihanById(id);
    if (!existing) return null;
    const merged = {
        judul_pelatihan: data.judul_pelatihan ?? existing.judul_pelatihan,
        deskripsi: data.deskripsi ?? existing.deskripsi,
        kategori: data.kategori ?? existing.kategori,
        tingkat_kesulitan: data.tingkat_kesulitan ?? existing.tingkat_kesulitan,
        durasi_menit: data.durasi_menit ?? existing.durasi_menit,
        instruktur: data.instruktur ?? existing.instruktur,
        thumbnail: data.thumbnail ?? existing.thumbnail,
        video_url: data.video_url ?? existing.video_url,
        dokumen_url: data.dokumen_url ?? existing.dokumen_url,
        passing_score: data.passing_score ?? existing.passing_score,
        is_published: data.is_published ?? existing.is_published
    };
    const result = await db.query(
        `UPDATE pelatihan SET judul_pelatihan=$1, deskripsi=$2, kategori=$3, tingkat_kesulitan=$4, durasi_menit=$5, instruktur=$6, thumbnail=$7, video_url=$8, dokumen_url=$9, passing_score=$10, is_published=$11, updated_at=NOW()
         WHERE id=$12 RETURNING id, judul_pelatihan, deskripsi, kategori, tingkat_kesulitan, durasi_menit, instruktur, thumbnail, video_url, dokumen_url, passing_score, is_published, created_at, updated_at`,
        [merged.judul_pelatihan, merged.deskripsi, merged.kategori, merged.tingkat_kesulitan, merged.durasi_menit, merged.instruktur, merged.thumbnail, merged.video_url, merged.dokumen_url, merged.passing_score, merged.is_published, id]
    );
    return result.rows[0];
};

export const deletePelatihan = async (id: string): Promise<boolean> => {
    const result = await db.query('DELETE FROM pelatihan WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
};
