import { ICity } from '../models/cityModel'
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

const validateFields = (params: ICity) => {
    console.log(params);
    let errorCount = 0;
    let errors = new Object();
    if(params.nome == '' || typeof params.nome === 'undefined'){
        const nome = 'O nome da cidade está vazio.';
        errors = {nome, ...errors};
        errorCount++;
    }
    if(params.uf == '' || typeof params.uf === 'undefined'){
        const uf = 'A UF cidade está vazia.';
        errors = {uf, ...errors};
        errorCount++;
    }
    if(params.populacao <= 0 || typeof params.populacao === 'undefined'){
        const populacao = 'A população deve ser maior que zero.';
        errors = {populacao, ...errors};
        errorCount++;
    }
    if(params.area <= 0 || typeof params.area === 'undefined'){
        const area = 'A área da cidade deve ser maior que zero.';
        errors = {area, ...errors};
        errorCount++;
    }
    
    //const errors = {nome, uf, populacao, area};

    return {isValid: (errorCount == 0), errors}
}

export{ clearText, validateFields }