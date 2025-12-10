DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns WHERE table_name='progres_pelatihan' AND column_name='progress_percent'
    ) THEN
        ALTER TABLE progres_pelatihan ADD COLUMN progress_percent INT DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100);
    END IF;
END$$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns WHERE table_name='progres_pelatihan' AND column_name='skor'
    ) THEN
        ALTER TABLE progres_pelatihan ADD COLUMN skor INT;
    END IF;
END$$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns WHERE table_name='progres_pelatihan' AND column_name='status'
    ) THEN
        ALTER TABLE progres_pelatihan ADD COLUMN status VARCHAR(20) DEFAULT 'not_started';
    END IF;
END$$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns WHERE table_name='progres_pelatihan' AND column_name='started_at'
    ) THEN
        ALTER TABLE progres_pelatihan ADD COLUMN started_at TIMESTAMP;
    END IF;
END$$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns WHERE table_name='progres_pelatihan' AND column_name='completed_at'
    ) THEN
        ALTER TABLE progres_pelatihan ADD COLUMN completed_at TIMESTAMP;
    END IF;
END$$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns WHERE table_name='progres_pelatihan' AND column_name='created_at'
    ) THEN
        ALTER TABLE progres_pelatihan ADD COLUMN created_at TIMESTAMP DEFAULT NOW();
    END IF;
END$$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns WHERE table_name='progres_pelatihan' AND column_name='updated_at'
    ) THEN
        ALTER TABLE progres_pelatihan ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();
    END IF;
END$$;

-- ensure trigger exists and is idempotent
DROP TRIGGER IF EXISTS update_progres_pelatihan_updated_at ON progres_pelatihan;
CREATE TRIGGER update_progres_pelatihan_updated_at
    BEFORE UPDATE ON progres_pelatihan
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
