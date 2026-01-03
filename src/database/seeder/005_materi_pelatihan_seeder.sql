INSERT INTO materi_pelatihan (
    pelatihan_id, urutan, judul_materi, tipe_konten, konten_url, durasi_menit, deskripsi
) VALUES
-- Materi untuk pelatihan pertama (Manajemen Kandang Dasar)
(
    1,
    1, 'Pengantar Manajemen Kandang Modern', 'video',
    'https://youtube.com/watch?v=intro-kandang', 12,
    'Memahami pentingnya kandang yang sehat dan nyaman bagi ternak.'
),
(
    1,
    2, 'Desain Kandang Anti Penyakit', 'video',
    'https://youtube.com/watch?v=desain-kandang', 18, NULL
),
(
    1,
    3, 'Panduan Ebook Lengkap', 'dokumen',
    'pelatihan/ebook-manajemen-kandang.pdf', NULL,
    'Download ebook 50 halaman + checklist kandang ideal'
),
(
    1,
    4, 'Kuis Penutup Modul', 'kuis',
    'https://quiz.example.com/kandang-modul1', NULL, 'Minimal 75% untuk lanjut'
),

-- Materi untuk pelatihan kedua (Kesehatan Unggas Praktis)
(
    2,
    1, 'Mengenali Gejala PMK dan SE', 'video',
    'https://youtube.com/watch?v=pmk-se', 25, NULL
),
(
    2,
    2, 'Prosedur Karantina yang Benar', 'video',
    'https://youtube.com/watch?v=karantina', 20, NULL
),

-- Materi untuk pelatihan ketiga (Kewirausahaan Peternakan)
(
    3,
    1, 'Foto Produk yang Menarik Pembeli', 'video',
    'https://youtube.com/watch?v=foto-ternak', 15, NULL
),
(
    3,
    2, 'Live Webinar: Jual Ternak via Marketplace', 'webinar',
    'https://zoom.us/webinar-pemasaran-2025', 90,
    'Sabtu, 12 April 2025 pukul 19.00 WIB'
);
