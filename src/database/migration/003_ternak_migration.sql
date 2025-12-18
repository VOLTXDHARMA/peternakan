-- ENUM jenis ternak
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'jenis_ternak_enum'
    ) THEN
        CREATE TYPE jenis_ternak_enum AS ENUM ('sapi','kambing','ayam','bebek','domba');
    END IF;
END $$;

-- ENUM jenis kelamin
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'jenis_kelamin_enum'
    ) THEN
        CREATE TYPE jenis_kelamin_enum AS ENUM ('jantan','betina');
    END IF;
END $$;

-- ENUM kondisi
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'kondisi_ternak_enum'
    ) THEN
        CREATE TYPE kondisi_ternak_enum AS ENUM ('sehat','sakit','karantina','mati');
    END IF;
END $$;

-- ENUM status
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'status_ternak_enum'
    ) THEN
        CREATE TYPE status_ternak_enum AS ENUM ('aktif','dijual','mati');
    END IF;
END $$;


-- Hapus tabel jika sudah ada
DROP TABLE IF EXISTS ternak CASCADE;

-- Buat tabel ternak
CREATE TABLE ternak (
    id              SERIAL PRIMARY KEY,
    user_id         UUID REFERENCES users(id) ON DELETE CASCADE,

    kode_ternak     VARCHAR(50) UNIQUE NOT NULL,
    jenis_ternak    jenis_ternak_enum NOT NULL,
    ras             VARCHAR(20),
    jenis_kelamin   jenis_kelamin_enum NOT NULL,

    tanggal_lahir   DATE,
    umur_bulan      INT,
    berat_awal      DECIMAL,
    berat_sekarang  DECIMAL,

    kondisi         kondisi_ternak_enum NOT NULL DEFAULT 'sehat',
    harga_beli      DECIMAL,
    foto_ternak     TEXT,
    status          status_ternak_enum NOT NULL DEFAULT 'aktif',

    created_at      TIMESTAMP DEFAULT NOW(),
    update_at       TIMESTAMP DEFAULT NOW()
);