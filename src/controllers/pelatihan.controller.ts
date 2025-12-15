// Import tipe yang diperlukan dari Express untuk menangani HTTP request, response, dan middleware
import { Request, Response, NextFunction } from 'express';

// Import fungsi layanan terkait pelatihan untuk logika bisnis
import {
    getAllPelatihan,
    getPelatihanDetail,
    createPelatihan,
    updatePelatihanService,
    deletePelatihanService
} from '../services/pelatihan.service';

// Import utilitas untuk mengirim response sukses yang terstandarisasi
import { successResponse } from '../utils/response';

// Controller untuk mendapatkan daftar semua pelatihan
export const getPelatihans = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const pelatihans = await getAllPelatihan();
        successResponse(res, 'Pelatihan retrieved successfully', pelatihans);
    } catch (err) {
        next(err);
    }
};

// Controller untuk mendapatkan detail satu pelatihan berdasarkan ID
export const getPelatihan = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pelatihan = await getPelatihanDetail(parseInt(req.params.id));
        successResponse(res, 'Pelatihan retrieved successfully', pelatihan);
    } catch (err) {
        next(err);
    }
};

// Tipe data untuk body yang diharapkan saat membuat pelatihan baru
type CreatePelatihanBody = {
    judul_pelatihan: string;
    deskripsi: string;
    kategori: string;
    tingkat_kesulitan: string;
    durasi_menit: number;
    instruktur?: string;
    thumbnail?: string;
    video_url?: string;
    dokumen_url?: string;
    passing_score?: number;
    is_published?: boolean;
};

// Controller untuk membuat pelatihan baru
export const postPelatihan = async (
    req: Request<{}, {}, CreatePelatihanBody>,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    // Cek apakah request body ada
    if (!req.body) {
        return res.status(400).json({ message: 'Request body is required' });
    }

    // Validasi field yang diperlukan
    const { judul_pelatihan, deskripsi, kategori, tingkat_kesulitan, durasi_menit, is_published } = req.body;
    if (!judul_pelatihan || !deskripsi || !kategori || !tingkat_kesulitan || durasi_menit === undefined) {
        return res.status(400).json({ message: 'Missing required fields: judul_pelatihan, deskripsi, kategori, tingkat_kesulitan, durasi_menit' });
    }

    // Validasi tipe data
    if (typeof durasi_menit !== 'number' || durasi_menit <= 0) {
        return res.status(400).json({ message: 'durasi_menit must be a positive number' });
    }

    if (is_published !== undefined && typeof is_published !== 'boolean') {
        return res.status(400).json({ message: 'is_published must be a boolean' });
    }

    try {
        // Panggil service untuk membuat pelatihan baru
        const newPelatihan = await createPelatihan(req.body);

        // Jika pembuatan pelatihan gagal, kembalikan error
        if (newPelatihan === null) {
            return res.status(500).json({ message: 'Failed to create pelatihan' });
        }

        // Kembalikan pelatihan yang berhasil dibuat dengan response sukses
        successResponse(res, 'Pelatihan created successfully', newPelatihan, 201);
    } catch (err) {
        next(err);
    }
};

// Controller untuk mengupdate pelatihan berdasarkan ID
export const putPelatihan = async (
    req: Request<{ id: string }, {}, Partial<CreatePelatihanBody>>,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        // Panggil service untuk mengupdate pelatihan dengan ID dan body yang diberikan
        const updatedPelatihan = await updatePelatihanService(parseInt(req.params.id), req.body);
        if (!updatedPelatihan) {
            // Jika pelatihan tidak ditemukan atau update gagal, kembalikan 404
            return res.status(404).json({ message: 'Pelatihan not found or update failed' });
        }
        // Kembalikan data pelatihan yang sudah diupdate
        return res.status(200).json({ message: 'Pelatihan updated successfully', data: updatedPelatihan });
    } catch (error) {
        next(error);
    }
};

// Controller untuk menghapus pelatihan berdasarkan ID
export const deletePelatihanById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Panggil service untuk menghapus pelatihan
        await deletePelatihanService(parseInt(req.params.id));
        // Beri response 204 No Content jika berhasil
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};