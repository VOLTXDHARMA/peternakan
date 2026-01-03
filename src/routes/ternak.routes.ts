import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { listTernak, getTernak, postTernak, putTernak, deleteTernakById } from '../controllers/ternak.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Ternak
 *     description: CRUD data ternak
 */

/**
 * @swagger
 * /ternak:
 *   get:
 *     summary: List semua ternak
 *     tags: [Ternak]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar ternak
 */
router.get('/', authenticate, listTernak);

/**
 * @swagger
 * /ternak/{id}:
 *   get:
 *     summary: Detail ternak
 *     tags: [Ternak]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Data ternak
 */
router.get('/:id', authenticate, getTernak);

/**
 * @swagger
 * /ternak:
 *   post:
 *     summary: Tambah ternak baru
 *     tags: [Ternak]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - kode_ternak
 *               - jenis_ternak
 *               - jenis_kelamin
 *               - kondisi
 *               - status
 *             properties:
 *               kode_ternak: { type: string, description: "Kode unik ternak" }
 *               jenis_ternak: { type: string, enum: ["sapi", "kambing", "ayam", "bebek", "domba"], description: "Jenis ternak" }
 *               ras: { type: string, description: "Ras ternak" }
 *               jenis_kelamin: { type: string, enum: ["jantan", "betina"], description: "Jenis kelamin" }
 *               tanggal_lahir: { type: string, format: date, description: "Tanggal lahir" }
 *               umur_bulan: { type: integer, description: "Umur dalam bulan" }
 *               berat_awal: { type: number, description: "Berat awal dalam kg" }
 *               berat_sekarang: { type: number, description: "Berat sekarang dalam kg" }
 *               kondisi: { type: string, enum: ["sehat", "sakit", "karantina", "mati"], description: "Kondisi kesehatan" }
 *               harga_beli: { type: number, description: "Harga beli" }
 *               foto_ternak: { type: string, description: "URL foto ternak" }
 *               status: { type: string, enum: ["aktif", "dijual", "mati"], description: "Status ternak" }
 *     responses:
 *       201:
 *         description: Ternak berhasil ditambahkan
 *       400:
 *         description: Data tidak valid
 */
router.post('/', authenticate, postTernak);

/**
 * @swagger
 * /ternak/{id}:
 *   put:
 *     summary: Update data ternak
 *     tags: [Ternak]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ras: { type: string }
 *               jenis_kelamin: { type: string, enum: ["jantan", "betina"] }
 *               tanggal_lahir: { type: string, format: date }
 *               umur_bulan: { type: integer }
 *               berat_awal: { type: number }
 *               berat_sekarang: { type: number }
 *               kondisi: { type: string, enum: ["sehat", "sakit", "karantina", "mati"] }
 *               harga_beli: { type: number }
 *               foto_ternak: { type: string }
 *               status: { type: string, enum: ["aktif", "dijual", "mati"] }
 *     responses:
 *       200:
 *         description: Ternak berhasil diupdate
 *       404:
 *         description: Ternak tidak ditemukan
 */
router.put('/:id', authenticate, putTernak);

/**
 * @swagger
 * /ternak/{id}:
 *   delete:
 *     summary: Hapus ternak
 *     tags: [Ternak]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: Ternak berhasil dihapus
 *       404:
 *         description: Ternak tidak ditemukan
 */
router.delete('/:id', authenticate, deleteTernakById);

export default router;
