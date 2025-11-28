-- Password default semua: admin123, test123, demo123
-- Hash bcrypt $2b$10$

INSERT INTO users (id, username, email, password, nomor_hp, role, is_verified, create_at, update_at) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'admin', 'admin@example.com', '$2b$10$tKiAdgxU8gFG2Owjoe0YZOiSdBCA3KaMl03c4KgDPK1dR3yk.', '+6281234567890', 'pemrek', true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440001', 'investor1', 'investor1@example.com', '$2b$10$YVeUj6i308F.z4Ek03Y3r.98nQYN0oBZXctZDwMpGM9rA1HvJU/G', '+6289876543210', 'investor', true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'kios1', 'kios1@example.com', '$2b$10$xV43cm1hZj4wPb5n92mjqMzDCXQksvT1nr5nrLN571BZRrws52fK', '+6285551234567', 'penyedia_kios', true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
