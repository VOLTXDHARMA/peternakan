# TODO: Perbaikan Error Kolom "thumbnail" pada Tabel "pelatihan"

## Langkah-langkah yang perlu dilakukan:

- [x] Modifikasi database.ts untuk selalu menjalankan file migrasi (karena idempotent dengan IF NOT EXISTS)
- [x] Perbaiki typo "tumbnail" menjadi "thumbnail" di controller pelatihan
- [x] Perbaiki typo "tumbnail" menjadi "thumbnail" di service pelatihan
- [x] Update repository pelatihan untuk menangani kolom thumbnail, video_url, dokumen_url di fungsi insert dan update
- [x] Restart server untuk menjalankan migrasi ulang dan menambahkan kolom yang hilang
