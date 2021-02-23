import { Request, Response} from 'express';

import * as model from './model'

const create = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await model.createCity(req.body));
    } catch (error) {
        res.status(401).json({error})
    }

}

const listAll = async (req: Request, res: Response) => {
    try {
        const cityList = await model.listCities();        
        res.status(200).json(cityList);
    } catch (error) {
        res.status(401).json({error})
    }
}

const listByUF = async (req: Request, res: Response) => {
    try {
        const cityList = await model.listCitiesByUF(req.query);        
        res.status(200).json(cityList);
    } catch (error) {
        res.status(401).json({error})
    }
}


const listByName = async (req: Request, res: Response) => {
    try {
        const cityList = await model.listCitiesByName(req.query);
        res.status(200).json(cityList);
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

export { create, listAll, listByUF, listByName, update, remove }