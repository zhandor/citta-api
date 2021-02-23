import { Router, Request, Response, NextFunction } from 'express'

import city from '../city'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({response: "Hello World!!"})
})

router.get('/health', (req: Request, res: Response) => {
    res.status(200).json({response: "Health check passed"})
})

router.post('/post', (req: Request, res: Response) => {
    res.status(418).json({response: "I'm a teapot"})
})

router.use(city);

export default router