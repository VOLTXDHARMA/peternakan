TRUNCATE TABLE ternak;

INSERT INTO ternak
(user_id, kode_ternak, jenis_ternak, ras, jenis_kelamin, tanggal_lahir, umur_bulan, berat_awal, berat_sekarang, kondisi, harga_beli, foto_ternak, status)
VALUES
((SELECT id FROM users ORDER BY id LIMIT 1 OFFSET 0), 'TRK-001', 'sapi', 'limosin', 'jantan', '2022-05-10', 24, 250.5, 300.8, 'sehat', 15000000, 'sapi1.jpg', 'aktif'),
((SELECT id FROM users ORDER BY id LIMIT 1 OFFSET 1), 'TRK-002', 'kambing', 'etawa', 'betina', '2023-01-20', 12, 25.0, 30.2, 'sehat', 2500000, 'kambing1.png', 'aktif'),
((SELECT id FROM users ORDER BY id LIMIT 1 OFFSET 2), 'TRK-003', 'ayam', 'kampung', 'jantan', '2024-02-01', 6, 1.2, 1.8, 'sehat', 50000, 'ayam1.jpg', 'aktif'),
((SELECT id FROM users ORDER BY id LIMIT 1 OFFSET 3), 'TRK-004', 'bebek', 'peking', 'betina', '2024-02-12', 5, 1.5, 1.9, 'sehat', 60000, 'bebek1.png', 'aktif'),
((SELECT id FROM users ORDER BY id LIMIT 1 OFFSET 0), 'TRK-005', 'domba', 'merino', 'jantan', '2022-08-15', 20, 50.0, 60.3, 'sehat', 3000000, 'domba1.jpg', 'aktif');