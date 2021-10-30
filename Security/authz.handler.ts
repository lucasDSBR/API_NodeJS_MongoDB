import * as restify from 'restify';
import { ForbiddenError } from 'restify-errors';


export const authorize: (...profiles: string[]) => restify.RequestHandler = (...profiles) => {
    return (req, resp, next) => {
        console.log(req.authenticated.profiles)
        if(req.authenticated !== undefined && req.authenticated.profiles[0] === profiles[0]){
            next()
        }else{
            console.log(req.authenticated)
            next(new ForbiddenError('Permission denied'))
        }
    }
}