CREATE TABLE IF NOT EXISTS progres_pelatihan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pelatihan_id UUID NOT NULL REFERENCES pelatihan(id) ON DELETE CASCADE,
    materi_id UUID REFERENCES materi_pelatihan(id) ON DELETE SET NULL,
    progress_percent INT DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
    skor INT CHECK (skor IS NULL OR (skor >= 0 AND skor <= 100)),
    status VARCHAR(20) DEFAULT 'not_started' CHECK (status IN ('not_started','in_progress','completed')),
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_progres_pelatihan_user ON progres_pelatihan(user_id);
CREATE INDEX IF NOT EXISTS idx_progres_pelatihan_pelatihan ON progres_pelatihan(pelatihan_id);

-- Auto update updated_at
DROP TRIGGER IF EXISTS update_progres_pelatihan_updated_at ON progres_pelatihan;
CREATE TRIGGER update_progres_pelatihan_updated_at
    BEFORE UPDATE ON progres_pelatihan
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
