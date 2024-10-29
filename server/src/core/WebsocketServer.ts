import http from "http";
import { WebSocketServer, WebSocket } from "ws";

// interface HttpServer {
//   httpServer: http.Server;
// }

export class WebsocketServer {
  server: WebSocketServer;
  clients: { [key: string]: WebSocket };

  constructor(httpServer: http.Server) {
    this.server = new WebSocketServer({ server: httpServer });
    this.clients = {};
  }

  init() {
    this.server.on("connection", (websocket, request) => {
      
    })
  }

  handleNewConnection() {}
}
