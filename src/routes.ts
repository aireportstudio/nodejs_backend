import { Router } from "express";
import blogRoutes from "./modules/blog/blog.routes";
import testimonialRoutes from "./modules/testimonial/testimonial.routes";
import pricingRoutes from "./modules/pricing/pricing.routes";
import faqRoutes from "./modules/faq/faq.routes";
import socialRoutes from "./modules/social/social.routes";
import demoVideoRoutes from "./modules/demoVideo/demoVideo.routes";
import contactRoutes from "./modules/contact/contact.routes";
import authRoutes from "./modules/routes/auth";

const router = Router();

router.use("/blogs", blogRoutes);
router.use("/testimonials", testimonialRoutes);
router.use("/pricing", pricingRoutes);
router.use("/faq", faqRoutes);
router.use("/social", socialRoutes);
router.use("/demoVideo", demoVideoRoutes);
router.use("/contact", contactRoutes);
router.use("/auth", authRoutes);
export default router;
