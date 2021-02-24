import express from 'express';

import router from './router';
import connection from './dbConnection';

class Server{
    public express: express.Application;

    constructor(){
        this.express = express()
        this.initialize()
    }

    private initialize(){        
        connection('mongodb://localhost:27017/Citta-App?readPreference=primary&appname=MongoDB%20Compass&ssl=false');        
        this.middlewares();
        this.routes();
    }

    private middlewares(){
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended: true}));
    }

    private routes(){
        this.express.use(router);
    }
}

export default new Server().express