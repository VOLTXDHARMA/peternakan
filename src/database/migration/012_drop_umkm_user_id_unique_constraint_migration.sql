-- Drop unique constraint on user_id in umkm table to allow one user to have multiple UMKM
DO $$
BEGIN
    -- Check if the constraint exists before dropping it
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'umkm_user_id_key'
        AND table_name = 'umkm'
    ) THEN
        ALTER TABLE umkm DROP CONSTRAINT umkm_user_id_key;
    END IF;
END $$;
