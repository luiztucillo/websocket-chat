import HttpServer from "./Server/HttpServer";
import WebsocketServer from "./Server/WebsocketServer";
import Chat from './Models/chat'
const httpServer: HttpServer = new HttpServer();
const websocketServer: WebsocketServer = new WebsocketServer(httpServer.server);
const chat: Chat = new Chat(websocketServer);

// websocketServer.server.on('connection', (ws: WebSocket) => {
//     let user: UserEntity;
//     ws.on('message', (payload: string) => {
//         const data = JSON.parse(payload);
//
//         if (!user) {
//             user = new UserEntity(data.name);
//             ws.send(JSON.stringify({user: {name: 'Admin'}, message: `Bem vindo ${user.name}`}));
//         } else {
//             websocketServer.server.clients.forEach((client: WebSocket) => {
//                 client.send(JSON.stringify({user: user, message: `${data.message}`}));
//             });
//         }
//     });
// });

/*
httpServer.server.on('upgrade', (request: any, socket: any, head:any) => {
    const user = new UserEntity('Luiz');
    websocketServer.server.handleUpgrade(request, socket, head, (ws) => {
        websocketServer.server.emit('connection', ws, request, user);
    });
});
*/