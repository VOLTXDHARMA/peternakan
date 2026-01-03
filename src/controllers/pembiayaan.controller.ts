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
    const { nomor_pembiayaan, tujuan_pembiayaan, nominal_pengajuan, jangka_waktu_bulan, tanggal_pengajuan, status_pengajuan } = req.body;
    const user_id = (req as any).user.id;

    // Validasi field yang wajib ada
    const requiredFields = ['nomor_pembiayaan', 'tujuan_pembiayaan', 'nominal_pengajuan', 'jangka_waktu_bulan', 'tanggal_pengajuan', 'status_pengajuan'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Field yang wajib diisi: ${missingFields.join(', ')}` });
    }

    // Validasi tipe data
    if (typeof nominal_pengajuan !== 'number' || nominal_pengajuan <= 0) {
      return res.status(400).json({ message: 'nominal_pengajuan harus berupa angka positif' });
    }
    if (typeof jangka_waktu_bulan !== 'number' || jangka_waktu_bulan <= 0) {
      return res.status(400).json({ message: 'jangka_waktu_bulan harus berupa angka positif' });
    }

    // Validasi enum values
    const validTujuan = ['beli_pakan', 'beli_alat', 'pengembangan_usaha', 'modal_kerja'];
    if (!validTujuan.includes(tujuan_pembiayaan)) {
      return res.status(400).json({ message: `tujuan_pembiayaan harus salah satu dari: ${validTujuan.join(', ')}` });
    }

    const validStatus = ['draf', 'kk', 'surat_usaha', 'npwp', 'rekening_koran'];
    if (!validStatus.includes(status_pengajuan)) {
      return res.status(400).json({ message: `status_pengajuan harus salah satu dari: ${validStatus.join(', ')}` });
    }

    const created = await service.create({ ...req.body, user_id });
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
