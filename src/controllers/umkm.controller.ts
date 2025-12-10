import * as service from '../services/umkm.service';
import { Request, Response } from 'express';

export const getAllUmkm = async (req: Request, res: Response) => {
    const items = await service.getAll();
    res.json({ data: items });
};

export const getUmkmById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const item = await service.getById(id);
    if (!item) return res.status(404).json({ message: 'Umkm not found' });
    res.json({ data: item });
};

export const createUmkm = async (req: Request, res: Response) => {
    const payload = req.body;
    // jika user terautentikasi, gunakan user.id dari token JWT sebagai owner
    const user = (req as any).user;
    if (user && user.id) payload.user_id = user.id;
    const created = await service.create(payload);
    res.status(201).json({ data: created });
};

export const updateUmkm = async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    // jangan izinkan client mengubah user_id melalui payload — pakai yang sudah tersimpan
    if (payload.user_id) delete payload.user_id;
    const updated = await service.update(id, payload);
    if (!updated) return res.status(404).json({ message: 'Umkm not found' });
    res.json({ data: updated });
};

export const deleteUmkm = async (req: Request, res: Response) => {
    const id = req.params.id;
    const ok = await service.remove(id);
    if (!ok) return res.status(404).json({ message: 'Umkm not found' });
    res.status(204).send();
};
