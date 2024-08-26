import express from "express"
import { pino } from "pino"

import { createCatService, getCatService } from "@/services/cats"
import { getHealthService } from "@/services/health"

const logger = pino({ name: "routes" })
const router = express.Router()

// Health
router.get("/health", getHealthService)

// Cats
router.get("/cats/:catId", getCatService)
router.post("/cats", createCatService)

export default router
