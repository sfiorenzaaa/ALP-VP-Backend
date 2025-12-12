import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt-util";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "Missing token" });

  const token = header.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded as any;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
