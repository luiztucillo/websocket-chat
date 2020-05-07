import * as express from 'express';
import * as http from 'http'

export default class HttpServer {
    server: http.Server;

    constructor() {
        this.server = this.startHttpServer();
    }

    startHttpServer(): http.Server {
        const app = express();
        const httpServer = http.createServer(app);
        httpServer.listen(process.env.PORT || 8080);
        return httpServer;
    }
}
