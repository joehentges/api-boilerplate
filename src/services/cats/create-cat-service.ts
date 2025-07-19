import { Request, Response } from "express"
import { pino } from "pino"
import { z } from "zod"

import { database } from "@/db"
import { catsTable } from "@/db/schemas"
import { serviceExecutionErrorResponse, zodErrorResponse } from "@/lib/error-response"

const logger = pino({ name: "services | cats | createCatService" })

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

    const cat = await database
      .insert(catsTable)
      .values({
        ...body,
      })
      .returning()

    res.status(200).json(cat)
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.error(`Create Cat request payload validation error ${JSON.stringify(error)}`)
      return zodErrorResponse("0011", error, res)
    }

    logger.error(`Create Cat request service execution error ${JSON.stringify(error)}`)
    serviceExecutionErrorResponse("0012", "Create Cat request service execution error", res)
  }
}
