import { z } from "zod";

export const createDemoVideoSchema = z.object({
  title: z.string().min(2, "Title is required"),
  file: z.string().optional(), // file path is optional, multer handles it
  isActive: z.boolean().optional(),
});

export const updateDemoVideoSchema = z.object({
  id: z.number(),
  title: z.string().min(2).optional(),
  file: z.string().optional(),
  isActive: z.boolean().optional(),
});
