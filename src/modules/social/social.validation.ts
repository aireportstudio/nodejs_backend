import { z } from "zod";

export const createSocialSchema = z.object({
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  youtube: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  address: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const updateSocialSchema = z.object({
  id: z.number(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  email: z.string().email().optional(),
  youtube: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  address: z.string().optional(),
  isActive: z.boolean().optional(),
});
