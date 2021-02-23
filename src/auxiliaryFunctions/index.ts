
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

export{ clearText }