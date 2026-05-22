import express from "express";
import cookieParser from "cookie-parser";
import jerseyRoutes from "./routes/jerseys";
import authRoutes from "./routes/auth";
import { errorHandler } from "./middleware/error-handler";
import { authLimiter, globalLimiter } from "./middleware/rate-limiters";
import { securityMiddleware } from "./middleware/security";

export const app = express();

app.use(securityMiddleware.helmet);
app.use(securityMiddleware.cors);
app.use(globalLimiter);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authLimiter, authRoutes);

app.use("/api/v1/jerseys", jerseyRoutes);

app.use(errorHandler);
