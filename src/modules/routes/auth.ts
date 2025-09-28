import { Router, Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const router = Router();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const APP_JWT_SECRET = process.env.APP_JWT_SECRET as string;

if (!GOOGLE_CLIENT_ID || !APP_JWT_SECRET) {
  throw new Error("Missing GOOGLE_CLIENT_ID or APP_JWT_SECRET");
}

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

router.post("/google", async (req: Request, res: Response) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ error: "Missing Google ID token" });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) return res.status(401).json({ error: "Invalid Google token" });

    const { sub: googleId, email, name, picture } = payload;

    // Issue your own JWT
    const token = jwt.sign(
      { userId: googleId, email, name },
      APP_JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user: { googleId, email, name, picture } });
  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(500).json({ error: "Google authentication failed" });
  }
});

export default router;
