import { Request, Response, NextFunction } from "express";
import { invalidToken, tokenExpired, unauthorized } from "../utils/response";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return unauthorized(res, "Authorization header missing");

    const token = authHeader.split(" ")[1]; // Bearer <token>
    if (!token) return unauthorized(res, "Token missing");

    const decoded = verifyToken(token);
    if (!decoded) return invalidToken(res);

    (req as any).user = decoded; // attach decoded payload to req.user
    next();
};
