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
        const updCity = await model.updateCity(req.body);
        res.status(200).json(updCity);
    } catch (error) {
        res.status(401).json({error})
    }

}

const remove = async (req: Request, res: Response) => {
    try {
        const delCity = await model.updateCity(req.body);
        res.status(200).json(delCity);
    } catch (error) {
        res.status(401).json({error})
    }

}

export { create, listAll, listByUF, listByName, update, remove }