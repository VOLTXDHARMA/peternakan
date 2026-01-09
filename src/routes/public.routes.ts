import { Router } from 'express';
import * as umkmController from '../controllers/umkm.controller.js';
import * as pelController from '../controllers/pelatihan.controller.js';
import * as materiController from '../controllers/materi_pelatihan.controller.js';

const router = Router();

// Public testing endpoints (NO AUTH) - for local/dev testing only

router.get('/umkm', umkmController.getUmkms);
router.get('/umkm/:id', umkmController.getUmkm);
router.post('/umkm', umkmController.postUmkm);
router.put('/umkm/:id', umkmController.putUmkm);
router.delete('/umkm/:id', umkmController.deleteUmkm);


router.get('/pelatihan', pelController.getPelatihans);
router.get('/pelatihan/:id', pelController.getPelatihan);
router.post('/pelatihan', pelController.postPelatihan);
router.put('/pelatihan/:id', pelController.putPelatihan);
router.delete('/pelatihan/:id', pelController.deletePelatihanById);

router.get('/materi_pelatihan', materiController.getAllMateri);
router.get('/materi_pelatihan/:id', materiController.getMateriById);
router.get('/materi_pelatihan/pelatihan/:pelatihanId', materiController.getByPelatihan);
router.post('/materi_pelatihan', materiController.createMateri);
router.put('/materi_pelatihan/:id', materiController.updateMateri);
router.delete('/materi_pelatihan/:id', materiController.deleteMateri);

export default router;
