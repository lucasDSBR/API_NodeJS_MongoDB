"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const restify_errors_1 = require("restify-errors");
const authorize = (...profiles) => {
    return (req, resp, next) => {
        console.log(req.authenticated.profiles);
        if (req.authenticated !== undefined && req.authenticated.profiles[0] === profiles[0]) {
            next();
        }
        else {
            console.log(req.authenticated);
            next(new restify_errors_1.ForbiddenError('Permission denied'));
        }
    };
};
exports.authorize = authorize;
