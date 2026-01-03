import { Router } from 'express';
import {
    getDokumenPembiayaan,
    getDokumenPembiayaanById,
    createDokumenPembiayaan,
    updateDokumenPembiayaan,
    deleteDokumenPembiayaan
} from '../controllers/dokumen_pembiayaan.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /dokumen_pembiayaan:
 *   get:
 *     summary: Get all dokumen pembiayaan
 *     tags:
 *       - Dokumen Pembiayaan
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: pembiayaan_id
 *         schema:
 *           type: string
 *         description: Filter by nomor pembiayaan
 *     responses:
 *       200:
 *         description: List of dokumen pembiayaan
 */
router.get('/', authenticate, getDokumenPembiayaan);

/**
 * @swagger
 * /dokumen_pembiayaan/{id}:
 *   get:
 *     summary: Get dokumen pembiayaan by ID
 *     tags:
 *       - Dokumen Pembiayaan
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dokumen pembiayaan details
 *       404:
 *         description: Dokumen pembiayaan not found
 */
router.get('/:id', authenticate, getDokumenPembiayaanById);

/**
 * @swagger
 * /dokumen_pembiayaan:
 *   post:
 *     summary: Create new dokumen pembiayaan
 *     tags:
 *       - Dokumen Pembiayaan
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pembiayaan_id
 *               - jenis_dokumentasi
 *               - url_file
 *             properties:
 *               pembiayaan_id:
 *                 type: string
 *               jenis_dokumentasi:
 *                 type: string
 *                 enum: [ktp, kk, surat_usaha, npwp, rekening_koran]
 *               url_file:
 *                 type: string
 *               status_verifikasi:
 *                 type: string
 *                 enum: [pending, diterima, ditolak]
 *               catatan_verifikasi:
 *                 type: string
 *     responses:
 *       201:
 *         description: Dokumen pembiayaan created
 */
router.post('/', authenticate, createDokumenPembiayaan);

/**
 * @swagger
 * /dokumen_pembiayaan/{id}:
 *   put:
 *     summary: Update dokumen pembiayaan
 *     tags:
 *       - Dokumen Pembiayaan
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jenis_dokumentasi:
 *                 type: string
 *                 enum: [ktp, kk, surat_usaha, npwp, rekening_koran]
 *               url_file:
 *                 type: string
 *               status_verifikasi:
 *                 type: string
 *                 enum: [pending, diterima, ditolak]
 *               catatan_verifikasi:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dokumen pembiayaan updated
 */
router.put('/:id', authenticate, updateDokumenPembiayaan);

/**
 * @swagger
 * /dokumen_pembiayaan/{id}:
 *   delete:
 *     summary: Delete dokumen pembiayaan
 *     tags:
 *       - Dokumen Pembiayaan
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dokumen pembiayaan deleted
 */
router.delete('/:id', authenticate, deleteDokumenPembiayaan);

export default router;
