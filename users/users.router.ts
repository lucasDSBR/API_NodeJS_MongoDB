import * as restify from 'restify';
import { User } from './users.model';
import { NotFoundError } from 'restify-errors';
import { ModelRouter } from '../common/model-router';
import { authenticate } from '../Security/auth.handler';
import { authorize } from '../Security/authz.handler';
class UsersRouter extends ModelRouter<User> {

    
    constructor(){
        super(User)
        this.on('beforeRender', document=>{
            document.password = undefined
        })
    }

    findByEmail = (req, resp, next) => {
        if(req.query.email){
            User.findByEmail(req.query.email)
                .then(this.renderAll(resp, next))
                .catch(next)
        }else{
            next()
        }
    }


    applyRoutes(application: restify.Server){
        //Configurações das rotas transferidas para => "./common/model-router.ts"
        application.get(`${this.basePath}`, [authorize('admin'), this.findAll])

        application.get(`${this.basePath}/:id`, [authorize('admin'), this.validateId, this.findById])

        application.post(`${this.basePath}`, [this.save])

        application.put(`${this.basePath}/:id`, [authorize('admin'), this.validateId, this.replace])

        application.patch(`${this.basePath}/:id`, [authorize('admin'), this.validateId, this.update])

        application.del(`${this.basePath}/:id`, [authorize('admin'), this.validateId, this.delete])

        application.post(`${this.basePath}/login`, authenticate)

    }
}

export const usersRouter = new UsersRouter();

