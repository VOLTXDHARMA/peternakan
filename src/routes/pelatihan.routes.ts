import { Router } from 'express';
import {
  getPelatihans,
  getPelatihan,
  postPelatihan,
  putPelatihan,
  deletePelatihanById
} from '../controllers/pelatihan.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Pelatihan:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         judul_pelatihan:
 *           type: string
 *         deskripsi:
 *           type: string
 *         kategori:
 *           type: string
 *           enum: [manajemen_kandang, kesehatan, kewirausahaan, biosecurity]
 *         tingkat_kesulitan:
 *           type: string
 *           enum: [pemula, menengah, lanjutan]
 *         durasi_menit:
 *           type: integer
 *         instruktur:
 *           type: string
 *         thumbnail:
 *           type: string
 *         video_url:
 *           type: string
 *         dokumen_url:
 *           type: string
 *         passing_score:
 *           type: integer
 *         is_published:
 *           type: boolean
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /pelatihan:
 *   get:
 *     summary: Get all pelatihan
 *     tags: [Pelatihan]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pelatihan retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       judul_pelatihan:
 *                         type: string
 *                       deskripsi:
 *                         type: string
 *                       kategori:
 *                         type: string
 *                       tingkat_kesulitan:
 *                         type: string
 *                       durasi_menit:
 *                         type: integer
 *                       instruktur:
 *                         type: string
 *                       thumbnail:
 *                         type: string
 *                       video_url:
 *                         type: string
 *                       dokumen_url:
 *                         type: string
 *                       passing_score:
 *                         type: integer
 *                       is_published:
 *                         type: boolean
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 */
router.get('/', authenticate, getPelatihans);

/**
 * @swagger
 * /pelatihan:
 *   post:
 *     summary: Create a new pelatihan
 *     tags: [Pelatihan]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - judul_pelatihan
 *               - deskripsi
 *               - kategori
 *               - tingkat_kesulitan
 *               - durasi_menit
 *             properties:
 *               judul_pelatihan:
 *                 type: string
 *               deskripsi:
 *                 type: string
 *               kategori:
 *                 type: string
 *                 enum: [manajemen_kandang, kesehatan, kewirausahaan, biosecurity]
 *               tingkat_kesulitan:
 *                 type: string
 *                 enum: [pemula, menengah, lanjutan]
 *               durasi_menit:
 *                 type: integer
 *               instruktur:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *               video_url:
 *                 type: string
 *               dokumen_url:
 *                 type: string
 *               passing_score:
 *                 type: integer
 *               is_published:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Pelatihan created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     judul_pelatihan:
 *                       type: string
 *                     deskripsi:
 *                       type: string
 *                     kategori:
 *                       type: string
 *                     tingkat_kesulitan:
 *                       type: string
 *                     durasi_menit:
 *                       type: integer
 *                     instruktur:
 *                       type: string
 *                     thumbnail:
 *                       type: string
 *                     video_url:
 *                       type: string
 *                     dokumen_url:
 *                       type: string
 *                     passing_score:
 *                       type: integer
 *                     is_published:
 *                       type: boolean
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad request
 */
router.post('/', authenticate, postPelatihan);

/**
 * @swagger
 * /pelatihan/{id}:
 *   get:
 *     summary: Get a pelatihan by ID
 *     tags: [Pelatihan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Pelatihan ID
 *     responses:
 *       200:
 *         description: Pelatihan retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     judul_pelatihan:
 *                       type: string
 *                     deskripsi:
 *                       type: string
 *                     kategori:
 *                       type: string
 *                     tingkat_kesulitan:
 *                       type: string
 *                     durasi_menit:
 *                       type: integer
 *                     instruktur:
 *                       type: string
 *                     thumbnail:
 *                       type: string
 *                     video_url:
 *                       type: string
 *                     dokumen_url:
 *                       type: string
 *                     passing_score:
 *                       type: integer
 *                     is_published:
 *                       type: boolean
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Pelatihan not found
 */
router.get('/:id', authenticate, getPelatihan);

/**
 * @swagger
 * /pelatihan/{id}:
 *   put:
 *     summary: Update a pelatihan by ID
 *     tags: [Pelatihan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Pelatihan ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               judul_pelatihan:
 *                 type: string
 *               deskripsi:
 *                 type: string
 *               kategori:
 *                 type: string
 *               tingkat_kesulitan:
 *                 type: string
 *               durasi_menit:
 *                 type: integer
 *               instruktur:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *               video_url:
 *                 type: string
 *               dokumen_url:
 *                 type: string
 *               passing_score:
 *                 type: integer
 *               is_published:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Pelatihan updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     judul_pelatihan:
 *                       type: string
 *                     deskripsi:
 *                       type: string
 *                     kategori:
 *                       type: string
 *                     tingkat_kesulitan:
 *                       type: string
 *                     durasi_menit:
 *                       type: integer
 *                     instruktur:
 *                       type: string
 *                     thumbnail:
 *                       type: string
 *                     video_url:
 *                       type: string
 *                     dokumen_url:
 *                       type: string
 *                     passing_score:
 *                       type: integer
 *                     is_published:
 *                       type: boolean
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Pelatihan not found
 */
router.put('/:id', authenticate, putPelatihan);

/**
 * @swagger
 * /pelatihan/{id}:
 *   delete:
 *     summary: Delete a pelatihan by ID
 *     tags: [Pelatihan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Pelatihan ID
 *     responses:
 *       204:
 *         description: Pelatihan deleted successfully
 *       404:
 *         description: Pelatihan not found
 */
router.delete('/:id', authenticate, deletePelatihanById);

export default router;
