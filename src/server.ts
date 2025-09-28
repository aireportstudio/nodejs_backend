import app from './app';
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import { createKeepAlive } from "./keepAlive";

dotenv.config();
const PORT = process.env.PORT || 4000;

createKeepAlive({
  healthUrl: `${process.env.SERVER_URL}/health`,
  pingIntervalMinutes: 10, // ping every 5 minutes
});

// Health route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));