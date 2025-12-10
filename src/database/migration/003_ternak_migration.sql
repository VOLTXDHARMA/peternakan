CREATE TABLE IF NOT EXISTS ternak (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    kode_ternak VARCHAR(50) UNIQUE NOT NULL,
    jenis_ternak VARCHAR(20) NOT NULL CHECK (jenis_ternak IN ('sapi','kambing','ayam','bebek','domba')),
    ras VARCHAR(50),
    jenis_kelamin VARCHAR(10) NOT NULL CHECK (jenis_kelamin IN ('jantan','betina')),
    tanggal_lahir DATE,
    umur_bulan INT,
    berat_awal DECIMAL(8,2),
    berat_sekarang DECIMAL(8,2),
    kondisi VARCHAR(20) NOT NULL CHECK (kondisi IN ('sehat','sakit','karantina','mati')),
    harga_beli DECIMAL(15,2),
    foto_ternak VARCHAR(255),
    status VARCHAR(10) NOT NULL CHECK (status IN ('aktif','dijual','mati')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Index biar pencarian cepat
CREATE INDEX IF NOT EXISTS idx_ternak_user_id ON ternak(user_id);
CREATE INDEX IF NOT EXISTS idx_ternak_kode ON ternak(kode_ternak);
CREATE INDEX IF NOT EXISTS idx_ternak_status ON ternak(status);

DROP TRIGGER IF EXISTS update_ternak_updated_at ON ternak;
CREATE TRIGGER update_ternak_updated_at
    BEFORE UPDATE ON ternak
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();