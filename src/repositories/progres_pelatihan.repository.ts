import { db } from '../config/database.js';

const baseSelect = `SELECT id, user_id, pelatihan_id, materi_id, progress_percent, skor, status, started_at, completed_at, created_at, updated_at FROM progres_pelatihan`;

export const findAll = async () => {
    const result = await db.query(baseSelect + ' ORDER BY created_at DESC');
    return result.rows;
};

export const findById = async (id: string) => {
    const result = await db.query(baseSelect + ' WHERE id = $1', [id]);
    return result.rows[0] || null;
};

export const findByUserAndPelatihan = async (userId: string, pelatihanId: string) => {
    const result = await db.query(baseSelect + ' WHERE user_id = $1 AND pelatihan_id = $2 ORDER BY created_at DESC', [userId, pelatihanId]);
    return result.rows;
};

export const insert = async (data: any) => {
    const result = await db.query(
        `INSERT INTO progres_pelatihan (user_id, pelatihan_id, materi_id, progress_percent, skor, status, started_at, completed_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
         RETURNING id, user_id, pelatihan_id, materi_id, progress_percent, skor, status, started_at, completed_at, created_at, updated_at`,
        [
            data.user_id,
            data.pelatihan_id,
            data.materi_id || null,
            data.progress_percent ?? 0,
            data.skor || null,
            data.status ?? 'not_started',
            data.started_at || null,
            data.completed_at || null
        ]
    );
    return result.rows[0];
};

export const update = async (id: string, data: any) => {
    const existing = await findById(id);
    if (!existing) return null;
    const merged = {
        materi_id: data.materi_id ?? existing.materi_id,
        progress_percent: data.progress_percent ?? existing.progress_percent,
        skor: data.skor ?? existing.skor,
        status: data.status ?? existing.status,
        started_at: data.started_at ?? existing.started_at,
        completed_at: data.completed_at ?? existing.completed_at
    };
    const result = await db.query(
        `UPDATE progres_pelatihan SET materi_id=$1, progress_percent=$2, skor=$3, status=$4, started_at=$5, completed_at=$6, updated_at=NOW()
         WHERE id=$7 RETURNING id, user_id, pelatihan_id, materi_id, progress_percent, skor, status, started_at, completed_at, created_at, updated_at`,
        [merged.materi_id, merged.progress_percent, merged.skor, merged.status, merged.started_at, merged.completed_at, id]
    );
    return result.rows[0];
};

export const remove = async (id: string): Promise<boolean> => {
    const result = await db.query('DELETE FROM progres_pelatihan WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
};
