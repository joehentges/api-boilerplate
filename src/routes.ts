import express from "express"

import { isSecure } from "@/middleware/is-secure"

import { createCatService, getCatService } from "@/services/cats"

const router = express.Router()

// Health
router.get("/health", (_, res) => res.send("Server is running!"))

// Cats
router.get("/cats/:catId", getCatService)
router.post("/cats", isSecure, createCatService)

export default router
