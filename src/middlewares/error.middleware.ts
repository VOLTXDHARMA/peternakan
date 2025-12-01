import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message);
  console.error('Error Stack:', err.stack); // tambah detail error
  res.status(500).json({ 
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined 
  });
};