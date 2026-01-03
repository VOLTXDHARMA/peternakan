-- Change foreign key in dokumen_pembiayaan from pembiayaan(id) to pembiayaan(nomor_pembiayaan)

-- Drop existing foreign key constraint
ALTER TABLE dokumen_pembiayaan DROP CONSTRAINT IF EXISTS dokumen_pembiayaan_pembiayaan_id_fkey;

-- Change column type from UUID to VARCHAR to match nomor_pembiayaan
ALTER TABLE dokumen_pembiayaan ALTER COLUMN pembiayaan_id TYPE VARCHAR(50);

-- Add new foreign key constraint referencing nomor_pembiayaan
ALTER TABLE dokumen_pembiayaan
ADD CONSTRAINT dokumen_pembiayaan_nomor_pembiayaan_fkey
FOREIGN KEY (pembiayaan_id)
REFERENCES pembiayaan(nomor_pembiayaan)
ON DELETE CASCADE;
