import { Request, Response } from 'express';
import { db } from '../config/database.js';

// Get all dokumen pembiayaan
export const getDokumenPembiayaan = async (req: Request, res: Response) => {
    try {
        const { pembiayaan_id } = req.query;
        let query = 'SELECT * FROM dokumen_pembiayaan';
        let params: any[] = [];

        if (pembiayaan_id) {
            query += ' WHERE pembiayaan_id = $1';
            params = [pembiayaan_id];
        }

        query += ' ORDER BY created_at DESC';

        const result = await db.query(query, params);

        res.json({
            status: 'success',
            message: 'Dokumen pembiayaan retrieved successfully',
            data: result.rows
        });
    } catch (error) {
        console.error('Error getting dokumen pembiayaan:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

// Get dokumen pembiayaan by ID
export const getDokumenPembiayaanById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM dokumen_pembiayaan WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Dokumen pembiayaan not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Dokumen pembiayaan retrieved successfully',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error getting dokumen pembiayaan by ID:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

// Create new dokumen pembiayaan
export const createDokumenPembiayaan = async (req: Request, res: Response) => {
    try {
        const { penyediaan_id, pembiayaan_id, jenis_dokumentasi, url_file, status_verifikasi, catatan_verifikasi } = req.body;

        let nomorPembiayaan: string;
        let penyediaanId: string | null = null;

        if (penyediaan_id) {
            // penyediaan_id is nomor_pembiayaan
            nomorPembiayaan = penyediaan_id;
            penyediaanId = penyediaan_id;
        } else if (pembiayaan_id) {
            // pembiayaan_id is the UUID id, get nomor_pembiayaan
            const pembiayaanCheck = await db.query(
                'SELECT nomor_pembiayaan FROM pembiayaan WHERE id = $1',
                [pembiayaan_id]
            );

            if (pembiayaanCheck.rows.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Pembiayaan tidak ditemukan'
                });
            }

            nomorPembiayaan = pembiayaanCheck.rows[0].nomor_pembiayaan;
            penyediaanId = nomorPembiayaan;
        } else {
            return res.status(400).json({
                status: 'error',
                message: 'penyediaan_id or pembiayaan_id is required'
            });
        }

        // Verify pembiayaan exists
        const pembiayaanCheck = await db.query(
            'SELECT nomor_pembiayaan FROM pembiayaan WHERE nomor_pembiayaan = $1',
            [nomorPembiayaan]
        );

        if (pembiayaanCheck.rows.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Pembiayaan tidak ditemukan'
            });
        }

        const result = await db.query(
            'INSERT INTO dokumen_pembiayaan (pembiayaan_id, jenis_dokumentasi, url_file, status_verifikasi, catatan_verifikasi) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nomorPembiayaan, jenis_dokumentasi, url_file, status_verifikasi || 'pending', catatan_verifikasi]
        );

        // Transform pembiayaan_id to penyediaan_id for response
        const transformedData = {
            ...result.rows[0],
            penyediaan_id: penyediaanId
        };

        res.status(201).json({
            status: 'success',
            message: 'Dokumen pembiayaan created successfully',
            data: transformedData
        });
    } catch (error) {
        console.error('Error creating dokumen pembiayaan:', error);
        res.status(500).json({
            status: 'error',
            message: (error as Error).message || 'Internal server error'
        });
    }
};

// Update dokumen pembiayaan
export const updateDokumenPembiayaan = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { jenis_dokumentasi, url_file, status_verifikasi, catatan_verifikasi } = req.body;

        const result = await db.query(
            'UPDATE dokumen_pembiayaan SET jenis_dokumentasi = $1, url_file = $2, status_verifikasi = $3, catatan_verifikasi = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
            [jenis_dokumentasi, url_file, status_verifikasi, catatan_verifikasi, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Dokumen pembiayaan not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Dokumen pembiayaan updated successfully',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error updating dokumen pembiayaan:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

// Delete dokumen pembiayaan
export const deleteDokumenPembiayaan = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await db.query('DELETE FROM dokumen_pembiayaan WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Dokumen pembiayaan not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Dokumen pembiayaan deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting dokumen pembiayaan:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};
