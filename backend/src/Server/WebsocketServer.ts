import * as WebSocket from 'ws';
import * as http from 'http';
import {ExtendedWebSocket, Response} from "../Entity/ExtendedWebSocket";
import UserEntity from "../Entity/User";

export default class WebsocketServer {
    server: WebSocket.Server;
    private onMessageListeners: ((client: ExtendedWebSocket, payload: string) => void)[] = [];

    constructor(httpServer?: http.Server) {
        const config = httpServer ? {server: httpServer} : {noServer: true};
        this.server = new WebSocket.Server(config);

        this.server.on('connection', (client: ExtendedWebSocket) => {
            client.on('message', (payload: string) => {
                this.onMessageListeners.forEach(callback => callback(client, payload));
            });
        });

        return;
    }

    addOnMessageListener(callback: (client: ExtendedWebSocket, payload: string) => void): void {
        this.onMessageListeners.push(callback);
    }

    sendMessage(client: ExtendedWebSocket, message: Response): void {
        client.send(JSON.stringify(message));
    }

    broadcastMessage(message: Response): void {
        this.server.clients.forEach(client => this.sendMessage(client, message));
    }

    sendToUser(user: UserEntity, message: Response): void {
        this.server.clients.forEach((client: ExtendedWebSocket) => {
            if (client.user && client.user.name == user.name) {
                this.sendMessage(client, message);
            }
        });
    }
}
