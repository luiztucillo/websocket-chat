import * as WebSocket from "ws";
import UserEntity from "./User";

export type Response = {
  user: UserEntity,
  message: string
};

export class ExtendedWebSocket extends WebSocket {
  user?: UserEntity;
}
