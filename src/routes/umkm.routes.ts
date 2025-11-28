
import { Router, Request, Response } from 'express';
import { authenticate } from '../middlewares/auth.middleware';

function getUmkms(req: Request, res: Response) { res.json([]); }

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
 */
router.get('/', authenticate, getUmkms);

export default router;
