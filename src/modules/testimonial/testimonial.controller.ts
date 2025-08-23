import { Request, Response } from "express";
import * as testimonialService from "./testimonial.service";
import { ok, created, badRequest } from "../../utils/response";
import redis from "../../config/redis";

export const createTestimonialController = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = req.file.filename;
    const testimonial = await testimonialService.createTestimonial(data);

    // Invalidate cache after creating
    await redis.del("testimonials:admin");
    await redis.del("testimonials:frontend");

    return created(res, testimonial, "Testimonial created successfully");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

export const updateTestimonialController = async (req: Request, res: Response) => {
  const id = Number(req.body.id);
  if (!id) return badRequest(res, "Testimonial ID is required");
  try {
    const data = { ...req.body };
    if (req.file) data.image = req.file.filename;
    const testimonial = await testimonialService.updateTestimonial(id, data);

    // Invalidate cache
    await redis.del("testimonials:admin");
    await redis.del("testimonials:frontend");

    return ok(res, testimonial, "Testimonial updated successfully");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

export const deleteTestimonialController = async (req: Request, res: Response) => {
  const id = Number(req.body.id);
  if (!id) return badRequest(res, "Testimonial ID is required");
  try {
    const testimonial = await testimonialService.deleteTestimonial(id);

    // Invalidate cache
    await redis.del("testimonials:admin");
    await redis.del("testimonials:frontend");

    return ok(res, testimonial, "Testimonial deleted successfully");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

export const getAllTestimonialsController = async (req: Request, res: Response) => {
  try {
    // Check cache first
    const cache: any = await redis.get("testimonials:admin");
    if (cache) {
      return ok(res, JSON.parse(cache), "Testimonials fetched from cache");
    }

    // If not in cache → fetch from DB
    const testimonials = await testimonialService.getAllTestimonials();

    // Store in cache for configured TTL
    await redis.set("testimonials:admin", JSON.stringify(testimonials), {
      ex: Number(process.env.UPSTASH_TTL),
    });

    return ok(res, testimonials, "Testimonials fetched from DB");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

export const getAllTestimonialsFrontendController = async (req: Request, res: Response) => {
  try {
    const cache: any = await redis.get("testimonials:frontend");
    if (cache) {
      return ok(res, JSON.parse(cache), "Frontend testimonials fetched from cache");
    }

    const testimonials = await testimonialService.getAllTestimonialsForFrontend();

    await redis.set("testimonials:frontend", JSON.stringify(testimonials), {
      ex: Number(process.env.UPSTASH_TTL),
    });

    return ok(res, testimonials, "Frontend testimonials fetched from DB");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};