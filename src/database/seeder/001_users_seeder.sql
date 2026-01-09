INSERT INTO users (username, email, password, nomor_hp, otp_code, otp_expired_at, is_verified, role)
VALUES
('admin01', 'admin@example.com', '$2b$10$tPIkEIFD8nbwwQZQq3b9y.GtRXX0S2XIztggla50KhLwvKuqYngs6', '081234567890', NULL, NULL, TRUE, 'peternak'),
('investor01', 'investor01@example.com', '$2b$10$tPIkEIFD8nbwwQZQq3b9y.GtRXX0S2XIztggla50KhLwvKuqYngs6', '081290000111', NULL, NULL, TRUE, 'investor'),
('kios01', 'kios01@example.com', '$2b$10$tPIkEIFD8nbwwQZQq3b9y.GtRXX0S2XIztggla50KhLwvKuqYngs6', '081355559999', NULL, NULL, TRUE, 'penyedia_kios'),
('anggita', 'anggita@an.com', '$2b$10$tPIkEIFD8nbwwQZQq3b9y.GtRXX0S2XIztggla50KhLwvKuqYngs6', '081234567891', NULL, NULL, TRUE, 'peternak')
ON CONFLICT (username) DO NOTHING;
