import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000"; // URL de tu NestJS backend

export const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: true,
});