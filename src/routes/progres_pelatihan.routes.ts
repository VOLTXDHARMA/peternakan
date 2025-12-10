import { Router } from 'express';
import * as controller from '../controllers/progres_pelatihan.controller';

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     ProgresPelatihan:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         user_id:
 *           type: string
 *         pelatihan_id:
 *           type: string
 *         materi_id:
 *           type: string
 *         progress_percent:
 *           type: integer
 *         skor:
 *           type: integer
 *         status:
 *           type: string
 */

router.get('/', controller.getAllProgres);
router.get('/:id', controller.getProgresById);
router.get('/user/:userId/pelatihan/:pelatihanId', controller.getByUserAndPelatihan);
router.post('/', controller.createProgres);
router.put('/:id', controller.updateProgres);
router.delete('/:id', controller.deleteProgres);

export default router;
