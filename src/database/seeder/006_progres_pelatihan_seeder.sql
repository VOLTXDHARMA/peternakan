INSERT INTO progres_pelatihan (user_id, pelatihan_id, materi_terakhir_id, persentase_selesai, status, waktu_mulai, waktu_selesai)
VALUES
-- user 1 is halfway through pelatihan 1
(1, 1, 2, 50, 'sedang_belajar', NOW() - INTERVAL '3 days', NULL),

-- user 2 finished pelatihan 1 and completed (but not yet graded)
(2, 1, 3, 100, 'selesai', NOW() - INTERVAL '10 days', NOW() - INTERVAL '2 days'),

-- user 3 hasn't started pelatihan 2
(3, 2, NULL, 0, 'belum_mulai', NULL, NULL),

-- user 1 completed and passed pelatihan 3
(1, 3, 2, 100, 'lulus', NOW() - INTERVAL '20 days', NOW() - INTERVAL '15 days');
