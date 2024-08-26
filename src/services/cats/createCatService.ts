import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { pino } from "pino"
import { z } from "zod"

import { DataNotFoundError } from "@/errors"
import { createCat } from "@/data-access/cats"

const logger = pino({ name: "create-cat-service" })

const requestSchema = z.object({
  body: z.object({
    fullName: z.string().min(1),
    color: z.string().min(1),
    bio: z.string().optional().default(""),
  }),
})

export async function createCatService(req: Request, res: Response) {
  try {
    const { body } = requestSchema.parse(req)

    const cat = await createCat(body)

    res.status(200).json(cat)
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.error(`Create Cat request payload validation error ${JSON.stringify(error)}`)
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        code: "0011",
        title: "Request payload validation error",
        message: "Request is missing required payload values",
        error: error.issues,
      })
      return
    }

    logger.error(`Create Cat request service execution error ${JSON.stringify(error)}`)
    res.status(500).send("Create Cat request service execution error")
  }
}
