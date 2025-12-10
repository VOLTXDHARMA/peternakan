import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import * as controller from '../controllers/pelatihan.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Pelatihan
 *     description: Manajemen pelatihan dan kursus
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Pelatihan:
 *       type: object
 *       properties:
 *         id: { type: string }
 *         judul_pelatihan: { type: string }
 *         deskripsi: { type: string }
 *         kategori: { type: string }
 *         tingkat_kesulitan: { type: string }
 *         durasi_menit: { type: integer }
 *         instruktur: { type: string }
 *         thumbnail: { type: string }
 *         video_url: { type: string }
 *         dokumen_url: { type: string, nullable: true }
 *         passing_score: { type: integer }
 *         is_published: { type: boolean }
 *     CreatePelatihanRequest:
 *       type: object
 *       required: [judul_pelatihan, deskripsi, kategori, tingkat_kesulitan]
 *       properties:
 *         judul_pelatihan: { type: string }
 *         deskripsi: { type: string }
 *         kategori: { type: string }
 *         tingkat_kesulitan: { type: string }
 *         durasi_menit: { type: integer }
 *         instruktur: { type: string }
 *         thumbnail: { type: string }
 *         video_url: { type: string }
 *         dokumen_url: { type: string }
 *         passing_score: { type: integer }
 *         is_published: { type: boolean }
 *       example:
 *         judul_pelatihan: "Pelatihan Pencatatan Kesehatan Ternak"
 *         deskripsi: "Pelatihan singkat mengenai pencatatan kesehatan, imunisasi, dan pemantauan berat badan."
 *         kategori: "kesehatan"
 *         tingkat_kesulitan: "pemula"
 *         durasi_menit: 60
 *         instruktur: "drh. Contoh"
 *         thumbnail: "pelatihan/thumb-kesehatan.jpg"
 *         video_url: "https://youtube.com/watch?v=contoh"
 *         passing_score: 70
 *         is_published: false
 *     UpdatePelatihanRequest:
 *       type: object
 *       properties:
 *         judul_pelatihan: { type: string }
 *         deskripsi: { type: string }
 *         kategori: { type: string }
 *         tingkat_kesulitan: { type: string }
 *         durasi_menit: { type: integer }
 *         instruktur: { type: string }
 *         thumbnail: { type: string }
 *         video_url: { type: string }
 *         dokumen_url: { type: string }
 *         passing_score: { type: integer }
 *         is_published: { type: boolean }
 *       example:
 *         judul_pelatihan: "Pelatihan Pencatatan Kesehatan (Updated)"
 *         is_published: true
 */

/**
 * @swagger
 * /pelatihan:
 *   get:
 *     summary: List semua pelatihan
 *     tags: [Pelatihan]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Daftar pelatihan
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pelatihan'
 */
router.get('/', authenticate, controller.getAllPelatihan);

/**
 * @swagger
 * /pelatihan/{id}:
 *   get:
 *     summary: Detail pelatihan
 *     tags: [Pelatihan]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Data pelatihan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pelatihan'
 */
router.get('/:id', authenticate, controller.getPelatihanById);

/**
 * @swagger
 * /pelatihan:
 *   post:
 *     summary: Buat pelatihan baru
 *     tags: [Pelatihan]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CreatePelatihanRequest' }
 *     responses:
 *       201:
 *         description: Pelatihan dibuat
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Pelatihan' }
 */
router.post('/', authenticate, controller.createPelatihan);

/**
 * @swagger
 * /pelatihan/{id}:
 *   put:
 *     summary: Update pelatihan
 *     tags: [Pelatihan]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/UpdatePelatihanRequest' }
 *     responses:
 *       200:
 *         description: Pelatihan updated
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Pelatihan' }
 */
router.put('/:id', authenticate, controller.updatePelatihan);

/**
 * @swagger
 * /pelatihan/{id}:
 *   delete:
 *     summary: Hapus pelatihan
 *     tags: [Pelatihan]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: Dihapus
 */
router.delete('/:id', authenticate, controller.deletePelatihan);

export default router;
