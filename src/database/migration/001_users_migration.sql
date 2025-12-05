DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('peternak', 'investor', 'penyedia_kios', 'admin');
    END IF;
END$$;

-- 2️⃣ Buat tabel users (jika belum ada)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nomor_hp VARCHAR(20) NOT NULL,
    otp_code VARCHAR(10),
    otp_expired_at TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
    role user_role NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);