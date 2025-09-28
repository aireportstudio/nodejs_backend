import app from './app';
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import { createKeepAlive } from "./keepAlive";

dotenv.config();
const PORT = process.env.PORT || 4000;

// Initialize keepalive utility
const keepAlive = createKeepAlive({
  healthUrl: `${process.env.SERVER_URL}/health`,
  idleMinutes: 14,
  checkEveryMinutes: 1,
});

// Middleware: track user activity
app.use((req: Request, res: Response, next: NextFunction) => {
  keepAlive.recordActivity();
  next();
});

// Health route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));