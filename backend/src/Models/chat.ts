import UserEntity from "../Entity/User";
import * as WebSocket from "ws";
import WebsocketServer from "../Server/WebsocketServer";
import {ExtendedWebSocket, Response} from "../Entity/ExtendedWebSocket";
import User from "../Entity/User";

export default class Chat {
    readonly server: WebsocketServer;
    readonly messages: Response[] = [];

    constructor(server: WebsocketServer) {
        this.server = server;
        this.server.addOnMessageListener(this.onMessage);
    }

    onMessage = (ws: ExtendedWebSocket, payload: string) => {
        const data = JSON.parse(payload);

        if (!ws.user) {
            return this.login(ws, data);
        }

        const response = {
            user: ws.user!,
            message: data.message
        };

        this.messages.push(response);

        this.server.broadcastMessage(response);
    }

    login = (ws: ExtendedWebSocket, data: {name: string}): void => {
        const user = new UserEntity(data.name);
        ws.user = user;
        this.server.sendMessage(ws, {
            user: user,
            message: `Bem vindo ${user.name}`
        });
    }
}
