import { Router } from 'express';
import * as controller from '../controllers/pembiayaan.controller.js';
import { authenticate } from '../middlewares/auth.middleware';


/**
 * @swagger
 * tags:
 *   - name: Pembiayaan
 *     description: CRUD data pembiayaan
 */
const router = Router();

/**
 * @swagger
 * /pembiayaan:
 *   get:
 *     summary: List semua pembiayaan
 *     tags: [Pembiayaan]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar pembiayaan
 */
router.get('/', authenticate, controller.getAllPembiayaan);
/**
 * @swagger
 * /pembiayaan/{id}:
 *   get:
 *     summary: Detail pembiayaan
 *     tags: [Pembiayaan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Data pembiayaan
 */
router.get('/:id', controller.getPembiayaanById);
/**
 * @swagger
 * /pembiayaan:
 *   post:
 *     summary: Tambah pembiayaan
 *     tags: [Pembiayaan]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nomor_pembiayaan, tujuan_pembiayaan, nominal_pengajuan, jangka_waktu_bulan, status_pengajuan, tanggal_pengajuan]
 *             properties:
 *               nomor_pembiayaan: { type: string }
 *               tujuan_pembiayaan: { type: string }
 *               nominal_pengajuan: { type: number }
 *               nominal_disetujui: { type: number }
 *               jangka_waktu_bulan: { type: integer }
 *               bunga_persen: { type: number }
 *               angsuran_per_bulan: { type: number }
 *               tanggal_pengajuan: { type: string, format: date-time }
 *               tanggal_verifikasi: { type: string, format: date-time }
 *               tanggal_persetujuan: { type: string, format: date-time }
 *               tanggal_pencairan: { type: string, format: date-time }
 *               mitra_nama: { type: string }
 *               mitra_tipe: { type: string }
 *               mitra_kontak: { type: string }
 *               mitra_alamat: { type: string }
 *               status_pengajuan: { type: string, enum: ['draf', 'kk', 'surat_usaha', 'npwp', 'rekening_koran'] }
 *               alasan_penolakan: { type: string }
 *               credit_score: { type: integer }
 *     responses:
 *       201:
 *         description: Pembiayaan dibuat
 */
router.post('/', authenticate, controller.createPembiayaan);
/**
 * @swagger
 * /pembiayaan/{id}:
 *   put:
 *     summary: Update pembiayaan
 *     tags: [Pembiayaan]
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
 *     responses:
 *       200:
 *         description: Pembiayaan updated
 */
router.put('/:id', controller.updatePembiayaan);
/**
 * @swagger
 * /pembiayaan/{id}:
 *   delete:
 *     summary: Hapus pembiayaan
 *     tags: [Pembiayaan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: Dihapus
 */
router.delete('/:id', controller.deletePembiayaan);

export default router;
