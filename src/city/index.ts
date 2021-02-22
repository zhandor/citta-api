import { Router } from 'express';

import * as controller from './controller';

const router = Router();

router.post('/createCity', controller.create)
router.get('/listCities', controller.listAll)
router.get('/listCitiesByUF', controller.listByUF)
router.get('/listCitiesByName', controller.listByName)
router.put('/updateCity', controller.update)
router.delete('/deleteCity', controller.remove)

export default router