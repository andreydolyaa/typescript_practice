import http from "http";
import express, { Express, Router } from "express";
import cors from "cors";
import { httpLoggerMiddleware } from "../middleware/httpLogger";
import logger from "./Logger";

interface ServerOptions {
  port: number;
  router: Router;
}

export class Server {
  app: Express;
  server: http.Server;
  router: Router;
  port: number;

  constructor(options: ServerOptions) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.port = options.port;
    this.router = options.router;

    this.init();
  }

  init() {
    this.app.use(express.json());
    this.app.use(this.router);
    this.app.use(cors());
    this.app.use(httpLoggerMiddleware);
  }

  run() {
    this.server.listen(this.port, () => {
      logger.info(`server started [${this.port}]`);
    });
    this.server.on("error", (error) => {
      logger.error(`server error: [${error}]`);
    });
  }
}
