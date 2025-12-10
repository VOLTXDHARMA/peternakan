import bcrypt from 'bcrypt';
import { findUserByEmail, insertUser } from '../repositories/user.repository';
import { generateToken, verifyToken } from '../utils/jwt';
import { JwtPayload } from 'jsonwebtoken';

type UserLike = { id: string; email: string };

export const createAuthTokens = (user: UserLike) => {
  const accessToken = generateToken({ id: user.id, email: user.email }, { expiresIn: '15m' });
  const refreshToken = generateToken({ id: user.id, email: user.email }, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

export const loginUser = async (email: string, password: string) => {
  // cek user berdasarkan email
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email on data base');
  }

  // cek password hash
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid email or password');
  }

  // generate tokens
  return createAuthTokens({ id: user.id, email: user.email });
};

export const registerUser = async (
  username: string,
  email: string,
  password: string,
  nomor_hp: string,
  role?: string
) => {
  // cek apakah email sudah terdaftar
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('Email already registered');
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // simpan user baru
  const newUser = await insertUser({ username, email, password: hashedPassword, nomor_hp, role });

  // generate tokens
  const tokens = createAuthTokens({ id: newUser.id, email: newUser.email });
  return { user: newUser, ...tokens };
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const decoded = verifyToken(refreshToken) as JwtPayload;

    // generate access token baru
    return generateToken({ id: decoded.id, email: decoded.email }, { expiresIn: '15m' });

  } catch (err) {
    throw new Error('Invalid refresh token');
  }
};
