import bcrypt from 'bcrypt';
import { findUserByEmail } from '../repositories/user.repository';
import { generateToken, verifyToken } from '../utils/jwt';
import { JwtPayload } from 'jsonwebtoken';

export const loginUser = async (email: string, password: string) => {
  // cek user berdasarkan email
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email on data base');
  }

  console.log("User found:", user);
  console.log("Password provided:", password);
  console.log("Hashed password:", user.password);
  
  // cek password hash
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid email or password');
  }

  // generate tokens
  const accessToken = generateToken(
    { id: user.id, email: user.email },
    { expiresIn: '15m' }
  );

  const refreshToken = generateToken(
    { id: user.id, email: user.email },
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};


export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const decoded = verifyToken(refreshToken) as JwtPayload;

    // generate access token baru
    return generateToken(
      { id: decoded.id, email: decoded.email },
      { expiresIn: '15m' }
    );

  } catch (err) {
    throw new Error('Invalid refresh token');
  }
};
