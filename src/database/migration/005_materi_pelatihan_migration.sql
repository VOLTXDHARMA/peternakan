DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tipe_konten_enum') THEN
        CREATE TYPE tipe_konten_enum AS ENUM ('video','dokumen','kuis','webinar');
    END IF;
END$$;

-- Create table materi_pelatihan (if not exists)
CREATE TABLE IF NOT EXISTS materi_pelatihan (
    id SERIAL PRIMARY KEY,
    pelatihan_id INT NOT NULL,
    urutan INT NOT NULL,
    judul_materi VARCHAR(200) NOT NULL,
    tipe_konten tipe_konten_enum NOT NULL,
    konten_url VARCHAR(255),
    durasi_menit INT,
    deskripsi TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pelatihan
      FOREIGN KEY(pelatihan_id)
        REFERENCES pelatihan(id)
        ON DELETE CASCADE
);
