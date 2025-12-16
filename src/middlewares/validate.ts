import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      console.log("Validation Error:", err.errors);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: err.errors,
      });
    }
  };
