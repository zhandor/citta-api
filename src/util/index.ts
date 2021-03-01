import { Request, Response, NextFunction} from 'express';

import { ICity } from '../interfaces/city'

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
    }else if(params.nome.length < 3){
        const nome = 'O nome da cidade deve ter pelo menos 3 caracteres.';
        errors = {nome, ...errors};
        errorCount++;
    }else if(params.nome.length > 250){
        const nome = 'O nome da cidade deve ter no máximo 250 caracteres.';
        errors = {nome, ...errors};
        errorCount++;
    }
    if(params.uf == '' || typeof params.uf === 'undefined'){
        const uf = 'A UF cidade está vazia.';
        errors = {uf, ...errors};
        errorCount++;
    }else if(params.uf.length !=2 ){
        const uf = 'A UF deve ter 2 caracteres.';
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

    return {isValid: (errorCount == 0), errors}
}

export { clearText, validateFields, }