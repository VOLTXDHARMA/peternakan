INSERT INTO users (username, email, password, nomor_hp, otp_code, otp_expired_at, is_verified, role)
VALUES
('admin01', 'admin@example.com', '$2b$10$BC20vneFElumkv.VXPOo..jfiSjUvqBGECKcXdq/CCWibMIUjFV3G', '081234567890', NULL, NULL, TRUE, 'peternak'),
('investor01', 'investor01@example.com', '$2b$10$kvyP5cvwfQ0/LYprrFJ1retWdvi3n5b61QRZANrsNPokCUY7Crr4a', '081290000111', NULL, NULL, TRUE, 'investor'),
('kios01', 'kios01@example.com', '$2b$10$NtKTVA4gOL.D/UXG9GSF/e3GZSGvL3xFx1MJxVO8h/YMAttRQlDji', '081355559999', NULL, NULL, FALSE, 'penyedia_kios'),
('anggita_1764562710753', 'anggita@an.com', '$2b$10$ICzSUo0.5M2LLnFuqHfJ4.7T.TeEAGnzWwS5xKfKKYnl7/VRvcWtu', '081234567891', NULL, NULL, TRUE, 'peternak')
ON CONFLICT (username) DO NOTHING;
