"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
class Server {
    constructor(options) {
        this.app = (0, express_1.default)();
        this.server = http_1.default.createServer(this.app);
        this.port = options.port;
        this.router = options.router;
    }
}
exports.Server = Server;
