import * as restify from 'restify';
import { User } from '../users/users.model';
import { NotAuthorizedError } from 'restify-errors';
import * as jwt from 'jsonwebtoken';
import { environment } from '../common/environment';

export const authenticate: restify.RequestHandler = (req, resp, next) =>{
    const {email, password} = req.body
    User.findByEmail(email, '+password')
    .then(user => {
        if(user && user.matches(password)){
            //gerar token
            const token = jwt.sign({sub: user.email, iss: 'meat-api'}, 
                environment.security.apiSecret)

            resp.json({id: user._id, name: user.name, email: user.email, perfil: user.profiles, accessToken: token})
            return next(false)
        }else{
            return next( new NotAuthorizedError('Invalid Credentials'))
        }
    }).catch(next)
}