import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import * as authService from "./auth.service";
import { generateToken } from "../../utils/jwt";
import { ok, badRequest, unauthorized } from "../../utils/response";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return badRequest(res, "Email and password are required");
    }

    const user = await authService.getUserByEmail(email);
    if (!user) {
      return unauthorized(res, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return unauthorized(res, "Invalid credentials");
    }

    const token = generateToken({ id: user.id, email: user.email });

    return ok(res, { token, user: { id: user.id, email: user.email } }, "Login successful");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};
