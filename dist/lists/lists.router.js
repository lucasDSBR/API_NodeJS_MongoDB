"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listsRouter = void 0;
const lists_model_1 = require("./lists.model");
const restify_errors_1 = require("restify-errors");
const model_router_1 = require("../common/model-router");
const authz_handler_1 = require("../Security/authz.handler");
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
    envelope(document) {
        let resource = super.envelope(document);
        resource._links.users = `${this.basePath}/${resource._id}`;
        return resource;
    }
    applyRoutes(application) {
        //Configurações das rotas transferidas para => "./common/model-router.ts"
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, [(0, authz_handler_1.authorize)('admin'), this.save]);
        application.put(`${this.basePath}/:id`, [(0, authz_handler_1.authorize)('admin'), this.validateId, this.replace]);
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
        application.del(`${this.basePath}/:id`, [(0, authz_handler_1.authorize)('admin'), this.validateId, this.delete]);
    }
}
exports.listsRouter = new ListsRouter();
