import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
});

export const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
});
