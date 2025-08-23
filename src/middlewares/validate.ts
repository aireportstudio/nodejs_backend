// src/middlewares/validate.ts
import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodRawShape, ZodError } from "zod";
import { badRequest } from "../utils/response";

/**
 * Middleware to validate request body, query, or params
 * @param schema - ZodObject schema
 * @param property - "body" | "query" | "params"
 */
export const validate = (
  schema: ZodObject<ZodRawShape>,
  property: "body" | "query" | "params" = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[property]); // Validate the requested property
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        // explicitly cast err to ZodError<unknown> to satisfy TS
        const zodErr = err as ZodError<unknown>;
        const errors = zodErr.issues.map(e => ({
          path: e.path.join("."),
          message: e.message,
        }));
        return badRequest(
          res,
          `Validation failed: ${errors.map(e => e.message).join(", ")}`
        );
      }
      return badRequest(res, "Invalid request");
    }
  };
};
