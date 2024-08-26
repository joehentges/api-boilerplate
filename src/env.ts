import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

import "dotenv/config"

export const env = createEnv({
  server: {
    NODE_ENV: z.string().optional(),
    PORT: z.string().min(1),
    HOST: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    REDIS_URL: z.string().min(1),
    CORS_ORIGIN: z.string().optional(),
    COMMON_RATE_LIMIT_WINDOW_MS: z.string().min(1),
    COMMON_RATE_LIMIT_MAX_REQUESTS: z.string().min(1),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    COMMON_RATE_LIMIT_WINDOW_MS: process.env.COMMON_RATE_LIMIT_WINDOW_MS,
    COMMON_RATE_LIMIT_MAX_REQUESTS: process.env.COMMON_RATE_LIMIT_MAX_REQUESTS,
  },
})
