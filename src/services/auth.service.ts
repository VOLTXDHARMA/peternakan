import bcrypt from 'bcrypt';
import { findByEmail, insertUser } from '../repositories/user.repository';
import { generateToken, verifyToken } from '../utils/jwt';

// Service untuk login user
export const loginUser = async (email: string, password: string) => {
    // Cari user berdasarkan email
    const user = await findByEmail(email);
    if (!user) {
        throw new Error('Invalid credentials');
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    // Generate tokens
    const accessToken = generateToken(
        { id: user.id, email: user.email, role: user.role },
        { expiresIn: '15m' }
    );
    const refreshToken = generateToken(
        { id: user.id, email: user.email },
        { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
};

// Service untuk refresh access token
export const refreshAccessToken = async (refreshToken: string) => {
    try {
        // Verifikasi refresh token
        const decoded = verifyToken(refreshToken) as any;

        // Cari user berdasarkan ID dari token
        const user = await findByEmail(decoded.email);
        if (!user) {
            throw new Error('Invalid refresh token');
        }

        // Generate access token baru
        const accessToken = generateToken(
            { id: user.id, email: user.email, role: user.role },
            { expiresIn: '15m' }
        );

        return accessToken;
    } catch (error) {
        throw new Error('Invalid refresh token');
    }
};

// Service untuk register user baru
export const registerUser = async (data: {
    username: string;
    email: string;
    password: string;
    nomor_hp?: string;
    role?: string;
}) => {
    // Cek apakah email sudah terdaftar
    const existingUser = await findByEmail(data.email);
    if (existingUser) {
        throw new Error('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Normalize and validate role
    const validRoles = ['peternak', 'investor', 'penyedia_kios', 'admin'];
    const role = validRoles.includes((data.role || '').toString()) ? data.role : 'peternak';

    // Insert user baru
    const newUser = await insertUser({
        ...data,
        password: hashedPassword,
        role
    });

    return newUser;
};
