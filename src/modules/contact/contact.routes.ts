import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { validate } from "../../middlewares/validate";
import { createContactSchema } from "./contact.validation";
import * as contactController from "./contact.controller";

const router = Router();

// Public frontend API
router.post("/submit", validate(createContactSchema), contactController.createContactController);

// Admin APIs (auth required)
router.post("/admin/list", authMiddleware, contactController.getAllContactsController);

export default router;
