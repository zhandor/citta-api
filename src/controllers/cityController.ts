import { Request, Response} from 'express';

import * as model from '../models/cityModel'
import * as aux from '../util'

const create = async (req: Request, res: Response) => {
    try {
        if(req.body){
            const newCity = await createCity(req.body);            
            res.status((typeof newCity.status === 'undefined')?500:newCity.status).json(newCity.result);
        }else{
            res.status(400).json({error: 'A requisição está vazia'})    
        }
    } catch (error) {
        res.status(500).json({error})
    }

}

const list = async (req: Request, res: Response) => {
    const {name,uf} = req.query;    
        
    if(name){
        //List by Name
        try {
            const cityList = await listCitiesByName(req.query);
            res.status(200).json(cityList);
        } catch (error) {
            res.status(500).json({error})
        }
    }else if(uf){
        //List by UF
        try {
            const cityList = await listCitiesByUF(req.query);        
            res.status(200).json(cityList);
        } catch (error) {
            res.status(500).json({error})
        }
    }else{
        //List All
        try {
            const cityList = await listCities();        
            res.status(200).json(cityList);
        } catch (error) {
            res.status(500).json({error});
        }
    }
}

const listById = async (req: Request, res: Response) => {
    try {
        const cityList = await listCitiesById(req.params.id);
        res.status(200).json(cityList);
    } catch (error) {
        res.status(401).json({error})
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const updCity = await updateCity(req);
        res.status(200).json(updCity);
    } catch (error) {
        res.status(500).json({error})
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const delCity = await deleteCity(req.body);
        res.status(200).json(delCity);
    } catch (error) {
        res.status(500).json({error})
    }
}

const createCity = async (body: any) => {
    try {
        const { nome, uf, area, populacao } = body;
        const validateBody = aux.validateFields({nome, uf, area, populacao});
        let result, status;
        if(validateBody.isValid){
            const city = new model.City({ nome, uf, area, populacao });
            result = city.save().then((result) => {
                return result;
            });
            status = 201;
        }else{
            result = validateBody.errors;
            status = 400;
        }
        return {result, status}
    } catch (error) {
        console.log('Error: ', error);
        return {result: error, status: 500}
    }
}

const listCities = async () => {
    try {
        const cityList = await model.City.find({ativo: true})
            .sort({uf:1, nome: 1}) //nome do campo: 1 para crescente e -1 para decrescente
            .catch(e => {
                console.log({e})
            })
            .then((result) => {        
                return result
            });            
        return cityList;        
    } catch (error) {
        console.log('Error: ', error);        
    }
}

const listCitiesByUF = async (query: any) => {
    try {
        const { uf } = query;
        console.log(query)
        const cityList = await model.City.find({uf: {$regex: uf, $options: 'i'}, ativo: true})
            .sort({nome: 1})
            .catch(e => {
                console.log({e})
            })
            .then((result) => {        
                return result
            });
    
        return cityList;        
    } catch (error) {        
        console.log('Error: ', error);
    }
}

const listCitiesByName = async (query: any) => {
    try {
        const { name } = query;
        const cityList = await model.City
            .find({nome: {$regex: aux.clearText(name), $options: 'i'}, ativo: true}) //option i: case insensitive
            .sort({uf:1, nome: 1})
            .catch(e => {
                console.log({e})
            })
            .then((result) => {        
                return result
            });
        
        return cityList;        
    } catch (error) {
        console.log('Error: ', error);
    }
}

const listCitiesById = async (id: any) => {
    try {        
        const cityList = await model.City
            .findById(id) //option i: case insensitive            
            .catch(e => {
                console.log({e})
            })
            .then((result) => {        
                return result
            });
        
        return cityList;        
    } catch (error) {
        console.log('Error: ', error);
    }
}

const deactivateCity = async (req: any) => {
    try {
        const { id } = req.parasms;
        const options = {new: true};
        const updCity = await model.City.findByIdAndUpdate(id, {ativo: false}, options, (result) => {
            console.log(result);
            return result;
        });
        return updCity;        
    } catch (error) {
        console.log('Error: ', error);
    }
}

const updateCity = async (req: any) => {
    try {
        const id = req.params.id;
        const { nome, uf, area, populacao, ativo = true } = req.body;
        const options = {new: true};
        const updCity = await model.City.findByIdAndUpdate(id, {nome, uf, area, populacao, ativo}, options, (result) => {
            console.log(result);
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