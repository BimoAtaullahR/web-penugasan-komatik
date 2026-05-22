import express from "express";
import cookieParser from "cookie-parser";
import { z } from "zod";
import { prisma } from "./prisma";
import jerseyRoutes from "./routes/jerseys";
import authRoutes from "./routes/auth";
import { errorHandler } from "./middleware/error-handler";
import { authLimiter, globalLimiter } from "./middleware/rate-limiters";
import { securityMiddleware } from "./middleware/security";
import { requireAdmin } from "./middleware/auth";

const jerseyCreateSchema = z.object({
  clubName: z.string().min(1),
  league: z.string().min(1),
  country: z.string().min(1),
  season: z.string().min(1),
  kitType: z.string().min(1),
  issueType: z.string().min(1),
  brand: z.string().min(1),
  gender: z.string().min(1),
  price: z.number().int().positive(),
  description: z.string().min(1),
  image: z.string().min(1),
  rating: z.number().min(0).max(5),
  isNew: z.boolean(),
  stock: z.number().int().min(0),
});

const jerseyUpdateSchema = jerseyCreateSchema.partial();

export const app = express();

app.use(securityMiddleware.helmet);
app.use(securityMiddleware.cors);
app.use(globalLimiter);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authLimiter, authRoutes);

app.use("/api/v1/jerseys", jerseyRoutes);

// --- Protected Admin routes ---
app.post("/api/v1/jerseys", requireAdmin, async (req, res, next) => {
  try {
    const { id, ...raw } = req.body;
    const parsed = jerseyCreateSchema.safeParse(raw);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
      });
      return;
    }
    const jersey = await prisma.jersey.create({ data: parsed.data });
    res.status(201).json({ success: true, data: jersey });
  } catch (error) {
    next(error);
  }
});

app.put("/api/v1/jerseys/:id", requireAdmin, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid Jersey id" });
      return;
    }

    const existing = await prisma.jersey.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: "Jersey not found" });
      return;
    }

    const { id: _id, ...data } = req.body;
    const jersey = await prisma.jersey.update({ where: { id }, data });
    res.json({ success: true, data: jersey });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/v1/jerseys/:id", requireAdmin, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid Jersey id" });
      return;
    }

    const existing = await prisma.jersey.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: "Jersey not found" });
      return;
    }

    await prisma.jersey.delete({ where: { id } });
    res.json({ success: true, message: "Jersey deleted" });
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);
