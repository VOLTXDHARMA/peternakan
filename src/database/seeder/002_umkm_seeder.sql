INSERT INTO umkm (
    user_id, nama_lengkap, jenis_usaha, lokasi_peternakan, jenis_peternakan_utama, foto_profile
) VALUES
(
    (SELECT id FROM users WHERE email = 'admin@example.com'),
    'Budi Santoso',
    'peternak',
    'Desa Sukamaju, Kec. Cianjur Selatan, Kab. Cianjur, Jawa Barat',
    'Sapi Potong & Domba',
    'profiles/budi-santoso.jpg'
),
(
    (SELECT id FROM users WHERE email = 'investor1@example.com'),
    'Siti Aminah',
    'investor',
    NULL,
    NULL,
    'profiles/siti-aminah.jpg'
),
(
    (SELECT id FROM users WHERE email = 'kios1@example.com'),
    'H. Ahmad Fauzi',
    'penyedia_kios',
    'Pasar Hewan Jonggol, Bogor',
    'Kambing & Domba',
    'profiles/ahmad-fauzi.jpg'
);
-- only insert into `umkm` (previous duplicate insert into `pengguna` removed)