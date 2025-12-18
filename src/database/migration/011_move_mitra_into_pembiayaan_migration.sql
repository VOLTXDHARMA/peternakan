-- Add mitra fields into pembiayaan and remove mitra_keuangan table
DO $$
BEGIN
    -- Add columns if not exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns WHERE table_name='pembiayaan' AND column_name='mitra_nama'
    ) THEN
        ALTER TABLE pembiayaan ADD COLUMN mitra_nama VARCHAR(200);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns WHERE table_name='pembiayaan' AND column_name='mitra_tipe'
    ) THEN
        ALTER TABLE pembiayaan ADD COLUMN mitra_tipe VARCHAR(100);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns WHERE table_name='pembiayaan' AND column_name='mitra_kontak'
    ) THEN
        ALTER TABLE pembiayaan ADD COLUMN mitra_kontak VARCHAR(100);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns WHERE table_name='pembiayaan' AND column_name='mitra_alamat'
    ) THEN
        ALTER TABLE pembiayaan ADD COLUMN mitra_alamat TEXT;
    END IF;

    -- If mitra_keuangan table exists, drop it (we're embedding mitra info in pembiayaan)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'mitra_keuangan') THEN
        EXECUTE 'DROP TABLE IF EXISTS mitra_keuangan CASCADE';
    END IF;

    -- If pembiayaan still has mitra_keuangan_id column, drop it
    IF EXISTS (
        SELECT 1 FROM information_schema.columns WHERE table_name='pembiayaan' AND column_name='mitra_keuangan_id'
    ) THEN
        ALTER TABLE pembiayaan DROP COLUMN IF EXISTS mitra_keuangan_id;
    END IF;
END$$;
