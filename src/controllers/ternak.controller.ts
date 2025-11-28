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
        const created = await createTernak(req.body);
        res.status(201).json(created);
    } catch (err) { next(err); }
};

export const putTernak = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updated = await updateTernakById(req.params.id, req.body);
        res.status(200).json(updated);
    } catch (err) { next(err); }
};

export const deleteTernakById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await removeTernak(req.params.id);
        res.status(204).send();
    } catch (err) { next(err); }
};
