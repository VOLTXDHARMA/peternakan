import { Router } from 'express';
import {
  getPelatihans,
  getPelatihan,
  postPelatihan,
  putPelatihan,
  deletePelatihanById
} from '../controllers/pelatihan.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Pelatihan
 *     description: CRUD data pelatihan
 */

/**
 * @swagger
 * /pelatihan:
 *   get:
 *     summary: List semua pelatihan
 *     tags: [Pelatihan]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar pelatihan
 */
router.get('/', authenticate, getPelatihans);

/**
 * @swagger
 * /pelatihan/{id}:
 *   get:
 *     summary: Detail pelatihan
 *     tags: [Pelatihan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Data pelatihan
 */
router.get('/:id', authenticate, getPelatihan);

/**
 * @swagger
 * /pelatihan:
 *   post:
 *     summary: Tambah pelatihan baru
 *     tags: [Pelatihan]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [judul_pelatihan, deskripsi, kategori, tingkat_kesulitan, durasi_menit]
 *             properties:
 *               judul_pelatihan: { type: string, description: "Judul pelatihan" }
 *               deskripsi: { type: string, description: "Deskripsi pelatihan" }
 *               kategori: { type: string, enum: ["manajemen_kandang", "kesehatan", "kewirausahaan", "biosecurity"], description: "Kategori pelatihan" }
 *               tingkat_kesulitan: { type: string, enum: ["pemula", "menengah", "lanjutan"], description: "Tingkat kesulitan" }
 *               durasi_menit: { type: integer, description: "Durasi dalam menit" }
 *               instruktur: { type: string, description: "Nama instruktur" }
 *               thumbnail: { type: string, description: "URL thumbnail" }
 *               video_url: { type: string, description: "URL video" }
 *               dokumen_url: { type: string, description: "URL dokumen" }
 *               passing_score: { type: integer, description: "Passing score" }
 *               is_published: { type: boolean, description: "Status publikasi" }
 *     responses:
 *       201:
 *         description: Pelatihan berhasil ditambahkan
 *       400:
 *         description: Data tidak valid
 */
router.post('/', authenticate, postPelatihan);

/**
 * @swagger
 * /pelatihan/{id}:
 *   put:
 *     summary: Update data pelatihan
 *     tags: [Pelatihan]
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
 *               judul_pelatihan: { type: string }
 *               deskripsi: { type: string }
 *               kategori: { type: string, enum: ["manajemen_kandang", "kesehatan", "kewirausahaan", "biosecurity"] }
 *               tingkat_kesulitan: { type: string, enum: ["pemula", "menengah", "lanjutan"] }
 *               durasi_menit: { type: integer }
 *               instruktur: { type: string }
 *               thumbnail: { type: string }
 *               video_url: { type: string }
 *               dokumen_url: { type: string }
 *               passing_score: { type: integer }
 *               is_published: { type: boolean }
 *     responses:
 *       200:
 *         description: Pelatihan berhasil diupdate
 *       404:
 *         description: Pelatihan tidak ditemukan
 */
router.put('/:id', authenticate, putPelatihan);

/**
 * @swagger
 * /pelatihan/{id}:
 *   delete:
 *     summary: Hapus pelatihan
 *     tags: [Pelatihan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204:
 *         description: Pelatihan berhasil dihapus
 *       404:
 *         description: Pelatihan tidak ditemukan
 */
router.delete('/:id', authenticate, deletePelatihanById);

export default router;
