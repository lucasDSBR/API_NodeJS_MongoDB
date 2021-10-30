"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./server/Server");
const users_router_1 = require("./users/users.router");
const lists_router_1 = require("./lists/lists.router");
const server = new Server_1.Server();
server.bootstrap([users_router_1.usersRouter, lists_router_1.listsRouter]).then(server => {
    console.log("Server is listening on:", server.application.address());
}).catch(error => {
    console.log('Server failed to start:', error);
    console.log(error);
    process.exit(1);
});
