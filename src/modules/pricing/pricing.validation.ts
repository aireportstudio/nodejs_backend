import { z } from "zod";

export const createPricingSchema = z.object({
  planType: z.string().min(2, "Plan type is required"),
  icon: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  tagline: z.string().min(2, "Tagline is required"),
  description: z.string().min(5, "Description is required"),
  isActive: z.boolean().optional(),
});

export const updatePricingSchema = z.object({
  id: z.number(),
  planType: z.string().min(2).optional(),
  icon: z.string().optional(),
  price: z.number().min(0).optional(),
  tagline: z.string().min(2).optional(),
  description: z.string().min(5).optional(),
  isActive: z.boolean().optional(),
});
