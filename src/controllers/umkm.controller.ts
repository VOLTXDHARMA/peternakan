import { Request, Response, NextFunction } from 'express';
import {
  getAllUmkm,
  getUmkmDetail,
  createUmkm,
  updateUmkmService,
  deleteUmkmService
} from '../services/umkm.service.js';
import { successResponse } from '../utils/response.js';

export const getUmkms = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getAllUmkm();
    successResponse(res, 'UMKM list retrieved', data);
  } catch (err) {
    next(err);
  }
};

export const getUmkm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getUmkmDetail(Number(req.params.id));
    successResponse(res, 'UMKM detail retrieved', data);
  } catch (err) {
    next(err);
  }
};

export const postUmkm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract user_id from JWT token (set by authenticate middleware)
    const userId = (req as any).user.id;
    const data = await createUmkm({ ...req.body, user_id: userId });
    successResponse(res, 'UMKM created', data, 201);
  } catch (err) {
    next(err);
  }
};

export const putUmkm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await updateUmkmService(Number(req.params.id), req.body);
    successResponse(res, 'UMKM updated', data);
  } catch (err) {
    next(err);
  }
};

export const deleteUmkm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteUmkmService(Number(req.params.id));
    successResponse(res, 'UMKM deleted');
  } catch (err) {
    next(err);
  }
};
