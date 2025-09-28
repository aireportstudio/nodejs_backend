import multer, { FileFilterCallback } from "multer";
import { Request, Response, NextFunction } from "express";
import { badRequest } from "../utils/response";

// Memory storage for Tebi upload
const storage = multer.memoryStorage();

// Image upload middleware (blogs & testimonials)
export const uploadImage = multer({
  storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const ext = file.originalname.split('.').pop()?.toLowerCase();
    if (ext && allowedTypes.test(ext)) cb(null, true);
    else cb(new Error("Only image files allowed: jpeg, jpg, png, webp"));
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 1MB max for images
});

// Video upload middleware (DemoVideos)
export const uploadVideo = multer({
  storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedTypes = /mp4|mov|avi|mkv|webm/;
    const ext = file.originalname.split('.').pop()?.toLowerCase();
    if (ext && allowedTypes.test(ext)) cb(null, true);
    else cb(new Error("Only video files allowed: mp4, mov, avi, mkv, webm"));
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max for videos
});

// Generic wrapper for single file upload
export const uploadSingle = (fieldName: string, type: "image" | "video" = "image") => {
  const uploader = type === "video" ? uploadVideo.single(fieldName) : uploadImage.single(fieldName);

  return (req: Request, res: Response, next: NextFunction) => {
    uploader(req, res, function (err) {
      if (err instanceof multer.MulterError) return badRequest(res, err.message);
      else if (err) return badRequest(res, (err as Error).message);
      next();
    });
  };
};
