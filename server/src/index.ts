import { Server } from "./core/Server";
import router from "./router";

const server = new Server({
  port: 3000,
  router,
});

server.run();
