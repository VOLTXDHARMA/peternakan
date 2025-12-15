import { Router } from 'express';
import * as controller from '../controllers/progres_pelatihan.controller';
import { authenticate } from '../middlewares/auth.middleware';

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
// user-specific route should be authenticated; server will still validate user_id
router.get('/user/:userId/pelatihan/:pelatihanId', authenticate, controller.getByUserAndPelatihan);
router.post('/', authenticate, controller.createProgres);
router.put('/:id', authenticate, controller.updateProgres);
router.delete('/:id', authenticate, controller.deleteProgres);

export default router;
