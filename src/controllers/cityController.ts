import { NextFunction, Request, Response} from 'express';

import * as model from '../models/cityModel'
import * as util from '../util'

const create = async (req: Request, res: Response, next: NextFunction) => {    
    const newCity = await createCity(req.body);
    if(typeof newCity.status === 'undefined'){
        next({error: 'A requisição está vazia', status: 500});
    }
    console.log(newCity);
    res.status(newCity.status).json(newCity.result);    
}

const list = async (req: Request, res: Response, next: NextFunction) => {
    const {name,uf} = req.query;    
        
    if(name){
        //List by Name
        try {
            const cityList = await listCitiesByName(req.query);
            res.status(200).json(cityList);
        } catch (error) {
            next({error, status: 500});
        }
    }else if(uf){
        //List by UF
        try {
            const cityList = await listCitiesByUF(req.query);        
            res.status(200).json(cityList);
        } catch (error) {
            next({error, status: 500});
        }
    }else{
        //List All
        try {
            const cityList = await listCities();        
            res.status(200).json(cityList);
        } catch (error) {
            next({error, status: 500});
        }
    }
}

const listById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cityList = await listCitiesById(req.params.id);
        res.status(200).json(cityList);
    } catch (error) {
        next({error, status: 500});
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updCity = await updateCity(req);
        res.status(202).json(updCity);
    } catch (error) {
        next({error, status: 500});
    }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const delCity = await deleteCity(req.body);
        res.status(202).json(delCity);
    } catch (error) {
        next({error, status: 500});
    }
}

const createCity = async (body: any) => {
    try{
        const { nome, uf, area, populacao } = body;
        let result;
        const city = new model.City({ nome, uf, area, populacao });
        result = await city.save().then((result) => {
            console.log("Create City");
            return result;
        });        
        return {result, status: 201};        
    }catch (error){
        return {error, status: 500};
    }
}

const listCities = async () => {
    try {
        const cityList = await model.City.find({ativo: true})
            .sort({uf:1, nome: 1}) //nome do campo: 1 para crescente e -1 para decrescente
            .catch(e => {
                console.log({e})
                return null;
            })
            .then((result) => {        
                return result
            });            
        return cityList;        
    } catch (error) {
        console.log('Error: ', error);
        return null;
    }
}

const listCitiesByUF = async (query: any) => {
    try {
        const { uf } = query;
        console.log(query)
        const cityList = await model.City.find({uf: {$regex: uf, $options: 'i'}, ativo: true})
            .sort({nome: 1})
            .catch(e => {
                console.log({e});
                return null;
            })
            .then((result) => {        
                return result
            });
    
        return cityList;        
    } catch (error) {        
        console.log('Error: ', error);
        return null;
    }
}

const listCitiesByName = async (query: any) => {
    try {
        const { name } = query;
        const cityList = await model.City
            .find({nome: {$regex: util.clearText(name), $options: 'i'}, ativo: true}) //option i: case insensitive
            .sort({uf:1, nome: 1})
            .catch(e => {
                console.log({e});
                return null;
            })
            .then((result) => {        
                return result
            });
        
        return cityList;        
    } catch (error) {
        console.log('Error: ', error);
        return null;
    }
}

const listCitiesById = async (id: any) => {
    try {        
        const cityList = await model.City
            .findById(id) //option i: case insensitive            
            .catch(e => {
                console.log({e});
                return null;
            })
            .then((result) => {        
                return result
            });
        
        return cityList;        
    } catch (error) {
        console.log('Error: ', error);
        return null;
    }
}

const deactivateCity = async (req: any) => {
    try {
        const { id } = req.parasms;
        const options = {new: true, select: {}};
        const updCity = await model.City.findByIdAndUpdate(id, {ativo: false}, options, (result) => {
            console.log(result);
            return result;
        });
        return updCity;        
    } catch (error) {
        console.log('Error: ', error);
        return null;
    }
}

const updateCity = async (req: any) => {
    try {
        const id = req.params.id;
        const { nome, uf, area, populacao, ativo = true } = req.body;
        const options = {new: true, select: {}, omitUndefined: true};
        const updCity = await model.City.findByIdAndUpdate(id, {nome, uf, area, populacao, ativo}, options, (result) => {
            console.log(result);
            console.log("Update City");
            return result;
        });
        return updCity;        
    } catch (error) {
        console.log('Error: ', error);
    }
}

const deleteCity = async (req: any) => {
    try {
        const id = req.params.id;
        const options = {new: true};
        const updCity = await model.City.findByIdAndDelete(id, options, (result) => {
            console.log(result);
            return result;
        });
        return updCity;        
    } catch (error) {
        console.log('Error: ', error);
    }
}

export { create, list, listById, update, remove }