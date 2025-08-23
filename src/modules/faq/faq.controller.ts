import { Request, Response } from "express";
import * as faqService from "./faq.service";
import { ok, created, badRequest } from "../../utils/response";
import redis from "../../config/redis";

// Create FAQ
export const createFAQController = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body };
    const faq = await faqService.createFAQ(data);

    // Invalidate cache after creating
    await redis.del("faqs:admin");
    await redis.del("faqs:frontend");

    return created(res, faq, "FAQ created successfully");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

// Update FAQ
export const updateFAQController = async (req: Request, res: Response) => {
  const id = Number(req.body.id);
  if (!id) return badRequest(res, "FAQ ID is required");
  try {
    const data = { ...req.body };
    const faq = await faqService.updateFAQ(id, data);

    // Invalidate cache
    await redis.del("faqs:admin");
    await redis.del("faqs:frontend");

    return ok(res, faq, "FAQ updated successfully");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

// Delete FAQ
export const deleteFAQController = async (req: Request, res: Response) => {
  const id = Number(req.body.id);
  if (!id) return badRequest(res, "FAQ ID is required");
  try {
    const faq = await faqService.deleteFAQ(id);

    // Invalidate cache
    await redis.del("faqs:admin");
    await redis.del("faqs:frontend");

    return ok(res, faq, "FAQ deleted successfully");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

// Admin list all FAQs
export const getAllFAQsController = async (_req: Request, res: Response) => {
  try {
    // Check cache first
    const cache: any = await redis.get("faqs:admin");
    if (cache) {
      return ok(res, JSON.parse(cache), "FAQs fetched from cache");
    }

    // If not in cache → fetch from DB
    const faqs = await faqService.getAllFAQs();

    // Store in cache for TTL
    await redis.set("faqs:admin", JSON.stringify(faqs), {
      ex: Number(process.env.UPSTASH_TTL),
    });

    return ok(res, faqs, "FAQs fetched from DB");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

// Public list active FAQs
export const getAllFAQsFrontendController = async (_req: Request, res: Response) => {
  try {
    const cache: any = await redis.get("faqs:frontend");
    if (cache) {
      return ok(res, JSON.parse(cache), "Frontend FAQs fetched from cache");
    }

    const faqs = await faqService.getAllFAQsFrontend();

    await redis.set("faqs:frontend", JSON.stringify(faqs), {
      ex: Number(process.env.UPSTASH_TTL),
    });

    return ok(res, faqs, "Frontend FAQs fetched from DB");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};
