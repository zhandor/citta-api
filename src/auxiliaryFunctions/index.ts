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
    let errors = '';
    if(params.nome == '' || typeof params.nome === 'undefined'){
        errors += 'O nome da cidade está vazio. ';
    }
    if(params.uf == '' || typeof params.uf === 'undefined'){
        errors += 'A UF cidade está vazia. ';
    }
    if(params.populacao <= 0 || typeof params.populacao === 'undefined'){
        errors += 'A população deve ser maior que zero. ';
    }
    if(params.area <= 0 || typeof params.area === 'undefined'){
        errors += 'A área da cidade deve ser maior que zero. ';
    }
    return {isValid: (errors.length==0), errors}
}

export{ clearText, validateFields }