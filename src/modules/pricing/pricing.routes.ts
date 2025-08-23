import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { validate } from "../../middlewares/validate";
import { createPricingSchema, updatePricingSchema } from "./pricing.validation";
import * as pricingController from "./pricing.controller";

const router = Router();

// Admin APIs
router.post("/admin/create", authMiddleware, validate(createPricingSchema), pricingController.createPricingController);
router.post("/admin/update", authMiddleware, validate(updatePricingSchema), pricingController.updatePricingController);
router.post("/admin/delete", authMiddleware, pricingController.deletePricingController);
router.post("/admin/list", authMiddleware, pricingController.getAllPricingsController);

// Public API
router.post("/list", pricingController.getAllPricingsFrontendController);

export default router;
