import { Router } from "express";
import { getJerseyController, listJerseysController } from "../controllers/jerseys";

const router = Router();

router.get("/", listJerseysController);
router.get("/:id", getJerseyController);

export default router;
