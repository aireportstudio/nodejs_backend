import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { uploadSingle } from "../../middlewares/uploads";
import { validate } from "../../middlewares/validate";
import { createTestimonialSchema, updateTestimonialSchema } from "./testimonial.validation";
import * as testimonialController from "./testimonial.controller";

const router = Router();

// Admin APIs
router.post("/admin/create", authMiddleware, uploadSingle("image", "image"), validate(createTestimonialSchema), testimonialController.createTestimonialController);
router.post("/admin/update", authMiddleware, uploadSingle("image", "image"), validate(updateTestimonialSchema), testimonialController.updateTestimonialController);
router.post("/admin/delete", authMiddleware, testimonialController.deleteTestimonialController);
router.post("/admin/list", authMiddleware, testimonialController.getAllTestimonialsController);

// Public APIs
router.post("/list", testimonialController.getAllTestimonialsFrontendController);

export default router;
