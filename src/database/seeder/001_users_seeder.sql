INSERT INTO users (username, email, password, nomor_hp, otp_code, otp_expired_at, is_verified, role)
VALUES
('admin01', 'admin@example.com', 'admin123', '081234567890', NULL, NULL, TRUE, 'peternak'),
('investor01', 'investor01@example.com', 'investor123', '081290000111', NULL, NULL, TRUE, 'investor'),
('kios01', 'kios01@example.com', 'kios123', '081355559999', NULL, NULL, FALSE, 'penyedia_kios');
