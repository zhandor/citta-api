import { Router } from 'express';

import * as controller from '../controllers/cityController';

const router = Router();

router.post('/cidades/', controller.create);
router.get('/cidades/', controller.list);
router.get('/cidades/:id', controller.listById);
router.put('/cidades/:id', controller.update);
router.delete('/cidades/:id', controller.remove);

// router.post('/cidades/create', controller.create);
// router.get('/cidades/listAll', controller.listAll);
// router.get('/cidades/listByUF', controller.listByUF);
// router.get('/cidades/listByName', controller.listByName);
// router.get('/cidades/listById', controller.listById);
// router.put('/cidades/update', controller.update);
// router.delete('/cidades/delete', controller.remove);

export default router