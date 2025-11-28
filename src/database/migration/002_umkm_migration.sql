DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'jenis_usaha_enum'
    ) THEN
        CREATE TYPE jenis_usaha_enum AS ENUM (
            'peternak',
            'investor',
            'penyedia_kios'
        );
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS umkm (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    nama_lengkap VARCHAR(100) NOT NULL,
    jenis_usaha jenis_usaha_enum NOT NULL,
    lokasi_peternakan TEXT,
    jenis_peternakan_utama VARCHAR(100),
    foto_profile VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_umkm_user FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
