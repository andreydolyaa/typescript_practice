import { HttpServer } from "./core/HttpServer";
import router from "./router";

const server = new HttpServer({
  port: 3000,
  router,
});

server.run();
