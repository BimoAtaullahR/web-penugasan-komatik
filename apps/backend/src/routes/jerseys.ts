import { Router } from "express";
import { listJerseysController } from "../controllers/jerseys";

const router = Router();

router.get("/", listJerseysController);

export default router;
