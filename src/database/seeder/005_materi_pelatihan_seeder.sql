INSERT INTO materi_pelatihan (pelatihan_id, urutan, judul_materi, tipe_konten, konten_url, durasi_menit, deskripsi)
VALUES
-- Materials for pelatihan id 1
(1, 1, 'Pengantar Manajemen Kandang', 'video', 'https://youtu.be/materi1', 15, 'Pengantar tujuan dan capaian pelatihan.'),
(1, 2, 'Layout dan Sanitasi Kandang', 'dokumen', '/docs/layout_sanitasi.pdf', 0, 'Panduan penataan kandang dan langkah sanitasi.'),
(1, 3, 'Praktik Harian', 'webinar', 'https://zoom.us/j/123456789', 60, 'Sesi tanya jawab praktik harian.'),

-- Materials for pelatihan id 2
(2, 1, 'Deteksi Dini Penyakit', 'video', 'https://youtu.be/materi2', 20, 'Cara mengenali gejala penyakit umum.'),
(2, 2, 'Panduan Vaksinasi', 'dokumen', '/docs/vaksinasi.pdf', 0, 'Protokol vaksinasi dan jadwal.'),

-- Materials for pelatihan id 3
(3, 1, 'Model Bisnis Peternakan', 'video', 'https://youtu.be/materi3', 40, 'Membangun model bisnis yang menguntungkan.'),
(3, 2, 'Studi Kasus & Kuis', 'kuis', NULL, 0, 'Kuis singkat untuk menguji pemahaman peserta.'),

-- Materials for pelatihan id 4
(4, 1, 'Prinsip Biosecurity', 'video', 'https://youtu.be/materi4', 30, 'Konsep dan langkah implementasi biosecurity.');
