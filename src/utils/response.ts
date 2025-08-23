import { Response } from "express";

// 2xx Success
export const ok = (res: Response, data: unknown, message = "OK") =>
    res.status(200).json({ success: true, message, data });

export const created = (res: Response, data: unknown, message = "Created") =>
    res.status(201).json({ success: true, message, data });

export const accepted = (res: Response, data: unknown, message = "Accepted") =>
    res.status(202).json({ success: true, message, data });

export const noContent = (res: Response, message = "No Content") =>
    res.status(204).json({ success: true, message });

// 3xx Redirection
export const movedPermanently = (res: Response, location: string) =>
    res.status(301).json({ success: true, message: "Moved Permanently", location });

export const found = (res: Response, location: string) =>
    res.status(302).json({ success: true, message: "Found", location });

export const notModified = (res: Response, message = "Not Modified") =>
    res.status(304).json({ success: true, message });

// 4xx Client Errors
export const badRequest = (res: Response, message = "Bad Request") =>
    res.status(400).json({ success: false, message });

// Auth / JWT responses
export const unauthorized = (res: Response, message = "Unauthorized") =>
    res.status(401).json({ success: false, message });

export const tokenExpired = (res: Response, message = "Token Expired") =>
    res.status(401).json({ success: false, message });

export const invalidToken = (res: Response, message = "Invalid Token") =>
    res.status(401).json({ success: false, message });

export const forbidden = (res: Response, message = "Forbidden") =>
    res.status(403).json({ success: false, message });

export const notFound = (res: Response, message = "Not Found") =>
    res.status(404).json({ success: false, message });

export const conflict = (res: Response, message = "Conflict") =>
    res.status(409).json({ success: false, message });

export const gone = (res: Response, message = "Gone") =>
    res.status(410).json({ success: false, message });

export const unprocessableEntity = (res: Response, message = "Unprocessable Entity") =>
    res.status(422).json({ success: false, message });

// 5xx Server Errors
export const serverError = (
    res: Response,
    message = "Internal Server Error",
    code = 500
) => res.status(code).json({ success: false, message });

export const notImplemented = (res: Response, message = "Not Implemented") =>
    res.status(501).json({ success: false, message });

export const badGateway = (res: Response, message = "Bad Gateway") =>
    res.status(502).json({ success: false, message });

export const serviceUnavailable = (res: Response, message = "Service Unavailable") =>
    res.status(503).json({ success: false, message });
