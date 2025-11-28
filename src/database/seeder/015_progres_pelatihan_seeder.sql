INSERT INTO progres_pelatihan (
    user_id, pelatihan_id, materi_terakhir_id, persentase_selesai, status, waktu_mulai, waktu_selesai
) VALUES
-- Admin sedang belajar Manajemen Kandang (75% selesai)
(
    (SELECT id FROM users WHERE email = 'admin@example.com'),
    (SELECT id FROM pelatihan WHERE judul_pelatihan LIKE '%Manajemen Kandang%'),
    (SELECT id FROM materi_pelatihan 
     WHERE pelatihan_id = (SELECT id FROM pelatihan WHERE judul_pelatihan LIKE '%Manajemen Kandang%') 
     ORDER BY urutan DESC LIMIT 1),
    75, 'sedang_belajar', '2025-03-20 08:00:00', NULL
),
-- Investor1 sudah selesai & lulus Kesehatan Ternak
(
    (SELECT id FROM users WHERE email = 'investor1@example.com'),
    (SELECT id FROM pelatihan WHERE judul_pelatihan LIKE '%Penyakit Ternak%'),
    (SELECT id FROM materi_pelatihan 
     WHERE pelatihan_id = (SELECT id FROM pelatihan WHERE judul_pelatihan LIKE '%Penyakit Ternak%') 
     ORDER BY urutan DESC LIMIT 1),
    100, 'lulus', '2025-03-15 10:30:00', '2025-03-18 14:20:00'
),
-- Kios1 baru daftar Pemasaran, belum mulai
(
    (SELECT id FROM users WHERE email = 'kios1@example.com'),
    (SELECT id FROM pelatihan WHERE judul_pelatihan LIKE '%Pemasaran%'),
    NULL, 0, 'belum_mulai', NULL, NULL
)
ON CONFLICT (user_id, pelatihan_id) DO NOTHING;