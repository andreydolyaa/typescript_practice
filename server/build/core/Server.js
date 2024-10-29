"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const httpLogger_1 = require("../middleware/httpLogger");
const Logger_1 = __importDefault(require("./Logger"));
class Server {
    constructor(options) {
        this.app = (0, express_1.default)();
        this.server = http_1.default.createServer(this.app);
        this.port = options.port;
        this.router = options.router;
        this.init();
    }
    init() {
        this.app.use(express_1.default.json());
        this.app.use(this.router);
        this.app.use((0, cors_1.default)());
        this.app.use(httpLogger_1.httpLoggerMiddleware);
    }
    run() {
        this.server.listen(this.port, () => {
            Logger_1.default.info(`server started [${this.port}]`);
        });
        this.server.on("error", (error) => {
            Logger_1.default.error(`server error: [${error}]`);
        });
    }
}
exports.Server = Server;
