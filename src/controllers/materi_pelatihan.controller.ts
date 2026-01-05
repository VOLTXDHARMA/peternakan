import * as service from '../services/materi_pelatihan.service.js';
import * as pelatihanService from '../services/pelatihan.service.js';
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

export const getIsiByPelatihan = async (req: Request, res: Response) => {
    const pelatihanId = req.params.pelatihanId;
    const items = await service.getByPelatihan(pelatihanId);
    // Map to simple isi format: urutan, judul, isi (prefer deskripsi, fallback konten_url)
    const mapped = items.map((it: any) => ({
        urutan: it.urutan,
        judul: it.judul_materi,
        isi: it.deskripsi || it.konten_url || ''
    }));
    res.json({ data: mapped });
};

export const createMateri = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const pelatihanId = Number(payload.pelatihan_id);

        if (!pelatihanId) {
            return res.status(400).json({ message: 'pelatihan_id wajib diisi' });
        }

        // ✅ VALIDASI FOREIGN KEY SEBELUM INSERT
        const pelatihan = await pelatihanService.getPelatihanDetail(pelatihanId);
        if (!pelatihan) {
            return res.status(400).json({
                message: 'Pelatihan tidak ditemukan'
            });
        }

        // Hitung urutan otomatis
        if (!payload.urutan) {
            const existingMateri = await service.getByPelatihan(pelatihanId.toString());
            payload.urutan =
                existingMateri.length > 0
                    ? Math.max(...existingMateri.map((m: any) => m.urutan)) + 1
                    : 1;
        }

        payload.pelatihan_id = pelatihanId;

        const created = await service.create(payload);
        res.status(201).json({ data: created });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: 'Gagal membuat materi pelatihan'
        });
    }
};

export const createMateriByPelatihan = async (req: Request, res: Response) => {
    try {
        const pelatihanId = Number(req.params.pelatihanId);

        if (!pelatihanId) {
            return res.status(400).json({ message: 'pelatihanId tidak valid' });
        }

        const pelatihan = await pelatihanService.getPelatihanDetail(pelatihanId);
        if (!pelatihan) {
            return res.status(404).json({
                message: 'Pelatihan tidak ditemukan'
            });
        }

        const { judul_materi, tipe_konten, konten_url, durasi_menit, deskripsi } = req.body;

        const existingMateri = await service.getByPelatihan(pelatihanId.toString());
        const nextUrutan =
            existingMateri.length > 0
                ? Math.max(...existingMateri.map((m: any) => m.urutan)) + 1
                : 1;

        const payload = {
            pelatihan_id: pelatihanId,
            urutan: nextUrutan,
            judul_materi,
            tipe_konten,
            konten_url,
            durasi_menit,
            deskripsi
        };

        const created = await service.create(payload);
        res.status(201).json({ data: created });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Gagal membuat materi pelatihan'
        });
    }
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
