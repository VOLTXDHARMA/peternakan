CREATE TABLE IF NOT EXISTS progres_pelatihan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pelatihan_id UUID NOT NULL REFERENCES pelatihan(id) ON DELETE CASCADE,
    materi_terakhir_id UUID REFERENCES materi_pelatihan(id) ON DELETE SET NULL,
    persentase_selesai INT DEFAULT 0 CHECK (persentase_selesai BETWEEN 0 AND 100),
    status VARCHAR(20) NOT NULL DEFAULT 'belum_mulai' 
        CHECK (status IN ('belum_mulai', 'sedang_belajar', 'selesai', 'lulus', 'gagal')),
    waktu_mulai TIMESTAMP,
    waktu_selesai TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    -- Satu user hanya boleh punya satu progres per pelatihan
    UNIQUE(user_id, pelatihan_id)
);

-- Index biar cepat ambil progres user
CREATE INDEX IF NOT EXISTS idx_progres_user ON progres_pelatihan(user_id);
CREATE INDEX IF NOT EXISTS idx_progres_pelatihan ON progres_pelatihan(pelatihan_id);
CREATE INDEX IF NOT EXISTS idx_progres_status ON progres_pelatihan(status);

-- Auto update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_progres_pelatihan_updated_at
    BEFORE UPDATE ON progres_pelatihan
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();