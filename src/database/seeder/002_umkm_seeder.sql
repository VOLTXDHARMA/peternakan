TRUNCATE TABLE umkm;

INSERT INTO umkm 
(user_id, nama_lengkap, jenis_usaha, lokasi_peternakan, jenis_peternakan_utama, foto_profile)
VALUES
((SELECT id FROM users WHERE username = 'admin01'), 'Budi Santoso', 'peternak', 'Jl. Mawar No.12 Bandung', 'Ayam Petelur', 'budi.jpg'),
((SELECT id FROM users WHERE username = 'investor01'), 'Siti Aminah', 'investor', 'Jl. Melati No.45 Jakarta', 'Sapi', 'siti.png'),
((SELECT id FROM users WHERE username = 'kios01'), 'Rahmat Hidayat', 'penyedia_kios', 'Jl. Cendana No.9 Surabaya', 'Kambing', 'rahmat.jpg');
