import { Router } from "express";
import { loginController, logoutController, meController } from "../controllers/auth";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/me", requireAdmin, meController);

export default router;
