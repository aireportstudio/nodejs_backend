import { Router } from "express";
import { validate } from "../../middlewares/validate";
import * as authController from "./auth.controller";
import { loginSchema } from "./auth.validation";

const router = Router();

router.post("/login", validate(loginSchema), authController.loginController);

export default router;
