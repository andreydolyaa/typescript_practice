import http from "http";
import { Request } from "express";
import { WebSocketServer, WebSocket } from "ws";
import logger from "./Logger";

export class WebsocketServer {
  server: WebSocketServer;
  subscribers: { [key: string]: WebSocket };

  constructor(httpServer: http.Server) {
    this.server = new WebSocketServer({ server: httpServer });
    this.subscribers = {};

    this.init();
  }

  init() {
    this.server.on("connection", (websocket, req: Request) => {
      const subscriber = this._generateSubscriberId(req);
      logger.info(`ws | new client connected [${subscriber}]`);
      this._handleNewConnection(websocket, subscriber);
    });
  }

  _handleNewConnection(websocket: WebSocket, subscriber: string) {
    this.subscribers[subscriber] = websocket;
    logger.info(`ws | new client subscription [${subscriber}]`);
  }

  _attachListeners(websocket: WebSocket, subscriber: string) {
    websocket.on("message", this._handleIncomingMessage);
    websocket.on("error", this._handleError);
    websocket.on("close", () => this._handleDisconnection(subscriber));
  }

  _handleIncomingMessage(message: string) {
    logger.info(`ws | new message received: ${message}`);
  }

  _handleError(error: Error) {
    logger.error(`ws | error occurred: ${error}`);
  }

  _handleDisconnection(subscriber: string) {
    delete this.subscribers[subscriber];
    logger.info(`ws | client unsubscribed [${subscriber}]`);
  }

  _generateSubscriberId(req: Request): string {
    const url = new URL(req.url, `http://${req.headers.host}`);
    return url.pathname.split("/").pop() || "default";
  }

  send(message: string | object, subscriber: string) {
    if (this.subscribers[subscriber]) {
      try {
        this.subscribers[subscriber].send(JSON.stringify(message));
        logger.info(`ws | message sent to: ${subscriber}`);
      } catch (error) {
        logger.error(`ws | send failed: ${subscriber} [${error}]`);
      }
    }
  }
}
