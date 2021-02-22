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

const createCity = (body: any) => {
    const { nome, uf, area, populacao, ativo } = body

    const city = new City({ nome, uf, area, populacao, ativo })
    city.save().then((result) => {
        return result;
    })
}

const listCities = async () => {
    const cityList = await City.find({})
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
    const cityList = await City.find({ nome: { $regex: name, $options: 'i' } })
        .catch(e => {
            console.log({e})
        })
        .then((result) => {        
            return result
        });
    
    return cityList;
}

export { createCity, listCities, listCitiesByUF, listCitiesByName }