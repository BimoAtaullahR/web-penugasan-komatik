import express from "express";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "./prisma";

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

app.use(express.json());
app.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-production";

app.post("/api/v1/auth/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ success: false, message: "Username and password are required" });
      return;
    }

    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, data: { id: admin.id, username: admin.username } });
  } catch (error) {
    next(error);
  }
});

// --- Auth middleware ---
const requireAdmin: express.RequestHandler = (req, res, next) => {
  const token = (req as any).cookies?.token;
  if (!token) {
    res.status(401).json({ success: false, message: "Authentication required" });
    return;
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: number; username: string };
    (req as any).admin = payload;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

app.get("/api/v1/auth/me", requireAdmin, (req, res) => {
  res.json({ success: true, data: (req as any).admin });
});

app.post("/api/v1/auth/logout", (_req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out" });
});

app.get("/api/v1/jerseys", async (req, res, next) => {
  try {
    const limit = Math.max(1, Number(req.query.limit) || 10);
    const offset = Math.max(0, Number(req.query.offset) || 0);
    const search = req.query.search ? String(req.query.search).toLowerCase() : null;
    const league = req.query.league ? String(req.query.league) : null;
    const kitType = req.query.kitType ? String(req.query.kitType) : null;
    const issueType = req.query.issueType ? String(req.query.issueType) : null;
    const brand = req.query.brand ? String(req.query.brand) : null;

    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { clubName: { contains: search, mode: "insensitive" } },
        { country: { contains: search, mode: "insensitive" } }
      ];
    }

    if (league) whereClause.league = league;
    if (kitType) whereClause.kitType = kitType;
    if (issueType) whereClause.issueType = issueType;
    if (brand) whereClause.brand = brand;

    const [total, data] = await Promise.all([
      prisma.jersey.count({ where: whereClause }),
      prisma.jersey.findMany({
        where: whereClause,
        take: limit,
        skip: offset,
        orderBy: { id: "asc" }
      })
    ]);

    res.json({
      success: true,
      data,
      meta: { total, limit, offset }
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/v1/jerseys/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid Jersey id" });
      return;
    }

    const jersey = await prisma.jersey.findUnique({ where: { id } });
    if (!jersey) {
      res.status(404).json({ success: false, message: "Jersey not found" });
      return;
    }

    res.json({ success: true, data: jersey });
  } catch (error) {
    next(error);
  }
});

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

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ success: false, message: "Internal server error" });
});
