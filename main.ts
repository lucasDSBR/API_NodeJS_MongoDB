import { Server } from './Server/Server';
import { usersRouter } from './users/users.router';
import { listsRouter } from './lists/lists.router';
const server = new Server();

server.bootstrap([usersRouter, listsRouter]).then(server => {
    console.log("Server is listening on:", server.application.address())
}).catch(error =>{
    console.log('Server failed to start:', error)
    console.log(error)
    process.exit(1)
})
