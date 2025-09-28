import jwt from "jsonwebtoken";

const APP_JWT_SECRET = process.env.APP_JWT_SECRET as string;

if (!APP_JWT_SECRET) {
  throw new Error("APP_JWT_SECRET is not defined in environment variables");
}

// Helper to verify token and return payload
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, APP_JWT_SECRET);
  } catch (err) {
    return null;
  }
};

// Express middleware for protected routes
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Expect "Bearer <token>"
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }

  (req as any).user = decoded; // attach decoded user payload
  next();
};
