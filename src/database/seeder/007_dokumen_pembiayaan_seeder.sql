INSERT INTO dokumen_pembiayaan (
    pembiayaan_id, jenis_dokumentasi, url_file, status_verifikasi, catatan_verifikasi
) VALUES
-- Dokumen untuk pembiayaan pertama (PB-20251217001)
(
    'PB-20251217001', 'ktp', 'uploads/dokumen/ktp_1.jpg', 'diterima', 'KTP valid dan sesuai'
),
(
    'PB-20251217001', 'kk', 'uploads/dokumen/kk_1.jpg', 'diterima', 'Kartu Keluarga lengkap'
),
(
    'PB-20251217001', 'surat_usaha', 'uploads/dokumen/surat_usaha_1.pdf', 'pending', NULL
),
(
    'PB-20251217001', 'npwp', 'uploads/dokumen/npwp_1.jpg', 'ditolak', 'NPWP tidak terbaca dengan jelas'
),

-- Dokumen untuk pembiayaan kedua (PB-20251217002)
(
    'PB-20251217002', 'ktp', 'uploads/dokumen/ktp_2.jpg', 'diterima', 'KTP valid'
),
(
    'PB-20251217002', 'rekening_koran', 'uploads/dokumen/rekening_2.pdf', 'pending', NULL
);
