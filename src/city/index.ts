import { Router } from 'express';

import * as controller from './controller';

const router = Router();

router.post('/createCity', controller.create)
router.get('/readCity', controller.read)
router.put('/updateCity', controller.update)
router.delete('/deleteCity', controller.remove)

export default router