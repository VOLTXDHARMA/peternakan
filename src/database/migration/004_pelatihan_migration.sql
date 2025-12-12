DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'kategori_enum') THEN
        CREATE TYPE kategori_enum AS ENUM ('manajemen_kandang','kesehatan','kewirausahaan','biosecurity');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tingkat_kesulitan_enum') THEN
        CREATE TYPE tingkat_kesulitan_enum AS ENUM ('pemula','menengah','lanjutan');
    END IF;
END$$;

-- Create table pelatihan (if not exists)
CREATE TABLE IF NOT EXISTS pelatihan (
    id SERIAL PRIMARY KEY,
    judul_pelatihan VARCHAR(200) NOT NULL,
    deskripsi TEXT NOT NULL,
    kategori kategori_enum NOT NULL,
    tingkat_kesulitan tingkat_kesulitan_enum NOT NULL,
    durasi_menit INT NOT NULL,
    instruktur VARCHAR(100),
    passing_score INT DEFAULT 70,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add missing columns if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pelatihan' AND column_name = 'thumbnail') THEN
        ALTER TABLE pelatihan ADD COLUMN thumbnail VARCHAR(255);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pelatihan' AND column_name = 'video_url') THEN
        ALTER TABLE pelatihan ADD COLUMN video_url VARCHAR(500);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pelatihan' AND column_name = 'dokumen_url') THEN
        ALTER TABLE pelatihan ADD COLUMN dokumen_url VARCHAR(500);
    END IF;
END $$;
