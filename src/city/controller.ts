import { Request, Response} from 'express';

import { createCity } from './model'

const create = async (req: Request, res: Response) => {
    try {
        const {name, uf, area, population, active} = req.body;

        res.status(200).json(createCity(req.body));
    } catch (error) {
        res.status(401).json({error})
    }

}

const read = async (req: Request, res: Response) => {
    try {
        const {name, uf, area, population, active} = req.body;

        res.status(200).json({status: "success", payload: req.body})
    } catch (error) {
        res.status(401).json({error})
    }

}

const update = async (req: Request, res: Response) => {
    try {
        const {name, uf, area, population, active} = req.body;

        res.status(200).json({status: "success", payload: req.body})
    } catch (error) {
        res.status(401).json({error})
    }

}

const remove = async (req: Request, res: Response) => {
    try {
        const {name, uf, area, population, active} = req.body;

        res.status(200).json({status: "success", payload: req.body})
    } catch (error) {
        res.status(401).json({error})
    }

}

export { create, read, update, remove }