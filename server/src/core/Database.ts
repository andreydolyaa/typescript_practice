import mongoose from "mongoose";
import logger from "./Logger";
import { sleep } from "../utils";

export class Database {
  readonly RECONNECT_INTERVAL: number = 1000;
  readonly CONNECTION_TIMEOUT: number = 3000;
  private uri: string;

  constructor(uri: string) {
    this.uri = uri;

    this.setupListeners();
  }

  async connect(): Promise<void> {
    logger.warn("db | trying to connect...");
    try {
      await mongoose.connect(this.uri, {
        serverSelectionTimeoutMS: this.CONNECTION_TIMEOUT,
      });
    } catch (error) {}
  }

  async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
    } catch (error) {
      logger.error(`db | error disconnecting [error ${error}]`);
    }
  }

  async reconnect() {
    await sleep(this.RECONNECT_INTERVAL);
    await this.connect();
  }

  setupListeners() {
    mongoose.connection.on("connected", () => {
      logger.info("db | connection established");
    });
    mongoose.connection.on("disconnected", () => {
      logger.warn("db | disconnected");
      this.reconnect();
    });
    mongoose.connection.on("close", () => {
      logger.info("db | connection closed");
    });
    mongoose.connection.on("error", (error) => {
      logger.error(`db | connection error [error: ${error}]`);
    });
  }
}
