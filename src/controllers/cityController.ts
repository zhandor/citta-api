import { Request, Response} from 'express';

import * as model from '../models/cityModel'
import * as aux from '../auxiliaryFunctions'

const create = async (req: Request, res: Response) => {
    try {
        if(req.body){
            res.status(200).json(await createCity(req.body));
        }else{
            res.status(401).json({error: 'A requisição está vazia'})    
        }
    } catch (error) {
        res.status(401).json({error})
    }

}

const listAll = async (req: Request, res: Response) => {
    try {
        const cityList = await listCities();        
        res.status(200).json(cityList);
    } catch (error) {
        res.status(401).json({error})
    }
}

const listByUF = async (req: Request, res: Response) => {
    try {
        const cityList = await listCitiesByUF(req.query);        
        res.status(200).json(cityList);
    } catch (error) {
        res.status(401).json({error})
    }
}

const listById = async (req: Request, res: Response) => {
    try {
        const cityList = await listCitiesById(req.query);
        res.status(200).json(cityList);
    } catch (error) {
        res.status(401).json({error})
    }
}

const listByName = async (req: Request, res: Response) => {
    try {
        const cityList = await listCitiesByName(req.query);
        res.status(200).json(cityList);
    } catch (error) {
        res.status(401).json({error})
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const updCity = await updateCity(req.body);
        res.status(200).json(updCity);
    } catch (error) {
        res.status(401).json({error})
    }

}

const remove = async (req: Request, res: Response) => {
    try {
        const delCity = await deleteCity(req.body);
        res.status(200).json(delCity);
    } catch (error) {
        res.status(401).json({error})
    }

}

const createCity = async (body: any) => {
    try {
        const { nome, uf, area, populacao } = body;
        const validateBody = aux.validateFields({nome, uf, area, populacao});
        if(validateBody.isValid){
            const city = new model.City({ nome, uf, area, populacao });
            return city.save().then((result) => {
                return result;
            });
        }else{
            return validateBody.errors;
        }
    } catch (error) {
        console.log('Error: ', error);
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

const listCitiesById = async (query: any) => {
    try {
        const { id } = query;
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

const deactivateCity = async (body: any) => {
    try {
        const { id } = body;
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

const updateCity = async (body: any) => {
    try {
        const { id, nome, uf, area, populacao, ativo = true } = body;
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

const deleteCity = async (body: any) => {
    try {
        const { id } = body;
        const options = {new: true};
        const updCity = await model.City.findByIdAndRemove(id, options, (result) => {
            console.log(result);
            return result;
        });
        return updCity;        
    } catch (error) {
        console.log('Error: ', error);
    }
}

export { create, listAll, listByUF, listByName, listById, update, remove }