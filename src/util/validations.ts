import { Request, Response, NextFunction} from 'express';

const cityCreate = (req: Request, res: Response, next: NextFunction) => {
    console.log("Validando o Create");
    const { nome, uf, area, populacao } = req.body
    const params = { nome, uf, area, populacao }
    let errorCount = 0;
    let errors = new Object();    

    if(Object.keys(req.body).length == 0){
        const request = 'A requisição está vazia.';
        errors = {request, ...errors};
        errorCount++;
    }else{
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
        if(!params.populacao || typeof params.populacao === 'undefined'){
            const populacao = 'A população deve ser informada.';
            errors = {populacao, ...errors};
            errorCount++;
        }else if(params.populacao <= 0){
            const populacao = 'A população deve ser maior que zero.';
            errors = {populacao, ...errors};
            errorCount++;
        }
        if(!params.area || typeof params.area === 'undefined'){
            const area = 'A area deve ser informada.';
            errors = {area, ...errors};
            errorCount++;
        }else if(params.area <= 0){
            const area = 'A área da cidade deve ser maior que zero.';
            errors = {area, ...errors};
            errorCount++;
        }
    }
    if(errorCount == 0){
        console.log("deu certo")
        next();
    }else{
        next({error: errors, status: 400});
    }
}

const cityUpdate = (req: Request, res: Response, next: NextFunction) => {
    console.log("Validando o Update");
    const { nome, uf, area, populacao } = req.body;
    const params = { nome, uf, area, populacao };
    let errorCount = 0;
    let errors = new Object();
    if(!req.params.id || req.params.id == ''){
        const request = 'A requisição não trouxe o ID para ser alterado.';
        errors = {request, ...errors};
        errorCount++;
    }
    
    if(Object.keys(req.body).length == 0){
        const request = 'A requisição está vazia.';
        errors = {request, ...errors};
        errorCount++;
    }else{
        if(typeof params.nome !== 'undefined'){
            if(params.nome == ''){
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
        }
        if(typeof params.uf !== 'undefined'){
            if(params.uf == ''){
                const uf = 'A UF cidade está vazia.';
                errors = {uf, ...errors};
                errorCount++;
            }else if(params.uf.length !=2 ){
                const uf = 'A UF deve ter 2 caracteres.';
                errors = {uf, ...errors};
                errorCount++;
            }
        }
        if(typeof params.populacao !== 'undefined'){
            if(params.populacao){
                const populacao = 'A população deve ser informada.';
                errors = {populacao, ...errors};
                errorCount++;
            }else if(params.populacao <= 0){
                const populacao = 'A população deve ser maior que zero.';
                errors = {populacao, ...errors};
                errorCount++;
            }    
            if(typeof params.area !== 'undefined'){
                if(params.area){
                    const area = 'A area deve ser informada.';
                    errors = {area, ...errors};
                    errorCount++;
                }else if(params.area <= 0){
                    const area = 'A área da cidade deve ser maior que zero.';
                    errors = {area, ...errors};
                    errorCount++;
                }
            }
        }
    }
    if(errorCount == 0){
        next();
    }else{
        next({error: errors, status: 400});
    }
}

const cityDelete = (req: Request, res: Response, next: NextFunction) => {
    console.log("Validando o Delete");
    let errorCount = 0;
    let errors = new Object();

    if(!req.params.id || req.params.id == ''){
        const request = 'A requisição não trouxe o ID para ser deletado.';
        errors = {request, ...errors};
        errorCount++;
    }
    
    if(errorCount == 0){
        next();
    }else{
        next({error: errors, status: 400});
    }
}

export { cityCreate, cityUpdate, cityDelete}