import express from "express";
import { prisma } from "./prisma";

export const app = express();

app.use(express.json());

app.get("/api/v1/jerseys", async (req, res, next) => {
  try {
    const limit = Math.max(1, Number(req.query.limit) || 10);
    const offset = Math.max(0, Number(req.query.offset) || 0);

    const [total, data] = await Promise.all([
      prisma.jersey.count(),
      prisma.jersey.findMany({
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

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ success: false, message: "Internal server error" });
});
