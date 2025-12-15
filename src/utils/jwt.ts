
// Import library jsonwebtoken untuk membuat dan memverifikasi JWT
import jwt, { SignOptions } from 'jsonwebtoken';

// Secret key untuk JWT
const SECRET = 'your_jwt_secret';

// Fungsi untuk membuat/generate JWT token
export const generateToken = (payload: object, options?: SignOptions) => {
    return jwt.sign(payload, SECRET, options);
};


// Fungsi untuk memverifikasi JWT token
export const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET);
};