
// Import fungsi repository untuk mencari user berdasarkan email
import { findByEmail } from '../repositories/user.repository';
// Import fungsi utilitas untuk generate dan verifikasi JWT
import { generateToken, verifyToken } from '../utils/jwt';
import { JwtPayload } from 'jsonwebtoken';
// Import fungsi untuk membuat user baru
import { createUser } from './user.service';
// Import bcrypt untuk verifikasi password
import bcrypt from 'bcrypt';


// Fungsi untuk login user menggunakan repository
export const loginUser = async (email: string, password: string) => {
  // Ambil user berdasarkan email
  const user = await findByEmail(email);
  if (!user) throw new Error('Invalid email on database');

  // Debug: tampilkan user dan password
  console.log("User found:", user);
  console.log("Password provided:", password);
  console.log("Password stored:", user.password);

  // Karena password di seeder masih plain text
  if (user.password !== password) {
    throw new Error('Invalid email or password');
  }

  // Generate access token dengan masa berlaku 15 menit
  const accessToken = generateToken(
    { user_id: user.id, email: user.email, role: user.role },
    { expiresIn: '15m' }
  );

  // Generate refresh token dengan masa berlaku 7 hari
  const refreshToken = generateToken(
    { user_id: user.id, email: user.email, role: user.role },
    { expiresIn: '7d' }
  );

  // Kembalikan kedua token
  return { accessToken, refreshToken };
};

// Fungsi untuk me-refresh access token menggunakan refresh token
export const refreshAccessToken = async (refreshToken: string) => {
  try {
    // Verifikasi refresh token
    const decoded = verifyToken(refreshToken) as JwtPayload;

    // Generate access token baru
    return generateToken(
      { user_id: decoded.id, email: decoded.email, role: decoded.role },
      { expiresIn: '15m' }
    );

  } catch (err) {
    throw new Error('Invalid refresh token');
  }
};

// Fungsi untuk register user baru
export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
  nomor_hp?: string;
  role?: string;
}) => {
  // Panggil service untuk membuat user baru
  return await createUser(data);
};
