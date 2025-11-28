CREATE TABLE IF NOT EXISTS materi_pelatihan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pelatihan_id UUID NOT NULL REFERENCES pelatihan(id) ON DELETE CASCADE,
    urutan INT NOT NULL CHECK (urutan >= 1),
    judul_materi VARCHAR(200) NOT NULL,
    tipe_konten VARCHAR(20) NOT NULL CHECK (tipe_konten IN ('video','dokumen','kuis','webinar')),
    konten_url VARCHAR(255),
    durasi_menit INT CHECK (durasi_menit IS NULL OR durasi_menit > 0),
    deskripsi TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Pastikan urutan unik dalam satu pelatihan
    UNIQUE(pelatihan_id, urutan)
);

-- Index biar cepat ambil materi per pelatihan
CREATE INDEX IF NOT EXISTS idx_materi_pelatihan_pelatihan_id ON materi_pelatihan(pelatihan_id);
CREATE INDEX IF NOT EXISTS idx_materi_pelatihan_urutan ON materi_pelatihan(pelatihan_id, urutan);

-- Auto update updated_at
DROP TRIGGER IF EXISTS update_materi_pelatihan_updated_at ON materi_pelatihan;
CREATE TRIGGER update_materi_pelatihan_updated_at
    BEFORE UPDATE ON materi_pelatihan
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();