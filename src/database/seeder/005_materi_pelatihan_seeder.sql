DO $$
DECLARE
    pelatihan_ids INT[];
BEGIN
    -- Get the first 4 pelatihan ids
    SELECT array_agg(id ORDER BY id) INTO pelatihan_ids FROM pelatihan LIMIT 4;
    IF array_length(pelatihan_ids, 1) = 4 THEN
        INSERT INTO materi_pelatihan (pelatihan_id, urutan, judul_materi, tipe_konten, konten_url, durasi_menit, deskripsi)
        VALUES
        -- Materials for first pelatihan
        (pelatihan_ids[1], 1, 'Pengantar Manajemen Kandang', 'video', 'https://youtu.be/materi1', 15, 'Pengantar tujuan dan capaian pelatihan.'),
        (pelatihan_ids[1], 2, 'Layout dan Sanitasi Kandang', 'dokumen', '/docs/layout_sanitasi.pdf', 0, 'Panduan penataan kandang dan langkah sanitasi.'),
        (pelatihan_ids[1], 3, 'Praktik Harian', 'webinar', 'https://zoom.us/j/123456789', 60, 'Sesi tanya jawab praktik harian.'),

        -- Materials for second pelatihan
        (pelatihan_ids[2], 1, 'Deteksi Dini Penyakit', 'video', 'https://youtu.be/materi2', 20, 'Cara mengenali gejala penyakit umum.'),
        (pelatihan_ids[2], 2, 'Panduan Vaksinasi', 'dokumen', '/docs/vaksinasi.pdf', 0, 'Protokol vaksinasi dan jadwal.'),

        -- Materials for third pelatihan
        (pelatihan_ids[3], 1, 'Model Bisnis Peternakan', 'video', 'https://youtu.be/materi3', 40, 'Membangun model bisnis yang menguntungkan.'),
        (pelatihan_ids[3], 2, 'Studi Kasus & Kuis', 'kuis', NULL, 0, 'Kuis singkat untuk menguji pemahaman peserta.'),

        -- Materials for fourth pelatihan
        (pelatihan_ids[4], 1, 'Prinsip Biosecurity', 'video', 'https://youtu.be/materi4', 30, 'Konsep dan langkah implementasi biosecurity.');
    END IF;
END $$;
