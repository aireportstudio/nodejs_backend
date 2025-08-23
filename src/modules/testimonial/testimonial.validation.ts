import { z } from "zod";

export const createTestimonialSchema = z.object({
    starRating: z.number().min(1).max(5, "Star rating must be 1 to 5"),
    review: z.string().min(5, "Review must be at least 5 characters"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    education: z.string().min(2),
    university: z.string().min(2),
    image: z.string().optional(),
    isActive: z.boolean().optional(),
});

export const updateTestimonialSchema = z.object({
    id: z.number(),
    starRating: z.number().min(1).max(5).optional(),
    review: z.string().min(5).optional(),
    name: z.string().min(2).optional(),
    education: z.string().min(2).optional(),
    university: z.string().min(2).optional(),
    image: z.string().optional(),
    isActive: z.boolean().optional(),
});
