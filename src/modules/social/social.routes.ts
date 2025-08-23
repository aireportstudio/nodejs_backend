import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { validate } from "../../middlewares/validate";
import { createSocialSchema, updateSocialSchema } from "./social.validation";
import * as socialController from "./social.controller";

const router = Router();

// Admin APIs
router.post("/admin/create", authMiddleware, validate(createSocialSchema), socialController.createSocialController);
router.post("/admin/update", authMiddleware, validate(updateSocialSchema), socialController.updateSocialController);
router.post("/admin/delete", authMiddleware, socialController.deleteSocialController);
router.post("/admin/list", authMiddleware, socialController.getAllSocialsController);

// Public APIs
router.post("/list", socialController.getAllSocialsFrontendController);

export default router;
