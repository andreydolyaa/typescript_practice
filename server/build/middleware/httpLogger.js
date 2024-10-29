"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpLoggerMiddleware = void 0;
const Logger_1 = __importDefault(require("../core/Logger"));
const httpLoggerMiddleware = (req, res, next) => {
    const { method, originalUrl, headers } = req;
    res.on("finish", () => {
        const { statusCode } = res;
        Logger_1.default.info(`HTTP | Incoming [${method}] Request; Status: [${statusCode}]; To Path: [${originalUrl}]; Payload: ${JSON.stringify((req === null || req === void 0 ? void 0 : req.body) || "None")} Headers: ${JSON.stringify(headers)}`);
    });
    next();
};
exports.httpLoggerMiddleware = httpLoggerMiddleware;
