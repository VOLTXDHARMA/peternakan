import { db } from '../config/database.js';

export type Pembiayaan = {
  id?: string;
  nomor_pembiayaan: string;
  user_id: string;
  tujuan_pembiayaan: string;
  nominal_pengajuan: number;
  nominal_disetujui?: number;
  jangka_waktu_bulan: number;
  bunga_persen?: number;
  angsuran_per_bulan?: number;
  tanggal_pengajuan: string;
  tanggal_verifikasi?: string;
  tanggal_persetujuan?: string;
  tanggal_pencairan?: string;
  status_pengajuan: string;
  alasan_penolakan?: string;
  dokumen_pendukung?: any;
  mitra_nama?: string;
  mitra_tipe?: string;
  mitra_kontak?: string;
  mitra_alamat?: string;
  credit_score?: number;
};

export const findAll = async () => {
  const res = await db.query('SELECT * FROM pembiayaan ORDER BY created_at DESC');
  return res.rows;
};

export const findById = async (id: string) => {
  const res = await db.query('SELECT * FROM pembiayaan WHERE id = $1', [id]);
  return res.rows[0] || null;
};

export const insert = async (data: Pembiayaan) => {
  const res = await db.query(
    `INSERT INTO pembiayaan (nomor_pembiayaan, user_id, tujuan_pembiayaan, nominal_pengajuan, nominal_disetujui, jangka_waktu_bulan, bunga_persen, angsuran_per_bulan, tanggal_pengajuan, tanggal_verifikasi, tanggal_persetujuan, tanggal_pencairan, status_pengajuan, alasan_penolakan, dokumen_pendukung, mitra_nama, mitra_tipe, mitra_kontak, mitra_alamat, credit_score)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)
     RETURNING *`,
    [
      data.nomor_pembiayaan,
      data.user_id,
      data.tujuan_pembiayaan,
      data.nominal_pengajuan,
      data.nominal_disetujui || null,
      data.jangka_waktu_bulan,
      data.bunga_persen || null,
      data.angsuran_per_bulan || null,
      data.tanggal_pengajuan,
      data.tanggal_verifikasi || null,
      data.tanggal_persetujuan || null,
      data.tanggal_pencairan || null,
      data.status_pengajuan,
      data.alasan_penolakan || null,
      data.dokumen_pendukung || null,
      data.mitra_nama || null,
      data.mitra_tipe || null,
      data.mitra_kontak || null,
      data.mitra_alamat || null,
      data.credit_score || null
    ]
  );
  return res.rows[0];
};

export const update = async (id: string, data: Partial<Pembiayaan>) => {
  // Only update fields that are present in data
  const fields = Object.keys(data);
  const values = Object.values(data);
  if (fields.length === 0) return null;
  const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
  const res = await db.query(
    `UPDATE pembiayaan SET ${setClause}, updated_at = NOW() WHERE id = $${fields.length + 1} RETURNING *`,
    [...values, id]
  );
  return res.rows[0];
};

export const remove = async (id: string) => {
  const res = await db.query('DELETE FROM pembiayaan WHERE id = $1', [id]);
  return (res?.rowCount ?? 0) > 0;
};
