import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { validate } from "../../middlewares/validate";
import { createFAQSchema, updateFAQSchema } from "./faq.validation";
import * as faqController from "./faq.controller";

const router = Router();

// Admin APIs
router.post("/admin/create", authMiddleware, validate(createFAQSchema), faqController.createFAQController);
router.post("/admin/update", authMiddleware, validate(updateFAQSchema), faqController.updateFAQController);
router.post("/admin/delete", authMiddleware, faqController.deleteFAQController);
router.post("/admin/list", authMiddleware, faqController.getAllFAQsController);

// Public APIs
router.post("/list", faqController.getAllFAQsFrontendController);

export default router;
