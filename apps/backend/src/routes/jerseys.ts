import { Router } from "express";
import {
	createJerseyController,
	deleteJerseyController,
	getJerseyController,
	listJerseysController,
	updateJerseyController,
} from "../controllers/jerseys";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", listJerseysController);
router.get("/:id", getJerseyController);
router.post("/", requireAdmin, createJerseyController);
router.put("/:id", requireAdmin, updateJerseyController);
router.delete("/:id", requireAdmin, deleteJerseyController);

export default router;
