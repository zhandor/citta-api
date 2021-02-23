import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const citySchema = new Schema({
    // _id: mongoose.Types.ObjectId,
    nome: {type: String, required: true},
    uf: {type: String, required: true},
    area: {type: Number, required: true},
    populacao: {type: Number, required: true},
    ativo: {type: Boolean, default: true, required: true},
    createdAt: {type: Date},
    updatedAt: {type: Date}
}, { timestamps: true });

const City = mongoose.model('City', citySchema);

const createCity = async (body: any) => {
    try {
        const { nome, uf, area, populacao, ativo } = body
        const city = new City({ nome, uf, area, populacao, ativo })
        return city.save().then((result) => {
            return result;
        });        
    } catch (error) {
        console.log('Error: ', error);
    }
}

const listCities = async () => {
    try {
        const cityList = await City.find({ativo: true})
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
        const cityList = await City.find({uf: {$regex: uf, $options: 'i'}, ativo: true})
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
        const cityList = await City
            .find({nome: {$regex: clearText(name), $options: 'i'}, ativo: true}) //option i: case insensitive
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

const deactivateCity = async (body: any) => {
    try {
        const { id } = body;
        const options = {new: true};
        const updCity = await City.findByIdAndUpdate(id, {ativo: false}, options, (result) => {
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
        const updCity = await City.findByIdAndUpdate(id, {nome, uf, area, populacao, ativo}, options, (result) => {
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
        const updCity = await City.findByIdAndRemove(id, options, (result) => {
            console.log(result);
            return result;
        });
        return updCity;        
    } catch (error) {
        console.log('Error: ', error);
    }
}

//função para "retirar" diacriticos (acentos e caracteres especiais) nas buscas
const clearText = (text: string) => {    
    return text
        .replace(new RegExp("[aãàáäâ]",'gi'), '[aãàáäâ]')
        .replace(new RegExp("[eèéëê]",'gi'), '[eèéëê]')
        .replace(new RegExp("[iìíïî]",'gi'), '[iìíïî]')    
        .replace(new RegExp("[oõòóöô]",'gi'), '[oõòóöô]')    
        .replace(new RegExp("[uùúüû]",'gi'), '[uùúüû]')    
        .replace(new RegExp("[nñ]",'gi'), '[nñ]')        
        .replace(new RegExp("[cç]",'gi'), '[cç]');    
}

export { createCity, listCities, listCitiesByUF, listCitiesByName, updateCity, deleteCity, deactivateCity}