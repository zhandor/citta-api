import { Router } from 'express';

import * as controller from '../controllers/cityController';

const router = Router();

router.post('/cidades/create', controller.create);
router.get('/cidades/listAll', controller.listAll);
router.get('/cidades/listByUF', controller.listByUF);
router.get('/cidades/listByName', controller.listByName);
router.get('/cidades/listById', controller.listById);
router.put('/cidades/update', controller.update);
router.delete('/cidades/delete', controller.remove);

export default router