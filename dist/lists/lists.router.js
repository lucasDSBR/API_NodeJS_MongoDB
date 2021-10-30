"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listsRouter = void 0;
const lists_model_1 = require("./lists.model");
const restify_errors_1 = require("restify-errors");
const model_router_1 = require("../common/model-router");
class ListsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(lists_model_1.Lists);
        this.findUserslist = (req, resp, next) => {
            lists_model_1.Lists.findById(req.params.id, "+users")
                .then(rest => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError('List not found');
                }
                else {
                    resp.json(rest.users);
                    return next();
                }
            }).catch;
        };
    }
    applyRoutes(application) {
        //Configurações das rotas transferidas para => "./common/model-router.ts"
        application.get('/lists', this.findAll);
        application.get('/lists/:id', [this.validateId, this.findById]);
        application.post('/lists', this.save);
        application.put('/lists/:id', [this.validateId, this.replace]);
        application.patch('/lists/:id', [this.validateId, this.update]);
        application.del('/lists/:id', [this.validateId, this.update]);
    }
}
exports.listsRouter = new ListsRouter();
