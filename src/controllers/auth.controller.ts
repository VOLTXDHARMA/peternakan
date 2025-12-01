import { Request, Response, NextFunction } from 'express';
import { loginUser, registerUser, refreshAccessToken } from '../services/auth.service';
import { successResponse } from '../utils/response';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password, nomor_hp, role } = req.body;
        const result = await registerUser(username, email, password, nomor_hp, role);
        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            data: result
        });
    } catch (err) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const tokens = await loginUser(email, password);
        successResponse(res, 'Login successful', tokens);
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