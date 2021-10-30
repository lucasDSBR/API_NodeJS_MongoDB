import { Router } from '../common/router';
import * as restify from 'restify';
import { User } from './users.model';
import { NotFoundError } from 'restify-errors';
import { ModelRouter } from '../common/model-router';
class UsersRouter extends ModelRouter<User> {

    
    constructor(){
        super(User)
        this.on('beforeRender', document=>{
            document.password = undefined
        })
    }


    applyRoutes(application: restify.Server){
        //Configurações das rotas transferidas para => "./common/model-router.ts"

        application.get(`${this.basePath}`, this.findAll)

        application.get(`${this.basePath}/:id`, [this.validateId, this.findById])

        application.post(`${this.basePath}`, this.save)

        application.put(`${this.basePath}/:id`, [this.validateId, this.replace])

        application.patch(`${this.basePath}/:id`, [this.validateId, this.update])

        application.del(`${this.basePath}/:id`, [this.validateId, this.update])

    }
}

export const usersRouter = new UsersRouter();

