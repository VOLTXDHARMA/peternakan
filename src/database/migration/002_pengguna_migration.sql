-- Pakai cara paling aman & cepat: VARCHAR + CHECK (tidak butuh ENUM)
CREATE TABLE IF NOT EXISTS pengguna (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    nama_lengkap VARCHAR(100) NOT NULL,
    jenis_usaha VARCHAR(20) NOT NULL CHECK (
        jenis_usaha IN ('peternak', 'investor', 'penyedia_kios')
    ),
    lokasi_peternakan TEXT,
    jenis_peternakan_utama VARCHAR(100),
    foto_profile VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Index biar cepat
CREATE INDEX IF NOT EXISTS idx_pengguna_user_id ON pengguna(user_id);

-- Auto update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pengguna_updated_at
    BEFORE UPDATE ON pengguna
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();