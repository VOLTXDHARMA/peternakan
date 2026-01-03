-- Create enum for jenis dokumentasi
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'jenis_dokumentasi_enum') THEN
        CREATE TYPE jenis_dokumentasi_enum AS ENUM ('ktp','kk','surat_usaha','npwp','rekening_koran');
    END IF;
END$$;

-- Create enum for status verifikasi
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_verifikasi_enum') THEN
        CREATE TYPE status_verifikasi_enum AS ENUM ('pending','diterima','ditolak');
    END IF;
END$$;

-- Create dokumen_pembiayaan table
CREATE TABLE IF NOT EXISTS dokumen_pembiayaan (
    id SERIAL PRIMARY KEY,
    pembiayaan_id UUID NOT NULL REFERENCES pembiayaan(id) ON DELETE CASCADE,
    jenis_dokumentasi jenis_dokumentasi_enum NOT NULL,
    url_file VARCHAR(255) NOT NULL,
    status_verifikasi status_verifikasi_enum DEFAULT 'pending',
    catatan_verifikasi TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column_dokumen_pembiayaan()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_dokumen_pembiayaan_updated_at ON dokumen_pembiayaan;
CREATE TRIGGER update_dokumen_pembiayaan_updated_at
    BEFORE UPDATE ON dokumen_pembiayaan
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column_dokumen_pembiayaan();
