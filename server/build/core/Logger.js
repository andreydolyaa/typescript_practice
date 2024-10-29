"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, printf, colorize } = winston_1.format;
const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6,
    },
    colors: {
        error: "red",
        warn: "yellow",
        info: "green",
        http: "magenta",
        verbose: "cyan",
        debug: "blue",
        silly: "gray",
    },
};
(0, winston_1.addColors)(customLevels.colors);
const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});
const logger = (0, winston_1.createLogger)({
    levels: customLevels.levels,
    format: combine(timestamp({ format: "DD-MM-YY HH:mm:ss" }), colorize({ all: true }), myFormat),
    transports: [
        new winston_1.transports.Console(),
        // new transports.File({
        //   filename: "logs/app.log",
        //   format: combine(timestamp({ format: "DD-MM-YY HH:mm:ss" }), myFormat),
        // }),
    ],
});
exports.default = logger;
