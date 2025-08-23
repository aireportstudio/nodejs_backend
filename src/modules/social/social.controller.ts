import { Request, Response } from "express";
import * as socialService from "./social.service";
import { ok, created, badRequest } from "../../utils/response";
import redis from "../../config/redis";

// Create social links
export const createSocialController = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body };
    const social = await socialService.createSocial(data);

    // Invalidate cache
    await redis.del("socials:admin");
    await redis.del("socials:frontend");

    return created(res, social, "Social links created successfully");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

// Update social links
export const updateSocialController = async (req: Request, res: Response) => {
  const id = Number(req.body.id);
  if (!id) return badRequest(res, "Social ID is required");
  try {
    const data = { ...req.body };
    const social = await socialService.updateSocial(id, data);

    // Invalidate cache
    await redis.del("socials:admin");
    await redis.del("socials:frontend");

    return ok(res, social, "Social links updated successfully");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

// Delete social links
export const deleteSocialController = async (req: Request, res: Response) => {
  const id = Number(req.body.id);
  if (!id) return badRequest(res, "Social ID is required");
  try {
    const social = await socialService.deleteSocial(id);

    // Invalidate cache
    await redis.del("socials:admin");
    await redis.del("socials:frontend");

    return ok(res, social, "Social links deleted successfully");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

// Admin list all socials
export const getAllSocialsController = async (_req: Request, res: Response) => {
  try {
    const cache: any = await redis.get("socials:admin");
    if (cache) {
      return ok(res, JSON.parse(cache), "Socials fetched from cache");
    }

    const socials = await socialService.getAllSocials();

    await redis.set("socials:admin", JSON.stringify(socials), {
      ex: Number(process.env.UPSTASH_TTL),
    });

    return ok(res, socials, "Socials fetched from DB");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

// Public list active socials
export const getAllSocialsFrontendController = async (_req: Request, res: Response) => {
  try {
    const cache: any = await redis.get("socials:frontend");
    if (cache) {
      return ok(res, JSON.parse(cache), "Frontend socials fetched from cache");
    }

    const socials = await socialService.getAllSocialsFrontend();

    await redis.set("socials:frontend", JSON.stringify(socials), {
      ex: Number(process.env.UPSTASH_TTL),
    });

    return ok(res, socials, "Frontend socials fetched from DB");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};
