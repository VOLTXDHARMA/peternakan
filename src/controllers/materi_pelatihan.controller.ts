import * as service from '../services/materi_pelatihan.service';
import { Request, Response } from 'express';

export const getAllMateri = async (req: Request, res: Response) => {
    const items = await service.getAll();
    res.json({ data: items });
};

export const getMateriById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const item = await service.getById(id);
    if (!item) return res.status(404).json({ message: 'Materi not found' });
    res.json({ data: item });
};

export const getByPelatihan = async (req: Request, res: Response) => {
    const pelatihanId = req.params.pelatihanId;
    const items = await service.getByPelatihan(pelatihanId);
    res.json({ data: items });
};

export const createMateri = async (req: Request, res: Response) => {
    const payload = req.body;
    const created = await service.create(payload);
    res.status(201).json({ data: created });
};

export const updateMateri = async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    const updated = await service.update(id, payload);
    if (!updated) return res.status(404).json({ message: 'Materi not found' });
    res.json({ data: updated });
};

export const deleteMateri = async (req: Request, res: Response) => {
    const id = req.params.id;
    const ok = await service.remove(id);
    if (!ok) return res.status(404).json({ message: 'Materi not found' });
    res.status(204).send();
};
