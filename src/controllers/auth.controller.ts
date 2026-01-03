
// Import tipe yang diperlukan dari Express untuk menangani HTTP request, response, dan middleware
import { Request, Response, NextFunction } from 'express';

// Import fungsi layanan autentikasi
import { loginUser, refreshAccessToken, registerUser } from '../services/auth.service.js';

// Import utilitas untuk mengirim response sukses yang terstandarisasi
import { successResponse } from '../utils/response.js';


// Controller untuk proses login user
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Ambil email dan password dari body request
        const { email, password } = req.body;
        // Panggil service untuk login user dan mendapatkan token
        const tokens = await loginUser(email, password);
        // Kirim response sukses beserta token
        successResponse(res, 'Login successful', tokens);
    } catch (err) {
        next(err);
    }
};


// Controller untuk me-refresh access token menggunakan refresh token
export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Ambil refreshToken dari body request
        const { refreshToken } = req.body;
        // Panggil service untuk mendapatkan access token baru
        const accessToken = await refreshAccessToken(refreshToken);
        // Kirim response sukses beserta access token baru
        successResponse(res, 'Token refreshed successfully', { accessToken });
    } catch (err) {
        next(err);
    }
};

// Controller untuk register user baru
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Ambil data dari body request
        const { username, email, password, nomor_hp, role } = req.body;
        // Panggil service untuk register user baru
        const newUser = await registerUser({ username, email, password, nomor_hp, role });
        // Kirim response sukses beserta data user baru
        successResponse(res, 'User registered successfully', newUser, 201);
    } catch (err) {
        next(err);
    }
};