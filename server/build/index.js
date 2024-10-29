"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./core/Server");
const router_1 = __importDefault(require("./router"));
const server = new Server_1.Server({
    port: 3000,
    router: router_1.default,
});
server.run();
