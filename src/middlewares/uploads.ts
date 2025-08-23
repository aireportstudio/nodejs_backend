import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request, Response, NextFunction } from "express";
import { badRequest } from "../utils/response";

// Storage config for blog images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/blogs"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  },
});

// File filter
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedTypes = /jpeg|jpg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("File type not allowed"));
  }
};

// Limits
const limits = { fileSize: 2 * 1024 * 1024 }; // 5MB

const uploadMiddleware = multer({ storage, fileFilter, limits });

// Single upload
export const uploadSingle = (fieldName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const uploader = uploadMiddleware.single(fieldName);
    uploader(req, res, function (err) {
      if (err instanceof multer.MulterError) return badRequest(res, err.message);
      else if (err) return badRequest(res, (err as Error).message);
      next();
    });
  };
};
