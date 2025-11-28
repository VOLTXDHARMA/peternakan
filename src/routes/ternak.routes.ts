import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { listTernak, getTernak, postTernak, putTernak, deleteTernakById } from '../controllers/ternak.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Ternak
 *     description: Manajemen data ternak
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Ternak:
 *       type: object
 *       properties:
 *         id: { type: string }
 *         user_id: { type: string }
 *         kode_ternak: { type: string }
 *         jenis_ternak: { type: string }
 *         ras: { type: string, nullable: true }
 *         jenis_kelamin: { type: string }
 *         umur_bulan: { type: integer, nullable: true }
 *         berat_awal: { type: number, format: float, nullable: true }
 *         berat_sekarang: { type: number, format: float, nullable: true }
 *         kondisi: { type: string }
 *         harga_beli: { type: number, format: float, nullable: true }
 *         foto_ternak: { type: string, nullable: true }
 *         status: { type: string }
 *         created_at: { type: string, format: date-time }
 *         updated_at: { type: string, format: date-time }
 *     CreateTernakRequest:
 *       type: object
 *       required: [user_id, kode_ternak, jenis_ternak, jenis_kelamin, kondisi, status]
 *       properties:
 *         user_id: { type: string }
 *         kode_ternak: { type: string }
 *         jenis_ternak: { type: string, enum: [sapi, kambing, ayam, bebek, domba] }
 *         ras: { type: string }
 *         jenis_kelamin: { type: string, enum: [jantan, betina] }
 *         tanggal_lahir: { type: string, format: date }
 *         umur_bulan: { type: integer }
 *         berat_awal: { type: number }
 *         berat_sekarang: { type: number }
 *         kondisi: { type: string, enum: [sehat, sakit, karantina, mati] }
 *         harga_beli: { type: number }
 *         foto_ternak: { type: string }
 *         status: { type: string, enum: [aktif, dijual, mati] }
 *     UpdateTernakRequest:
 *       type: object
 *       properties:
 *         ras: { type: string }
 *         jenis_kelamin: { type: string, enum: [jantan, betina] }
 *         tanggal_lahir: { type: string, format: date }
 *         umur_bulan: { type: integer }
 *         berat_awal: { type: number }
 *         berat_sekarang: { type: number }
 *         kondisi: { type: string, enum: [sehat, sakit, karantina, mati] }
 *         harga_beli: { type: number }
 *         foto_ternak: { type: string }
 *         status: { type: string, enum: [aktif, dijual, mati] }
 */

/**
 * @swagger
 * /ternak:
 *   get:
 *     summary: List semua ternak
 *     tags: [Ternak]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Daftar ternak
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ternak'
 */
router.get('/', authenticate, listTernak);

/**
 * @swagger
 * /ternak/{id}:
 *   get:
 *     summary: Detail ternak
 *     tags: [Ternak]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Data ternak
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Ternak' }
 */
router.get('/:id', authenticate, getTernak);

/**
 * @swagger
 * /ternak:
 *   post:
 *     summary: Tambah ternak baru
 *     tags: [Ternak]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CreateTernakRequest' }
 *     responses:
 *       201:
 *         description: Ternak dibuat
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Ternak' }
 */
router.post('/', authenticate, postTernak);

/**
 * @swagger
 * /ternak/{id}:
 *   put:
 *     summary: Update data ternak
 *     tags: [Ternak]
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
 *           schema: { $ref: '#/components/schemas/UpdateTernakRequest' }
 *     responses:
 *       200:
 *         description: Ternak updated
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Ternak' }
 */
router.put('/:id', authenticate, putTernak);

/**
 * @swagger
 * /ternak/{id}:
 *   delete:
 *     summary: Hapus ternak
 *     tags: [Ternak]
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
router.delete('/:id', authenticate, deleteTernakById);

export default router;
