import { Request, Response, NextFunction } from "express";
import logger from "../core/Logger";

export const httpLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, originalUrl, headers } = req;

  res.on("finish", () => {
    const { statusCode } = res;
    logger.info(
      `HTTP | Incoming [${method}] Request; Status: [${statusCode}]; To Path: [${originalUrl}]; Payload: ${JSON.stringify(
        req?.body || "None"
      )} Headers: ${JSON.stringify(headers)}`
    );
  });

  next();
};
