import { Request, Response, NextFunction } from "express";
import { ResponseError } from "../error/response-error";

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  if (err instanceof ResponseError) {
    res.status(err.status).json({
      status: "error",
      message: err.message
    });
    return;
  }

  res.status(500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
}