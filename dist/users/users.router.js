"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const users_model_1 = require("./users.model");
const model_router_1 = require("../common/model-router");
const auth_handler_1 = require("../Security/auth.handler");
const authz_handler_1 = require("../Security/authz.handler");
class UsersRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
        this.findByEmail = (req, resp, next) => {
            if (req.query.email) {
                users_model_1.User.findByEmail(req.query.email)
                    .then(this.renderAll(resp, next))
                    .catch(next);
            }
            else {
                next();
            }
        };
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }
    applyRoutes(application) {
        //Configurações das rotas transferidas para => "./common/model-router.ts"
        application.get(`${this.basePath}`, [(0, authz_handler_1.authorize)('admin'), this.findAll]);
        application.get(`${this.basePath}/:id`, [(0, authz_handler_1.authorize)('admin'), this.validateId, this.findById]);
        application.post(`${this.basePath}`, [this.save]);
        application.put(`${this.basePath}/:id`, [(0, authz_handler_1.authorize)('admin'), this.validateId, this.replace]);
        application.patch(`${this.basePath}/:id`, [(0, authz_handler_1.authorize)('admin'), this.validateId, this.update]);
        application.del(`${this.basePath}/:id`, [(0, authz_handler_1.authorize)('admin'), this.validateId, this.delete]);
        application.post(`${this.basePath}/login`, auth_handler_1.authenticate);
    }
}
exports.usersRouter = new UsersRouter();
