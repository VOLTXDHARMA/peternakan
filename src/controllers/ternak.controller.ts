import { Request, Response, NextFunction } from 'express';
import {
    getAllTernak,
    getTernakDetail,
    createTernak,
    updateTernakById,
    removeTernak
} from '../services/ternak.service';
import { successResponse } from '../utils/response';

export const listTernak = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await getAllTernak();
        successResponse(res, 'Ternak retrieved successfully', data);
    } catch (err) { next(err); }
};

export const getTernak = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await getTernakDetail(req.params.id);
        successResponse(res, 'Ternak retrieved successfully', data);
    } catch (err) { next(err); }
};

export const postTernak = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user?.id;
        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        const payload = { ...req.body, user_id: userId };
        const created = await createTernak(payload);
        res.status(201).json(created);
    } catch (err) { next(err); }
};

export const putTernak = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user?.id;
        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        const existing = await getTernakDetail(req.params.id);
        if (!existing) return res.status(404).json({ status: 'error', message: 'Ternak not found' });
        if (existing.user_id !== userId) return res.status(403).json({ status: 'error', message: 'Forbidden' });
        const updated = await updateTernakById(req.params.id, req.body);
        res.status(200).json(updated);
    } catch (err) { next(err); }
};

export const deleteTernakById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user?.id;
        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        const existing = await getTernakDetail(req.params.id);
        if (!existing) return res.status(404).json({ status: 'error', message: 'Ternak not found' });
        if (existing.user_id !== userId) return res.status(403).json({ status: 'error', message: 'Forbidden' });
        await removeTernak(req.params.id);
        res.status(204).send();
    } catch (err) { next(err); }
};
