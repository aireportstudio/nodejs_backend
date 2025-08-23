import { Request, Response } from "express";
import * as pricingService from "./pricing.service";
import { ok, created, badRequest } from "../../utils/response";
import redis from "../../config/redis";

// Admin + public create
export const createPricingController = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body };
    const pricing = await pricingService.createPricing(data);

    // Invalidate cache
    await redis.del("pricings:admin");
    await redis.del("pricings:frontend");

    return created(res, pricing, "Pricing plan created successfully");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

// Update pricing
export const updatePricingController = async (req: Request, res: Response) => {
  const id = Number(req.body.id);
  if (!id) return badRequest(res, "Pricing ID is required");
  try {
    const data = { ...req.body };
    const pricing = await pricingService.updatePricing(id, data);

    // Invalidate cache
    await redis.del("pricings:admin");
    await redis.del("pricings:frontend");

    return ok(res, pricing, "Pricing plan updated successfully");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

// Delete pricing
export const deletePricingController = async (req: Request, res: Response) => {
  const id = Number(req.body.id);
  if (!id) return badRequest(res, "Pricing ID is required");
  try {
    const pricing = await pricingService.deletePricing(id);

    // Invalidate cache
    await redis.del("pricings:admin");
    await redis.del("pricings:frontend");

    return ok(res, pricing, "Pricing plan deleted successfully");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

// Admin list all
export const getAllPricingsController = async (_req: Request, res: Response) => {
  try {
    // Check cache
    const cache: any = await redis.get("pricings:admin");
    if (cache) {
      return ok(res, JSON.parse(cache), "Pricing plans fetched from cache");
    }

    const pricings = await pricingService.getAllPricings();

    await redis.set("pricings:admin", JSON.stringify(pricings), {
      ex: Number(process.env.UPSTASH_TTL),
    });

    return ok(res, pricings, "Pricing plans fetched from DB");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

// Public list active pricing
export const getAllPricingsFrontendController = async (_req: Request, res: Response) => {
  try {
    const cache: any = await redis.get("pricings:frontend");
    if (cache) {
      return ok(res, JSON.parse(cache), "Frontend pricing plans fetched from cache");
    }

    const pricings = await pricingService.getAllPricingsFrontend();

    await redis.set("pricings:frontend", JSON.stringify(pricings), {
      ex: Number(process.env.UPSTASH_TTL),
    });

    return ok(res, pricings, "Frontend pricing plans fetched from DB");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};
