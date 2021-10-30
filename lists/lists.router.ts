import { Router } from '../common/router';
import * as restify from 'restify';
import { Lists } from './lists.model';
import { NotFoundError } from 'restify-errors';
import { ModelRouter } from '../common/model-router';


class ListsRouter extends ModelRouter<Lists>{
    constructor(){
        super(Lists)
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
        application.get('/lists', this.findAll)

        application.get('/lists/:id', [this.validateId, this.findById])

        application.post('/lists', this.save)

        application.put('/lists/:id', [this.validateId, this.replace])

        application.patch('/lists/:id', [this.validateId, this.update])

        application.del('/lists/:id', [this.validateId, this.update])

    }
}

export const listsRouter = new ListsRouter();