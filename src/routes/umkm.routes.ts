
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
 * components:
 *   schemas:
 *     Umkm:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         nama_lengkap:
 *           type: string
 *         jenis_usaha:
 *           type: string
 *           enum: [peternak, investor, penyedia_kios]
 *         lokasi_peternakan:
 *           type: string
 *         jenis_peternakan_utama:
 *           type: string
 *         foto_profile:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */


/**
 * @swagger
 * /umkm:
 *   get:
 *     summary: Get all UMKM
 *     tags:
 *       - UMKM
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of UMKM
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Umkm'
 *   post:
 *     summary: Create a new UMKM
 *     tags:
 *       - UMKM
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama_lengkap
 *               - jenis_usaha
 *             properties:
 *               nama_lengkap:
 *                 type: string
 *               jenis_usaha:
 *                 type: string
 *                 enum: [peternak, investor, penyedia_kios]
 *               lokasi_peternakan:
 *                 type: string
 *               jenis_peternakan_utama:
 *                 type: string
 *               foto_profile:
 *                 type: string
 *     responses:
 *       201:
 *         description: UMKM created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Umkm'
 */
router.get('/', authenticate, getUmkms);
router.post('/', authenticate, postUmkm);

/**
 * @swagger
 * /umkm/{id}:
 *   get:
 *     summary: Get UMKM by ID
 *     tags:
 *       - UMKM
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
 *         description: UMKM detail
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Umkm'
 *   put:
 *     summary: Update UMKM by ID
 *     tags:
 *       - UMKM
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Umkm'
 *     responses:
 *       200:
 *         description: UMKM updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Umkm'
 *   delete:
 *     summary: Delete UMKM by ID
 *     tags:
 *       - UMKM
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: UMKM deleted
 */
router.get('/:id', authenticate, getUmkm);
router.put('/:id', authenticate, putUmkm);
router.delete('/:id', authenticate, deleteUmkm);

export default router;
