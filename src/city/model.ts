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
    const { nome, uf, area, populacao, ativo } = body

    const city = new City({ nome, uf, area, populacao, ativo })
    return city.save().then((result) => {
        return result;
    })
}

const listCities = async () => {
    const cityList = await City.find({})
        .sort({uf:1, nome: 1}) //nome do campo: 1 para crescente e -1 para decrescente
        .catch(e => {
            console.log({e})
        })
        .then((result) => {        
            return result
        });
        
    return cityList;
}

const listCitiesByUF = async (query: any) => {
    const { uf } = query;
    console.log(query)
    const cityList = await City.find({uf})
        .sort({nome: 1})
        .catch(e => {
            console.log({e})
        })
        .then((result) => {        
            return result
        });

    return cityList;
}

const listCitiesByName = async (query: any) => {
    const { name } = query;
    const cityList = await City
        .find({ nome: { $regex: clearText(name), $options: 'i' } }) //option i: case insensitive
        //.find({$text: { $search: name }})
        .sort({uf:1, nome: 1})
        .catch(e => {
            console.log({e})
        })
        .then((result) => {        
            return result
        });
    
    return cityList;
}

const clearText = (text: string) => {
    const regexTxtA = new RegExp("[aãàáäâ]",'gi');
    text = text.replace(regexTxtA, '[aãàáäâ]');
    const regexTxtE = new RegExp("[èeéëê]",'gi');
    text = text.replace(regexTxtE, '[èeéëê]');
    const regexTxtI = new RegExp("[iìíïî]",'gi');
    text = text.replace(regexTxtI, '[iìíïî]');
    const regexTxtO = new RegExp("[oõòóöô]",'gi');
    text = text.replace(regexTxtO, '[oõòóöô]');
    const regexTxtU = new RegExp("[uùúüû]",'gi');
    text = text.replace(regexTxtU, '[uùúüû]');
    const regexTxtN = new RegExp("[nñ]",'gi');
    text = text.replace(regexTxtN, '[nñ]');
    const regexTxtC = new RegExp("[cç]",'gi');
    text = text.replace(regexTxtC, '[cç]');
    return text;
}

export { createCity, listCities, listCitiesByUF, listCitiesByName }