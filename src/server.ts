import express from 'express';

import router from './router';

class Server{
    public express: express.Application;

    constructor(){
        this.express = express()
        this.initialize()
    }

    private initialize(){
        this.middlewares();
        this.routes();
    }

    private middlewares(){
        this.express.use(express.json());
        this.express.use(express.urlencoded());
    }

    private routes(){
        this.express.use(router);
    }
}

export default new Server().express