import { Request, Response, NextFunction } from "express";
import { UserJWTPayload } from "models/user-model";

export type AuthenticatedRequest = Request & {
    user?: UserJWTPayload;
}

export const adminMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user){
        return res.status(401).json({ message: "Unauthorized"});
    }

    if (req.user.role !== "ADMIN"){
        return res.status(403).json({ message : "Forbidden: Admin Access Only"});
    }
    next();
};