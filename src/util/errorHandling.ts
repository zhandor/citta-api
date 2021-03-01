import { Request, Response, NextFunction } from 'express';

import {IError} from '../interfaces/error';

const errorHandler = ((error: IError, req: Request, res: Response, next: NextFunction) => {
    console.log("Error handling");
    
    res.status(error.status).json(error.error);
});

export default errorHandler