-- Create table with all required columns and constraints (idempotent via IF NOT EXISTS)
CREATE TABLE IF NOT EXISTS progres_pelatihan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pelatihan_id UUID NOT NULL REFERENCES pelatihan(id) ON DELETE CASCADE,
    materi_id UUID,
    progress_percent INT DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
    skor INT,
    status VARCHAR(20) DEFAULT 'not_started',
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Add foreign key for materi_id if missing
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
        WHERE tc.table_name = 'progres_pelatihan' AND tc.constraint_type = 'FOREIGN KEY' AND kcu.column_name = 'materi_id'
    ) THEN
        ALTER TABLE progres_pelatihan ADD CONSTRAINT fk_progres_materi FOREIGN KEY (materi_id) REFERENCES materi_pelatihan(id) ON DELETE SET NULL;
    END IF;
END$$;

-- Ensure indexes exist
CREATE INDEX IF NOT EXISTS idx_progres_pelatihan_user ON progres_pelatihan(user_id);
CREATE INDEX IF NOT EXISTS idx_progres_pelatihan_pelatihan ON progres_pelatihan(pelatihan_id);

-- Ensure status column has allowed values via CHECK (if not present, add constraint safely)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns WHERE table_name='progres_pelatihan' AND column_name='status'
    ) THEN
        ALTER TABLE progres_pelatihan ADD COLUMN status VARCHAR(20) DEFAULT 'not_started';
    END IF;
    -- add check constraint if not exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'chk_progres_status'
    ) THEN
        ALTER TABLE progres_pelatihan ADD CONSTRAINT chk_progres_status CHECK (status IN ('not_started','in_progress','completed'));
    END IF;
END$$;

-- Ensure progress_percent and skor columns exist with constraints
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns WHERE table_name='progres_pelatihan' AND column_name='progress_percent'
    ) THEN
        ALTER TABLE progres_pelatihan ADD COLUMN progress_percent INT DEFAULT 0;
    END IF;
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'chk_progres_progress_percent'
    ) THEN
        ALTER TABLE progres_pelatihan ADD CONSTRAINT chk_progres_progress_percent CHECK (progress_percent >= 0 AND progress_percent <= 100);
    END IF;
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns WHERE table_name='progres_pelatihan' AND column_name='skor'
    ) THEN
        ALTER TABLE progres_pelatihan ADD COLUMN skor INT;
    END IF;
END$$;

-- Auto update updated_at (idempotent)
DROP TRIGGER IF EXISTS update_progres_pelatihan_updated_at ON progres_pelatihan;
CREATE TRIGGER update_progres_pelatihan_updated_at
    BEFORE UPDATE ON progres_pelatihan
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
