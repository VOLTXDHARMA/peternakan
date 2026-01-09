-- Add umkm_id column to ternak table
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'ternak' AND column_name = 'umkm_id'
    ) THEN
        ALTER TABLE ternak 
        ADD COLUMN umkm_id INTEGER REFERENCES umkm(id) ON DELETE SET NULL;
    END IF;
END$$;
