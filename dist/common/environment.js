"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
exports.environment = {
    server: { port: process.env.PORT || 3000 },
    db: { url: process.env.DB_URL || 'mongodb://lucassilvamongo:1222lucassilva@cluster0-shard-00-00.eede2.mongodb.net:27017,cluster0-shard-00-01.eede2.mongodb.net:27017,cluster0-shard-00-02.eede2.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-jnftt5-shard-0&authSource=admin&retryWrites=true&w=majority' },
    security: {
        saltRounds: process.env.SALT_ROUNDS || 10,
        apiSecret: process.env.API_SECERT || 'meat-api-secret'
    }
};
