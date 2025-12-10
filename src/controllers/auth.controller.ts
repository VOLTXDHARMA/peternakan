import { Request, Response, NextFunction } from 'express';
import { loginUser, registerUser, refreshAccessToken } from '../services/auth.service';
import { successResponse } from '../utils/response';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password, nomor_hp, role } = req.body;
        const result = await registerUser(username, email, password, nomor_hp, role);
        // set refresh token as HttpOnly cookie
        const refreshToken = (result as any).refreshToken;
        if (refreshToken) {
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });
        }

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            data: { user: (result as any).user, accessToken: (result as any).accessToken }
        });
    } catch (err) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const tokens = await loginUser(email, password);
        // set refresh token in HttpOnly cookie
        if ((tokens as any).refreshToken) {
            res.cookie('refreshToken', (tokens as any).refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
        }

        successResponse(res, 'Login successful', { accessToken: (tokens as any).accessToken });
    } catch (err) {
        next(err);
    }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.body;
        const accessToken = await refreshAccessToken(refreshToken);
        successResponse(res, 'Token refreshed successfully', { accessToken });
    } catch (err) {
        next(err);
    }
};