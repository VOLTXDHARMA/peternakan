// Import tipe yang diperlukan dari Express untuk menangani HTTP request, response, dan middleware
import { Request, Response, NextFunction } from 'express';

// Import fungsi layanan ternak
import {
    getAllTernak,
    getTernakDetail,
    createTernak,
    updateTernakById,
    removeTernak
} from '../services/ternak.service.js';

// Import utilitas untuk mengirim response sukses yang terstandarisasi
import { successResponse } from '../utils/response.js';

// Controller untuk mendapatkan daftar semua ternak
export const listTernak = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await getAllTernak();
        successResponse(res, 'Ternak retrieved successfully', data);
    } catch (err) { next(err); }
};

// Controller untuk mendapatkan detail ternak berdasarkan ID
export const getTernak = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await getTernakDetail(req.params.id);
        successResponse(res, 'Ternak retrieved successfully', data);
    } catch (err) { next(err); }
};

// Controller untuk membuat ternak baru
export const postTernak = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = { ...req.body, user_id: (req as any).user.id };
        const created = await createTernak(data);
        successResponse(res, 'Ternak created successfully', created, 201);
    } catch (err) { next(err); }
};

// Controller untuk memperbarui ternak berdasarkan ID
export const putTernak = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updated = await updateTernakById(req.params.id, req.body);
        successResponse(res, 'Ternak updated successfully', updated);
    } catch (err) { next(err); }
};

// Controller untuk menghapus ternak berdasarkan ID
export const deleteTernakById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await removeTernak(req.params.id);
        successResponse(res, 'Ternak deleted successfully', null, 204);
    } catch (err) { next(err); }
};
