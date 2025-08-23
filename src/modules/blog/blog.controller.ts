import { Request, Response } from "express";
import * as blogService from "./blog.service";
import { ok, created, badRequest } from "../../utils/response";
import redis from "../../config/redis";

// Admin + public create

export const createBlogController = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = req.file.filename;
    const blog = await blogService.createBlog(data);

    // Invalidate cache after creating
    await redis.del("blogs:admin");
    await redis.del("blogs:frontend");

    return created(res, blog, "Blog created successfully");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

export const updateBlogController = async (req: Request, res: Response) => {
  const id = Number(req.body.id);
  if (!id) return badRequest(res, "Blog ID is required");
  try {
    const data = { ...req.body };
    if (req.file) data.image = req.file.filename;
    const blog = await blogService.updateBlog(id, data);

    // Invalidate cache
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
    const blog = await blogService.deleteBlog(id);

    // Invalidate cache
    await redis.del("blogs:admin");
    await redis.del("blogs:frontend");

    return ok(res, blog, "Blog deleted successfully");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

// Admin list all blogs

export const getAllBlogsController = async (req: Request, res: Response) => {
  try {
    // Check cache first
    const cache:any = await redis.get("blogs:admin");
    if (cache) {
      return ok(res, JSON.parse(cache), "Blogs fetched from cache");
    }

    // If not in cache → fetch from DB
    const blogs = await blogService.getAllBlogs();

    // Store in cache for 5 minutes
    await redis.set("blogs:admin", JSON.stringify(blogs), { ex: Number(process.env.UPSTASH_TTL) });

    return ok(res, blogs, "Blogs fetched from DB");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

// Public list active blogs

export const getAllBlogsFrontendController = async (req: Request, res: Response) => {
  try {
    const cache:any = await redis.get("blogs:frontend");
    if (cache) {
      return ok(res, JSON.parse(cache), "Frontend blogs fetched from cache");
    }

    const blogs = await blogService.getAllBlogsForFrontend();

    await redis.set("blogs:frontend", JSON.stringify(blogs), { ex: Number(process.env.UPSTASH_TTL) });

    return ok(res, blogs, "Frontend blogs fetched from DB");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};