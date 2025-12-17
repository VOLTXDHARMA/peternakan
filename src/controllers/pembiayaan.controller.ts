import { Request, Response, NextFunction } from 'express';
import * as service from '../services/pembiayaan.service';

export const getAllPembiayaan = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getAll();
    res.json({ data });
  } catch (err) { next(err); }
};

export const getPembiayaanById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json({ data });
  } catch (err) { next(err); }
};

export const createPembiayaan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const created = await service.create(req.body);
    res.status(201).json({ data: created });
  } catch (err) { next(err); }
};

export const updatePembiayaan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await service.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json({ data: updated });
  } catch (err) { next(err); }
};

export const deletePembiayaan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ok = await service.remove(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (err) { next(err); }
};
