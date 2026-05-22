import cors from "cors";
import helmet from "helmet";

export const securityMiddleware = {
  helmet: helmet(),
  cors: cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
};
