import { Router } from '../common/router';
import * as restify from 'restify';
import { Lists } from './lists.model';
import { NotFoundError } from 'restify-errors';
import { ModelRouter } from '../common/model-router';


class ListsRouter extends ModelRouter<Lists>{
    constructor(){
        super(Lists)
    }

    envelope(document){
        let resource = super.envelope(document)
        resource._links.users = `${this.basePath}/${resource._id}`
        return resource
    }

    findUserslist = (req, resp, next) => {
        Lists.findById(req.params.id, "+users")
        .then(rest =>{
            if(!rest){
                throw new NotFoundError('List not found');
            }else{
                resp.json(rest.users)
                return next()
            }
        }).catch
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

export const listsRouter = new ListsRouter();