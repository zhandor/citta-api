import { Router } from 'express';

import * as controller from '../controllers/cityController';
import * as validate from '../util/validations'


const router = Router();

router.post('/cidades', validate.cityCreate, controller.create);
router.get('/cidades', controller.list);
router.get('/cidades/:id', controller.listById);
router.put('/cidades/:id', validate.cityUpdate, controller.update);
router.delete('/cidades/:id', validate.cityDelete, controller.remove);


export default router