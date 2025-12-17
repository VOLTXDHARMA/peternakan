CREATE TYPE tujuan_pembiayaan_enum AS ENUM ('beli_pakan','beli_alat','pengembangan_usaha','modal_kerja');
CREATE TYPE status_pengajuan_enum AS ENUM ('draf','kk','surat_usaha','npwp','rekening_koran');

CREATE TABLE IF NOT EXISTS pembiayaan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nomor_pembiayaan VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id),
    tujuan_pembiayaan tujuan_pembiayaan_enum NOT NULL,
    nominal_pengajuan DECIMAL(15,2) NOT NULL,
    nominal_disetujui DECIMAL(15,2),
    jangka_waktu_bulan INT NOT NULL,
    bunga_persen DECIMAL(5,2),
    angsuran_per_bulan DECIMAL(15,2),
    tanggal_pengajuan TIMESTAMP NOT NULL,
    tanggal_verifikasi TIMESTAMP,
    tanggal_persetujuan TIMESTAMP,
    tanggal_pencairan TIMESTAMP,
    status_pengajuan status_pengajuan_enum NOT NULL,
    alasan_penolakan TEXT,
    dokumen_pendukung JSON,
    credit_score INT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
