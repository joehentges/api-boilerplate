import type { Request } from "express"
import { rateLimit } from "express-rate-limit"

import { env } from "@/env"

export const rateLimiter = rateLimit({
  legacyHeaders: true,
  limit: Number(env.COMMON_RATE_LIMIT_MAX_REQUESTS),
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  windowMs: Number(env.COMMON_RATE_LIMIT_WINDOW_MS),
  keyGenerator: (req: Request) => req.ip as string,
})
