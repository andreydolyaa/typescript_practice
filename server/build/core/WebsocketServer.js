"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketServer = void 0;
const ws_1 = require("ws");
// interface HttpServer {
//   httpServer: http.Server;
// }
class WebsocketServer {
    constructor(httpServer) {
        this.server = new ws_1.WebSocketServer({ server: httpServer });
        this.clients = {};
    }
    init() {
        this.server.on("connection", (websocket, request) => {
        });
    }
    handleNewConnection() { }
}
exports.WebsocketServer = WebsocketServer;
