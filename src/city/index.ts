import { Router } from 'express';

import * as controller from '../controllers/cityController';

const router = Router();

router.post('/cidades/', controller.create);
router.get('/cidades/', controller.list);
router.get('/cidades/:id', controller.listById);
router.put('/cidades/:id', controller.update);
router.delete('/cidades/:id', controller.remove);

export default router