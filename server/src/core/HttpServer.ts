import http from "http";
import express, { Express, Router } from "express";
import cors from "cors";
import logger from "./Logger";
import { httpLoggerMiddleware } from "../middleware/httpLogger";
import { WebsocketServer } from "./WebsocketServer";

type ServerConfig = {
  port: number;
  router: Router;
};

export class HttpServer implements ServerConfig {
  app: Express;
  httpServer: http.Server;
  port: ServerConfig["port"];
  router: ServerConfig["router"];
  websocketServer: WebsocketServer | null;

  constructor(options: ServerConfig) {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.port = options.port;
    this.router = options.router;
    this.websocketServer = null;

    this._init();
  }

  private _init() {
    this.app.use(express.json());
    this.app.use(this.router);
    this.app.use(cors());
    this.app.use(httpLoggerMiddleware);
  }

  async run() {
    this.httpServer.listen(this.port, () => {
      logger.info(`http server started [${this.port}]`);
      try {
        this.websocketServer = new WebsocketServer(this.httpServer);
        logger.info(`websocket server initialized`);
      } catch (error) {
        logger.error(`failed to initialize websocket server: [${error}]`);
        this.shutdown();
      }
    });
    this.httpServer.on("error", (error) => {
      logger.error(`http server error: [${error}]`);
      this.shutdown();
    });
  }

  shutdown() {
    logger.info("shutting down server...");
    if (this.websocketServer) {
      this.websocketServer.server.close(() =>
        logger.info("websocket server closed")
      );
    }
    this.httpServer.close(() => {
      logger.info("http server closed");
      process.exit(1);
    });
  }
}

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection:", reason);
  process.exit(1);
});
