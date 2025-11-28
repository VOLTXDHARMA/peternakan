INSERT INTO pelatihan (
    judul_pelatihan, deskripsi, kategori, tingkat_kesulitan, durasi_menit,
    instruktur, thumbnail, video_url, dokumen_url, passing_score, is_published
) VALUES
(
    'Dasar-dasar Manajemen Kandang Modern untuk Peternak Pemula',
    'Pelatihan lengkap tentang pembuatan kandang yang sehat, ventilasi, dan pengelolaan limbah ternak.',
    'manajemen_kandang', 'pemula', 45,
    'Dr. Agus Supriyadi', 'pelatihan/thumbnail-kandang.jpg',
    'https://youtube.com/watch?v=kandang123', 'pelatihan/ebook-kandang.pdf',
    75, true
),
(
    'Pencegahan dan Pengobatan Penyakit Ternak Umum',
    'Mengenali gejala awal, karantina, dan pengobatan penyakit seperti PMK, SE, dan cacingan.',
    'kesehatan', 'menengah', 90,
    'drh. Siti Nurhaliza', 'pelatihan/thumbnail-kesehatan.jpg',
    'https://youtube.com/watch?v=kesehatan456', NULL,
    80, true
),
(
    'Strategi Pemasaran Hewan Ternak di Era Digital',
    'Cara jualan ternak via marketplace, foto produk menarik, dan negosiasi harga.',
    'kewirausahaan', 'lanjutan', 60,
    'H. Ahmad Fauzi', 'pelatihan/thumbnail-marketing.jpg',
    'https://youtube.com/watch?v=marketing789', 'pelatihan/panduan-marketplace.pdf',
    70, true
);