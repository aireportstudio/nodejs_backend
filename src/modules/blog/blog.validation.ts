import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  image: z.string().optional(),
  author: z.string().optional(),
  category: z.string().optional(),
  publishedDate: z.string().optional(), // will convert to Date in service
  readTime: z.coerce.number().optional(),
  featured: z.union([z.string(), z.boolean()]).transform((val) => val === "true" || val === true).optional(),
  isActive: z.union([z.string(), z.boolean()])
    .transform((val) => val === "true" || val === true)
    .optional(),
  tags: z
    .union([z.string(), z.array(z.string())])
    .transform((val) => {
      if (typeof val === "string") {
        try {
          return JSON.parse(val); // parse '[ "tag1", "tag2" ]'
        } catch {
          return [val]; // fallback single tag
        }
      }
      return val;
    })
    .optional(),

seo: z
  .union([
    z.string(),
    z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    }),
  ])
  .transform((val) => {
    if (typeof val === "string") {
      try {
        return JSON.parse(val);
      } catch {
        return undefined; // or throw new Error("Invalid JSON")
      }
    }
    return val;
  })
  .optional(),

  faqs: z
    .union([z.string(), z.array(z.object({
      question: z.string(),
      answer: z.string(),
    }))])
    .transform((val) => {
      if (typeof val === "string") return JSON.parse(val);
      return val;
    })
    .optional(),
});

export const updateBlogSchema = createBlogSchema.extend({
  id: z.coerce.number(),
});
