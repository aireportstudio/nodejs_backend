import { Request, Response } from "express";
import * as blogService from "./blog.service";
import { ok, created, badRequest } from "../../utils/response";
import redis from "../../config/redis";
import { deleteFileFromTebi, uploadFileToTebi } from "../../config/tebiService";

// -------- controllers --------

// Create blog
export const createBlogController = async (req: Request, res: Response) => {
  try {
    const data: any = { ...req.body };

    // Upload thumbnail (if provided)
    if (req.file) {
      const imageUrl = await uploadFileToTebi(req.file.originalname, req.file.buffer);
      data.image = imageUrl;
    }

    const blog = await blogService.createBlog(data);

    await redis.del("blogs:admin");
    await redis.del("blogs:frontend");

    return created(res, blog, "Blog created successfully");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

// Update blog
export const updateBlogController = async (req: Request, res: Response) => {
  const id = Number(req.body.id);
  if (!id) return badRequest(res, "Blog ID is required");

  try {
    const data: any = { ...req.body };
    delete data.id;

    // Fix booleans
    if (typeof data.isActive === "string") data.isActive = data.isActive === "true";
    if (typeof data.featured === "string") data.featured = data.featured === "true";

    delete data.createdAt;
    delete data.updatedAt;

    const existingBlog = await blogService.getBlogById(id);
    if (!existingBlog) return badRequest(res, "Blog not found");

    if (req.file) {
      if (existingBlog.image) await deleteFileFromTebi(existingBlog.image);
      const imageUrl = await uploadFileToTebi(req.file.originalname, req.file.buffer);
      data.image = imageUrl;
    }

    const blog = await blogService.updateBlog(id, data);

    await redis.del("blogs:admin");
    await redis.del("blogs:frontend");

    return ok(res, blog, "Blog updated successfully");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

// Delete blog
export const deleteBlogController = async (req: Request, res: Response) => {
  const id = Number(req.body.id);
  if (!id) return badRequest(res, "Blog ID is required");

  try {
    const existingBlog = await blogService.getBlogById(id);
    if (!existingBlog) return badRequest(res, "Blog not found");

    if (existingBlog.image) await deleteFileFromTebi(existingBlog.image);

    const blog = await blogService.deleteBlog(id);

    await redis.del("blogs:admin");
    await redis.del("blogs:frontend");

    return ok(res, blog, "Blog deleted successfully");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

// Admin list
export const getAllBlogsController = async (req: Request, res: Response) => {
  try {
    // 1. Fetch from Redis
    const cache: any = await redis.get("blogs:admin");

    if (cache) {
      let data;
      try {
        // Only parse if it's a string
        data = typeof cache === "string" ? JSON.parse(cache) : cache;
      } catch (parseError) {
        console.error("Redis cache parse error:", parseError);
        data = cache; // fallback to raw value
      }
      return ok(res, data, "Blogs fetched from cache");
    }

    // 2. Fetch from DB if cache is empty
    const blogs = await blogService.getAllBlogs();

    // 3. Store in Redis safely as string
    await redis.set("blogs:admin", JSON.stringify(blogs), {
      ex: Number(process.env.UPSTASH_TTL) || 3600, // default 1 hour TTL
    });

    return ok(res, blogs, "Blogs fetched from DB");
  } catch (err: any) {
    console.error("getAllBlogsController error:", err);
    return badRequest(res, err.message || "Something went wrong");
  }
};

// Public list
export const getAllBlogsFrontendController = async (req: Request, res: Response) => {
  try {
    const cache: any = await redis.get("blogs:frontend");
    if (cache) return ok(res, JSON.parse(cache), "Frontend blogs fetched from cache");

    const blogs = await blogService.getAllBlogsForFrontend();
    await redis.set("blogs:frontend", JSON.stringify(blogs), {
      ex: Number(process.env.UPSTASH_TTL),
    });

    return ok(res, blogs, "Frontend blogs fetched from DB");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};
