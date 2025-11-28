INSERT INTO materi_pelatihan (
    pelatihan_id, urutan, judul_materi, tipe_konten, konten_url, durasi_menit, deskripsi
) VALUES
-- Materi untuk pelatihan pertama (Manajemen Kandang)
(
    (SELECT id FROM pelatihan WHERE judul_pelatihan LIKE '%Manajemen Kandang%'),
    1, 'Pengantar Manajemen Kandang Modern', 'video',
    'https://youtube.com/watch?v=intro-kandang', 12,
    'Memahami pentingnya kandang yang sehat dan nyaman bagi ternak.'
),
(
    (SELECT id FROM pelatihan WHERE judul_pelatihan LIKE '%Manajemen Kandang%'),
    2, 'Desain Kandang Anti Penyakit', 'video',
    'https://youtube.com/watch?v=desain-kandang', 18, NULL
),
(
    (SELECT id FROM pelatihan WHERE judul_pelatihan LIKE '%Manajemen Kandang%'),
    3, 'Panduan Ebook Lengkap', 'dokumen',
    'pelatihan/ebook-manajemen-kandang.pdf', NULL,
    'Download ebook 50 halaman + checklist kandang ideal'
),
(
    (SELECT id FROM pelatihan WHERE judul_pelatihan LIKE '%Manajemen Kandang%'),
    4, 'Kuis Penutup Modul', 'kuis',
    'https://quiz.example.com/kandang-modul1', NULL, 'Minimal 75% untuk lanjut'
),

-- Materi untuk pelatihan kedua (Kesehatan)
(
    (SELECT id FROM pelatihan WHERE judul_pelatihan LIKE '%Penyakit Ternak%'),
    1, 'Mengenali Gejala PMK dan SE', 'video',
    'https://youtube.com/watch?v=pmk-se', 25, NULL
),
(
    (SELECT id FROM pelatihan WHERE judul_pelatihan LIKE '%Penyakit Ternak%'),
    2, 'Prosedur Karantina yang Benar', 'video',
    'https://youtube.com/watch?v=karantina', 20, NULL
),

-- Materi untuk pelatihan ketiga (Pemasaran)
(
    (SELECT id FROM pelatihan WHERE judul_pelatihan LIKE '%Pemasaran%'),
    1, 'Foto Produk yang Menarik Pembeli', 'video',
    'https://youtube.com/watch?v=foto-ternak', 15, NULL
),
(
    (SELECT id FROM pelatihan WHERE judul_pelatihan LIKE '%Pemasaran%'),
    2, 'Live Webinar: Jual Ternak via Marketplace', 'webinar',
    'https://zoom.us/webinar-pemasaran-2025', 90,
    'Sabtu, 12 April 2025 pukul 19.00 WIB'
);