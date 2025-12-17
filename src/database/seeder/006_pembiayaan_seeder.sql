INSERT INTO pembiayaan (
  id, nomor_pembiayaan, user_id, tujuan_pembiayaan, nominal_pengajuan, nominal_disetujui, jangka_waktu_bulan, bunga_persen, angsuran_per_bulan, tanggal_pengajuan, tanggal_verifikasi, tanggal_persetujuan, tanggal_pencairan, status_pengajuan, alasan_penolakan, dokumen_pendukung, mitra_nama, mitra_tipe, mitra_kontak, mitra_alamat, credit_score, created_at, updated_at
) VALUES
  (gen_random_uuid(), 'PB-20251217001', (SELECT id FROM users LIMIT 1), 'beli_pakan', 10000000, 9000000, 12, 5.5, 900000, NOW(), NOW(), NOW(), NOW(), 'draf', NULL, '["url1.pdf"]', NULL, NULL, NULL, NULL, 80, NOW(), NOW()),
  (gen_random_uuid(), 'PB-20251217002', (SELECT id FROM users LIMIT 1), 'modal_kerja', 20000000, 18000000, 24, 6.0, 850000, NOW(), NULL, NULL, NULL, 'kk', 'Kurang dokumen', '["url2.pdf"]', NULL, NULL, NULL, NULL, 70, NOW(), NOW());
