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
 * /pelatihan:
 *   get:
 *     tags: [Pelatihan]
 *     summary: Get all pelatihan
 *     responses:
 *       200:
 *         description: List of pelatihan
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   judul_pelatihan:
 *                     type: string
 *                   deskripsi:
 *                     type: string
 *                   kategori:
 *                     type: string
 *                     enum: ["manajemen_kandang", "kesehatan", "kewirausahaan", "biosecurity"]
 *                   tingkat_kesulitan:
 *                     type: string
 *                     enum: ["pemula", "menengah", "lanjutan"]
 *                   durasi_menit:
 *                     type: integer
 *                   instruktur:
 *                     type: string
 *                   tumbnail:
 *                     type: string
 *                   video_url:
 *                     type: string
 *                   dokumen_url:
 *                     type: string
 *                   passing_score:
 *                     type: integer
 *                   is_published:
 *                     type: boolean
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *   post:
 *     tags: [Pelatihan]
 *     summary: Create new pelatihan
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
 *               tumbnail:
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
 *       401:
 *         description: Unauthorized
 */
router.get('/', getPelatihans);
router.post('/', authenticate, postPelatihan);

/**
 * @swagger
 * /pelatihan/{id}:
 *   get:
 *     tags: [Pelatihan]
 *     summary: Get pelatihan by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Pelatihan ID
 *     responses:
 *       200:
 *         description: Pelatihan details
 *       404:
 *         description: Pelatihan not found
 *   put:
 *     tags: [Pelatihan]
 *     summary: Update pelatihan by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
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
 *                 enum: [manajemen_kandang, kesehatan, kewirausahaan, biosecurity]
 *               tingkat_kesulitan:
 *                 type: string
 *                 enum: [pemula, menengah, lanjutan]
 *               durasi_menit:
 *                 type: integer
 *               instruktur:
 *                 type: string
 *               tumbnail:
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
 *       404:
 *         description: Pelatihan not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     tags: [Pelatihan]
 *     summary: Delete pelatihan by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Pelatihan ID
 *     responses:
 *       204:
 *         description: Pelatihan deleted successfully
 *       404:
 *         description: Pelatihan not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', getPelatihan);
router.put('/:id', authenticate, putPelatihan);
router.delete('/:id', authenticate, deletePelatihanById);

export default router;
