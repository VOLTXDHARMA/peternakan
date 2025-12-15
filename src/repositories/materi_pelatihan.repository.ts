import { db } from '../config/database';

const baseSelect = `SELECT id, pelatihan_id, urutan, judul_materi, tipe_konten, konten_url, durasi_menit, deskripsi, created_at, updated_at FROM materi_pelatihan`;

export const findAllMateri = async () => {
    const result = await db.query(baseSelect + ' ORDER BY pelatihan_id, urutan ASC');
    return result.rows;
};

export const findMateriById = async (id: string) => {
    const result = await db.query(baseSelect + ' WHERE id = $1', [id]);
    return result.rows[0] || null;
};

export const findByPelatihanId = async (pelatihanId: string) => {
    const result = await db.query(baseSelect + ' WHERE pelatihan_id = $1 ORDER BY urutan ASC', [pelatihanId]);
    return result.rows;
};

export const insertMateri = async (data: any) => {
    const result = await db.query(
        `INSERT INTO materi_pelatihan (pelatihan_id, urutan, judul_materi, tipe_konten, konten_url, durasi_menit, deskripsi)
         VALUES ($1,$2,$3,$4,$5,$6,$7)
         RETURNING id, pelatihan_id, urutan, judul_materi, tipe_konten, konten_url, durasi_menit, deskripsi, created_at, updated_at`,
        [
            data.pelatihan_id,
            data.urutan,
            data.judul_materi,
            data.tipe_konten,
            data.konten_url || null,
            data.durasi_menit || null,
            data.deskripsi || null
        ]
    );
    return result.rows[0];
};

export const updateMateri = async (id: string, data: any) => {
    const existing = await findMateriById(id);
    if (!existing) return null;
    const merged = {
        urutan: data.urutan ?? existing.urutan,
        judul_materi: data.judul_materi ?? existing.judul_materi,
        tipe_konten: data.tipe_konten ?? existing.tipe_konten,
        konten_url: data.konten_url ?? existing.konten_url,
        durasi_menit: data.durasi_menit ?? existing.durasi_menit,
        deskripsi: data.deskripsi ?? existing.deskripsi
    };
    const result = await db.query(
        `UPDATE materi_pelatihan SET urutan=$1, judul_materi=$2, tipe_konten=$3, konten_url=$4, durasi_menit=$5, deskripsi=$6, updated_at=NOW()
         WHERE id=$7 RETURNING id, pelatihan_id, urutan, judul_materi, tipe_konten, konten_url, durasi_menit, deskripsi, created_at, updated_at`,
        [merged.urutan, merged.judul_materi, merged.tipe_konten, merged.konten_url, merged.durasi_menit, merged.deskripsi, id]
    );
    return result.rows[0];
};

export const deleteMateri = async (id: string): Promise<boolean> => {
    const result = await db.query('DELETE FROM materi_pelatihan WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
};
