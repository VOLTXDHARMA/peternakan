DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name='progres_pelatihan' AND column_name='materi_id'
    ) THEN
        ALTER TABLE progres_pelatihan ADD COLUMN materi_id UUID;
    END IF;
END$$;

-- add FK constraint if not exists
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

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes WHERE tablename='progres_pelatihan' AND indexname='idx_progres_pelatihan_pelatihan'
    ) THEN
        CREATE INDEX IF NOT EXISTS idx_progres_pelatihan_pelatihan ON progres_pelatihan(pelatihan_id);
    END IF;
END$$;

-- ensure trigger exists and is idempotent
DROP TRIGGER IF EXISTS update_progres_pelatihan_updated_at ON progres_pelatihan;
CREATE TRIGGER update_progres_pelatihan_updated_at
    BEFORE UPDATE ON progres_pelatihan
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
