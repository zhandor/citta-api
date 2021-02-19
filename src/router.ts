import { Router, Request, Response, NextFunction } from 'express'

const router = Router()

router.get('/health', (req: Request, res: Response) => {
    res.status(200).json({response: "Health check passed"})
})

router.post('/post', (req: Request, res: Response) => {
    res.status(418).json({response: "I'm a teapot"})
})

export default router