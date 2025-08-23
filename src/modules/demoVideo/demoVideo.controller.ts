import { Request, Response } from "express";
import * as demoVideoService from "./demoVideo.service";
import { ok, created, badRequest } from "../../utils/response";

// Create demo video
export const createDemoVideoController = async (req: Request, res: Response) => {
  try {
    const file = req.file?.filename; // multer upload
    const data = { ...req.body, file };
    const demoVideo = await demoVideoService.createDemoVideo(data);
    return created(res, demoVideo, "Demo video created successfully");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

// Update demo video
export const updateDemoVideoController = async (req: Request, res: Response) => {
  const id = Number(req.body.id);
  if (!id) return badRequest(res, "Demo Video ID is required");
  try {
    const file = req.file?.filename;
    const data = { ...req.body, ...(file && { file }) };
    const demoVideo = await demoVideoService.updateDemoVideo(id, data);
    return ok(res, demoVideo, "Demo video updated successfully");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

// Delete demo video
export const deleteDemoVideoController = async (req: Request, res: Response) => {
  const id = Number(req.body.id);
  if (!id) return badRequest(res, "Demo Video ID is required");
  try {
    const demoVideo = await demoVideoService.deleteDemoVideo(id);
    return ok(res, demoVideo, "Demo video deleted successfully");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

// Admin list all
export const getAllDemoVideosController = async (req: Request, res: Response) => {
  try {
    const demoVideos = await demoVideoService.getAllDemoVideos();
    return ok(res, demoVideos);
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

// Public list active only
export const getAllDemoVideosFrontendController = async (req: Request, res: Response) => {
  try {
    const demoVideos = await demoVideoService.getAllDemoVideosFrontend();
    return ok(res, demoVideos);
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};
