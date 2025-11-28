CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nomor_hp VARCHAR(50) UNIQUE NOT NULL,
    otp_code VARCHAR(6),
    otp_expired_at TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
    role VARCHAR(20) NOT NULL CHECK (
        role IN ('pemrek', 'investor', 'penyedia_kios')
    ) DEFAULT 'investor',
    create_at TIMESTAMP DEFAULT NOW(),
    update_at TIMESTAMP DEFAULT NOW()
);

-- Index tambahan biar pencarian login cepat
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_nomor_hp ON users(nomor_hp);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);