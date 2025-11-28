INSERT INTO ternak (
    user_id, kode_ternak, jenis_ternak, ras, jenis_kelamin, tanggal_lahir, umur_bulan,
    berat_awal, berat_sekarang, kondisi, harga_beli, foto_ternak, status
) VALUES
(
    (SELECT id FROM users WHERE email = 'admin@example.com'),
    'SP-2024-001', 'sapi', 'Simental', 'jantan', '2023-06-15', 17,
    280.00, 485.50, 'sehat', 45000000.00, 'ternak/SP-2024-001.jpg', 'aktif'
),
(
    (SELECT id FROM users WHERE email = 'admin@example.com'),
    'KB-2024-045', 'kambing', 'Peranakan Etawa', 'betina', '2024-01-20', 10,
    25.00, 38.75, 'sehat', 3500000.00, 'ternak/KB-2024-045.jpg', 'aktif'
),
(
    (SELECT id FROM users WHERE email = 'kios1@example.com'),
    'DM-2025-112', 'domba', 'Garut', 'jantan', '2024-03-10', 8,
    32.00, 52.30, 'sehat', 5200000.00, 'ternak/DM-2025-112.jpg', 'dijual'
)
ON CONFLICT (kode_ternak) DO NOTHING;