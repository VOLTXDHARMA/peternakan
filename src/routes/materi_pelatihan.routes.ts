import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import * as controller from '../controllers/materi_pelatihan.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: MateriPelatihan
 *     description: Materi-pelatihan per modul
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     MateriPelatihan:
 *       type: object
 *       properties:
 *         id: { type: string }
 *         judul_materi: { type: string }
 *         tipe_konten: { type: string }
 *         konten_url: { type: string }
 *         durasi_menit: { type: integer }
 *         deskripsi: { type: string }
 *     CreateMateriRequest:
 *       type: object
 *       required: [pelatihan_id, urutan, judul_materi, tipe_konten]
 *       properties:
 *         pelatihan_id: { type: string }
 *         urutan: { type: integer }
 *         judul_materi: { type: string }
 *         tipe_konten: { type: string }
 *         konten_url: { type: string }
 *         durasi_menit: { type: integer }
 *         deskripsi: { type: string }
 *       example:
 *         pelatihan_id: 1
 *         urutan: 1
 *         judul_materi: "Intro Manajemen Kandang"
 *         tipe_konten: "video"
 *         konten_url: "https://youtube.com/watch?v=contoh-intro"
 *         durasi_menit: 12
 *         deskripsi: "Video pengantar manajemen kandang"
 *     UpdateMateriRequest:
 *       type: object
 *       properties:
 *         judul_materi: { type: string }
 *         tipe_konten: { type: string }
 *         konten_url: { type: string }
 *         durasi_menit: { type: integer }
 *         deskripsi: { type: string }
 *       example:
 *         judul_materi: "Intro Manajemen Kandang (Updated)"
 *         tipe_konten: "video"
 *         konten_url: "https://youtube.com/watch?v=contoh-intro-updated"
 *         durasi_menit: 15
 *         deskripsi: "Video pengantar manajemen kandang (Updated)"
 */

/**
 * @swagger
 * /materi_pelatihan:
 *   get:
 *     summary: List semua materi pelatihan
 *     tags: [MateriPelatihan]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Daftar materi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MateriPelatihan'
 */
router.get('/', authenticate, controller.getAllMateri);

/**
 * @swagger
 * /materi_pelatihan/{id}:
 *   get:
 *     summary: Detail materi
 *     tags: [MateriPelatihan]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Data materi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MateriPelatihan'
 */
router.get('/:id', authenticate, controller.getMateriById);

/**
 * @swagger
 * /materi_pelatihan/pelatihan/{pelatihanId}:
 *   get:
 *     summary: Materi by pelatihan
 *     tags: [MateriPelatihan]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: pelatihanId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: List materi untuk pelatihan
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MateriPelatihan'
 */
router.get('/pelatihan/:pelatihanId', authenticate, controller.getByPelatihan);

/**
 * @swagger
 * /materi_pelatihan/pelatihan/{pelatihanId}/isi-materi:
 *   get:
 *     summary: Ambil isi materi (sederhana) berdasarkan pelatihan id
 *     tags: [MateriPelatihan]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: pelatihanId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Daftar isi materi (urutan, judul, isi)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   urutan: { type: integer }
 *                   judul: { type: string }
 *                   isi: { type: string }
 */
router.get('/pelatihan/:pelatihanId/isi-materi', authenticate, controller.getIsiByPelatihan);

/**
 * @swagger
 * /materi_pelatihan:
 *   post:
 *     summary: Tambah materi baru
 *     tags: [MateriPelatihan]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CreateMateriRequest' }
 *     responses:
 *       201:
 *         description: Materi dibuat
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/MateriPelatihan' }
 */
router.post('/', authenticate, controller.createMateri);

/**
 * @swagger
 * /materi_pelatihan/pelatihan/{pelatihanId}:
 *   post:
 *     summary: Tambah materi baru untuk pelatihan tertentu (flow otomatis)
 *     tags: [MateriPelatihan]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: pelatihanId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [judul_materi, tipe_konten]
 *             properties:
 *               judul_materi: { type: string }
 *               tipe_konten: { type: string }
 *               konten_url: { type: string }
 *               durasi_menit: { type: integer }
 *               deskripsi: { type: string }
 *             example:
 *               judul_materi: "Intro Manajemen Kandang"
 *               tipe_konten: "video"
 *               konten_url: "https://youtube.com/watch?v=contoh-intro"
 *               durasi_menit: 12
 *               deskripsi: "Video pengantar manajemen kandang"
 *     responses:
 *       201:
 *         description: Materi dibuat dengan urutan otomatis
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/MateriPelatihan' }
 */
router.post('/pelatihan/:pelatihanId', authenticate, controller.createMateriByPelatihan);

/**
 * @swagger
 * /materi_pelatihan/{id}:
 *   put:
 *     summary: Update materi
 *     tags: [MateriPelatihan]
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
 *           schema: { $ref: '#/components/schemas/UpdateMateriRequest' }
 *     responses:
 *       200:
 *         description: Materi updated
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/MateriPelatihan' }
 */
router.put('/:id', authenticate, controller.updateMateri);

/**
 * @swagger
 * /materi_pelatihan/{id}:
 *   delete:
 *     summary: Hapus materi
 *     tags: [MateriPelatihan]
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
router.delete('/:id', authenticate, controller.deleteMateri);

export default router;
