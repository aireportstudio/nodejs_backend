import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { validate } from "../../middlewares/validate";
import { createDemoVideoSchema, updateDemoVideoSchema } from "./demoVideo.validation";
import * as demoVideoController from "./demoVideo.controller";
import { uploadSingle } from "../../middlewares/uploads"; // multer wrapper

const router = Router();

// Admin APIs
router.post(
    "/admin/create",
    authMiddleware,
    uploadSingle("file"),
    validate(createDemoVideoSchema),
    demoVideoController.createDemoVideoController
);

router.post(
    "/admin/update",
    authMiddleware,
    uploadSingle("file"),
    validate(updateDemoVideoSchema),
    demoVideoController.updateDemoVideoController
);

router.post("/admin/delete", authMiddleware, demoVideoController.deleteDemoVideoController);
router.post("/admin/list", authMiddleware, demoVideoController.getAllDemoVideosController);

// Public APIs
router.post("/list", demoVideoController.getAllDemoVideosFrontendController);

export default router;
