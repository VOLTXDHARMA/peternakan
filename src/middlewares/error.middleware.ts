
// Import tipe dari Express dan logger
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';


// Middleware untuk menangani error secara global
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log pesan error
  logger.error(err.message);
  // Kirim response error ke client
  res.status(500).json({ message: err.message });
};