import * as restify from 'restify';
import { environment } from '../common/environment';
import { Router } from '../common/router';
import * as mongoose from 'mongoose';
import { mergePatchBodyParser } from './merge-patch.parser';
import { handlerError } from './error.handler';
import { tokenParser } from '../Security/token.parser';
import * as corsMiddleware from 'restify-cors-middleware';

export class Server {

    application: restify.Server;
    initializeDb(): mongoose.MongooseThenable {
        (<any>mongoose).Promise = global.Promise
        return mongoose.connect(environment.db.url, {
            useMongoClient: true
        })
    }
    initRoutes(routers: Router[]): Promise<any>{
        return new Promise((resolve, reject) =>{
            try{
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0',

                })

                const corsOptions: corsMiddleware.Options = {
                    preflightMaxAge: 10,
                    origins: ['*'], //origem da requisição exemplo: http://localhost:02320
                    allowHeaders: ['authorization'],
                    exposeHeaders: ['x-custom-header']
                }
                const cors: corsMiddleware.CorsMiddleware = corsMiddleware(corsOptions)

                this.application.pre(cors.preflight)
                //Plugins
                this.application.use(cors.actual)
                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser())
                this.application.use(mergePatchBodyParser)
                this.application.use(tokenParser)
                //routes
                for(let router of routers){
                    router.applyRoutes(this.application)
                }
                this.application.get('/info', [
                    (req, resp, next) => {
                        if(req.userAgent() && req.userAgent().includes('MSIE 7.0')){
                            let error: any = new Error()
                            error.statusCode = 400
                            error.message = "Please, update your browser"
                            return next(error)
                        }
                        return next()
                    },(req, resp, next) => {
                        resp.json({
                            browser: req.userAgent(),
                            method: req.method,
                            url: req.href(),
                            path: req.path(),
                            query: req.query
                        })
                        return next()
                    }
                ])

                this.application.listen(environment.server.port, ()=>{
                    resolve(this.application)
                })
                //Utilizado para o tratamento de erros no sistema
                this.application.on('restifyError', handlerError)

            }catch(error){
                reject(error)
            }
        })
    }

    bootstrap(routers: Router[] = []): Promise<Server>{
        return this.initializeDb().then(()=>
               this.initRoutes(routers).then(()=> this))
    }
}