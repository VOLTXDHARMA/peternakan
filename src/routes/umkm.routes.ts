import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import * as controller from '../controllers/umkm.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Umkm
 *     description: Manajemen data umkm
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Umkm:
 *       type: object
 *       properties:
 *         id: { type: string }
 *         user_id: { type: string }
 *         nama_lengkap: { type: string }
 *         jenis_usaha: { type: string }
 *         lokasi_peternakan: { type: string, nullable: true }
 *         jenis_peternakan_utama: { type: string, nullable: true }
 *         foto_profile: { type: string, nullable: true }
 *     CreateUmkmRequest:
 *       type: object
 *       required: [user_id, nama_lengkap, jenis_usaha]
 *       properties:
 *         user_id: { type: string }
 *         nama_lengkap: { type: string }
 *         jenis_usaha: { type: string }
 *         lokasi_peternakan: { type: string }
 *         jenis_peternakan_utama: { type: string }
 *         foto_profile: { type: string }
 *       example:
 *         user_id: "550e8400-e29b-41d4-a716-446655440099"
 *         nama_lengkap: "Andi Petani"
 *         jenis_usaha: "peternak"
 *         lokasi_peternakan: "Desa Maju, Kab. Contoh"
 *         jenis_peternakan_utama: "Sapi Potong"
 *         foto_profile: "profiles/andi.jpg"
 *     UpdateUmkmRequest:
 *       type: object
 *       properties:
 *         nama_lengkap: { type: string }
 *         jenis_usaha: { type: string }
 *         lokasi_peternakan: { type: string }
 *         jenis_peternakan_utama: { type: string }
 *         foto_profile: { type: string }
 *       example:
 *         nama_lengkap: "Andi Petani Updated"
 *         jenis_usaha: "peternak"
 *         lokasi_peternakan: "Desa Maju RT 02"
 */

/**
 * @swagger
 * /umkm:
 *   get:
 *     summary: List semua umkm
 *     tags: [Umkm]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Daftar umkm
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Umkm'
 */
router.get('/', authenticate, controller.getAllUmkm);

/**
 * @swagger
 * /umkm/{id}:
 *   get:
 *     summary: Detail umkm
 *     tags: [Umkm]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Data umkm
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Umkm'
 */
router.get('/:id', authenticate, controller.getUmkmById);

/**
 * @swagger
 * /umkm:
 *   post:
 *     summary: Tambah umkm baru
 *     tags: [Umkm]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CreateUmkmRequest' }
 *     responses:
 *       201:
 *         description: Umkm dibuat
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Umkm' }
 */
router.post('/', authenticate, controller.createUmkm);

/**
 * @swagger
 * /umkm/{id}:
 *   put:
 *     summary: Update data umkm
 *     tags: [Umkm]
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
 *           schema: { $ref: '#/components/schemas/UpdateUmkmRequest' }
 *     responses:
 *       200:
 *         description: Umkm updated
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Umkm' }
 */
router.put('/:id', authenticate, controller.updateUmkm);

/**
 * @swagger
 * /umkm/{id}:
 *   delete:
 *     summary: Hapus umkm
 *     tags: [Umkm]
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
router.delete('/:id', authenticate, controller.deleteUmkm);

export default router;
