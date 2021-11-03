import * as restify from 'restify';
import { ForbiddenError } from 'restify-errors';


export const authorize: (...profiles: string[]) => restify.RequestHandler = (...profiles) => {
    return (req, resp, next) => {
        if(req.authenticated !== undefined && req.authenticated.profiles[0] === profiles[0]){
            next()
        }else{
            console.log(req.authenticated)
            next(new ForbiddenError('Permission denied'))
        }
    }
}