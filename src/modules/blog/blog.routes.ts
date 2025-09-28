import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { uploadSingle } from "../../middlewares/uploads";
import { validate } from "../../middlewares/validate";
import { createBlogSchema, updateBlogSchema } from "./blog.validation";
import * as blogController from "./blog.controller";

const router = Router();

// Admin APIs
router.post(
  "/admin/create",
  uploadSingle("image", "image"),
  validate(createBlogSchema),
  blogController.createBlogController
);

router.post(
  "/admin/update",
  uploadSingle("image", "image"),
  validate(updateBlogSchema),
  blogController.updateBlogController
);

router.post("/admin/delete",  blogController.deleteBlogController);
router.post("/admin/list",  blogController.getAllBlogsController);

// Public APIs
router.post("/list", blogController.getAllBlogsFrontendController);

export default router;
