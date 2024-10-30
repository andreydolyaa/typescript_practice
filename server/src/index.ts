import dotenv from "dotenv";
import { HttpServer } from "./core/HttpServer";
import router from "./router";
import { Database } from "./core/Database";
import logger from "./core/Logger";

dotenv.config();

const server = new HttpServer({
  port: Number(process.env.SERVER_PORT),
  router,
});

const database = new Database(process.env.DB_URL as string);

server.run().then(async () => {
  await database.connect();
});

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.error(`Unhandled Rejection: ${reason}`);
  process.exit(1);
});

process.on("SIGINT", async () => {
  await database.disconnect();
  process.exit(0);
});