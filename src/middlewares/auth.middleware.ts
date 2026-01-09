
// Import tipe dari Express dan fungsi verifikasi JWT
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';


// Middleware untuk autentikasi JWT
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    // Ambil header Authorization
    const authHeader = req.headers.authorization;
    // Jika tidak ada header atau format salah, tolak akses
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    try {
        // Ambil token dari header
        const token = authHeader.split(' ')[1];
        // Verifikasi token
        const decoded = verifyToken(token);
        // Simpan data user hasil decode ke request
        (req as any).user = decoded;
        // Lanjut ke handler berikutnya
        next();
    } catch {
        // Jika token tidak valid, tolak akses
        return res.status(401).json({ status: 'error', message: 'Invalid token' });
    }
};