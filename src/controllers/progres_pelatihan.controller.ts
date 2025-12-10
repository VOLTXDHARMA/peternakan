import * as service from '../services/progres_pelatihan.service';
import { Request, Response } from 'express';

export const getAllProgres = async (req: Request, res: Response) => {
    const items = await service.getAll();
    res.json({ data: items });
};

export const getProgresById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const item = await service.getById(id);
    if (!item) return res.status(404).json({ message: 'Progres tidak ditemukan' });
    res.json({ data: item });
};

export const getByUserAndPelatihan = async (req: Request, res: Response) => {
    const { userId, pelatihanId } = req.params;
    const items = await service.getByUserAndPelatihan(userId, pelatihanId);
    res.json({ data: items });
};

export const createProgres = async (req: Request, res: Response) => {
    const payload = req.body;
    // ambil user id dari token JWT jika tersedia
    const user = (req as any).user;
    if (user && user.id) payload.user_id = user.id;
    const created = await service.create(payload);
    res.status(201).json({ data: created });
};

export const updateProgres = async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    // jangan izinkan client mengubah user_id
    if (payload.user_id) delete payload.user_id;
    // cek kepemilikan
    const existing = await service.getById(id);
    if (!existing) return res.status(404).json({ message: 'Progres tidak ditemukan' });
    const user = (req as any).user;
    if (!user || user.id !== existing.user_id) return res.status(403).json({ message: 'Forbidden' });

    const updated = await service.update(id, payload);
    res.json({ data: updated });
};

export const deleteProgres = async (req: Request, res: Response) => {
    const id = req.params.id;
    const existing = await service.getById(id);
    if (!existing) return res.status(404).json({ message: 'Progres tidak ditemukan' });
    const user = (req as any).user;
    if (!user || user.id !== existing.user_id) return res.status(403).json({ message: 'Forbidden' });

    const ok = await service.remove(id);
    if (!ok) return res.status(500).json({ message: 'Failed to delete' });
    res.status(204).send();
};
