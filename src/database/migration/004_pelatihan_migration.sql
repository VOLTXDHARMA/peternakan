CREATE TABLE IF NOT EXISTS pelatihan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    judul_pelatihan VARCHAR(200) NOT NULL,
    deskripsi TEXT NOT NULL,
    kategori VARCHAR(50) NOT NULL CHECK (kategori IN (
        'manajemen_kandang', 'kesehatan', 'kewirausahaan', 'pakan', 'reproduksi'
    )),
    tingkat_kesulitan VARCHAR(20) NOT NULL CHECK (tingkat_kesulitan IN (
        'pemula', 'menengah', 'lanjutan'
    )),
    durasi_menit INT NOT NULL CHECK (durasi_menit > 0),
    instruktur VARCHAR(100),
    thumbnail VARCHAR(255),
    video_url VARCHAR(255),
    dokumen_url VARCHAR(255),
    passing_score INT DEFAULT 70 CHECK (passing_score BETWEEN 0 AND 100),
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Index biar cepat cari
CREATE INDEX IF NOT EXISTS idx_pelatihan_kategori ON pelatihan(kategori);
CREATE INDEX IF NOT EXISTS idx_pelatihan_published ON pelatihan(is_published);
CREATE INDEX IF NOT EXISTS idx_pelatihan_tingkat ON pelatihan(tingkat_kesulitan);

-- Auto update updated_at
DROP TRIGGER IF EXISTS update_pelatihan_updated_at ON pelatihan;
CREATE TRIGGER update_pelatihan_updated_at
    BEFORE UPDATE ON pelatihan
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();