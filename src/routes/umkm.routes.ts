
import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import {
    getUmkms,
    getUmkm,
    postUmkm,
    putUmkm,
    deleteUmkm
} from '../controllers/umkm.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: UMKM
 *     description: CRUD data UMKM
 */

/**
 * @swagger
 * /umkm:
 *   get:
 *     summary: List semua UMKM
 *     tags: [UMKM]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar UMKM
 */
router.get('/', authenticate, getUmkms);

/**
 * @swagger
 * /umkm/{id}:
 *   get:
 *     summary: Detail UMKM
 *     tags: [UMKM]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Data UMKM
 */
router.get('/:id', authenticate, getUmkm);

/**
 * @swagger
 * /umkm:
 *   post:
 *     summary: Tambah UMKM baru
 *     tags: [UMKM]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nama_lengkap, jenis_usaha]
 *             properties:
 *               nama_lengkap: { type: string, description: "Nama lengkap pemilik UMKM" }
 *               jenis_usaha: { type: string, enum: ["peternak", "investor", "penyedia_kios"], description: "Jenis usaha" }
 *               lokasi_peternakan: { type: string, description: "Lokasi peternakan" }
 *               jenis_peternakan_utama: { type: string, description: "Jenis peternakan utama" }
 *               foto_profile: { type: string, description: "URL foto profil" }
 *     responses:
 *       201:
 *         description: UMKM berhasil ditambahkan
 *       400:
 *         description: Data tidak valid
 */
router.post('/', authenticate, postUmkm);

/**
 * @swagger
 * /umkm/{id}:
 *   put:
 *     summary: Update data UMKM
 *     tags: [UMKM]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama_lengkap: { type: string }
 *               jenis_usaha: { type: string, enum: ["peternak", "investor", "penyedia_kios"] }
 *               lokasi_peternakan: { type: string }
 *               jenis_peternakan_utama: { type: string }
 *               foto_profile: { type: string }
 *     responses:
 *       200:
 *         description: UMKM berhasil diupdate
 *       404:
 *         description: UMKM tidak ditemukan
 */
router.put('/:id', authenticate, putUmkm);

/**
 * @swagger
 * /umkm/{id}:
 *   delete:
 *     summary: Hapus UMKM
 *     tags: [UMKM]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204:
 *         description: UMKM berhasil dihapus
 *       404:
 *         description: UMKM tidak ditemukan
 */
router.delete('/:id', authenticate, deleteUmkm);

export default router;
