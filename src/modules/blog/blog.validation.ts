import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  image: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const updateBlogSchema = z.object({
  id: z.number(),
  title: z.string().min(3).optional(),
  slug: z.string().min(3).optional(),
  content: z.string().min(10).optional(),
  image: z.string().optional(),
  isActive: z.boolean().optional(),
});
