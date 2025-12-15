import { Router } from 'express';
import * as umkmController from '../controllers/umkm.controller';
import * as pelController from '../controllers/pelatihan.controller';
import * as materiController from '../controllers/materi_pelatihan.controller';
import * as progresController from '../controllers/progres_pelatihan.controller';

const router = Router();

// Public testing endpoints (NO AUTH) - for local/dev testing only
router.get('/umkm', umkmController.getAllUmkm);
router.get('/umkm/:id', umkmController.getUmkmById);
router.post('/umkm', umkmController.createUmkm);
router.put('/umkm/:id', umkmController.updateUmkm);
router.delete('/umkm/:id', umkmController.deleteUmkm);

router.get('/pelatihan', pelController.getAllPelatihan);
router.get('/pelatihan/:id', pelController.getPelatihanById);
router.post('/pelatihan', pelController.createPelatihan);
router.put('/pelatihan/:id', pelController.updatePelatihan);
router.delete('/pelatihan/:id', pelController.deletePelatihan);

router.get('/materi_pelatihan', materiController.getAllMateri);
router.get('/materi_pelatihan/:id', materiController.getMateriById);
router.get('/materi_pelatihan/pelatihan/:pelatihanId', materiController.getByPelatihan);
router.post('/materi_pelatihan', materiController.createMateri);
router.put('/materi_pelatihan/:id', materiController.updateMateri);
router.delete('/materi_pelatihan/:id', materiController.deleteMateri);

router.get('/progres_pelatihan', progresController.getAllProgres);
router.get('/progres_pelatihan/:id', progresController.getProgresById);
router.post('/progres_pelatihan', progresController.createProgres);
router.put('/progres_pelatihan/:id', progresController.updateProgres);
router.delete('/progres_pelatihan/:id', progresController.deleteProgres);

export default router;
