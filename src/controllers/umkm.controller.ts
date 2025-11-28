import { Request, Response, NextFunction } from 'express';
import {
  getAllUmkm,
  getUmkmDetail,
  createUmkm,
  updateUmkmService,
  deleteUmkmService
} from '../services/umkm.service';
import { successResponse } from '../utils/response';

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
    const data = await getUmkmDetail(req.params.id);
    successResponse(res, 'UMKM detail retrieved', data);
  } catch (err) {
    next(err);
  }
};

export const postUmkm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await createUmkm(req.body);
    successResponse(res, 'UMKM created', data, 201);
  } catch (err) {
    next(err);
  }
};

export const putUmkm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await updateUmkmService(req.params.id, req.body);
    successResponse(res, 'UMKM updated', data);
  } catch (err) {
    next(err);
  }
};

export const deleteUmkm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteUmkmService(req.params.id);
    successResponse(res, 'UMKM deleted');
  } catch (err) {
    next(err);
  }
};
