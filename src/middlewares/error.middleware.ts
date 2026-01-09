
// Import tipe dari Express dan logger
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';


// Middleware untuk menangani error secara global
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log pesan error
  logger.error(err.message);

  // Tangani error spesifik
  if (err.message === 'Invalid credentials') {
    return res.status(401).json({ status: 'error', message: err.message });
  }
  if (err.message === 'Invalid refresh token') {
    return res.status(401).json({ status: 'error', message: err.message });
  }
  if (err.message === 'Email already registered') {
    return res.status(400).json({ status: 'error', message: err.message });
  }

  // Default error response
  res.status(500).json({ status: 'error', message: err.message || 'Internal server error' });
};
