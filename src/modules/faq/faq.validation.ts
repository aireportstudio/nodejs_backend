import { z } from "zod";

export const createFAQSchema = z.object({
  question: z.string().min(5, "Question is required"),
  answer: z.string().min(5, "Answer is required"),
  isActive: z.boolean().optional(),
});

export const updateFAQSchema = z.object({
  id: z.number(),
  question: z.string().min(5).optional(),
  answer: z.string().min(5).optional(),
  isActive: z.boolean().optional(),
});
