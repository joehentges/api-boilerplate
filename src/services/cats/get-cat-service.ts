import { eq } from "drizzle-orm"
import { Request, Response } from "express"
import { pino } from "pino"
import { z } from "zod"

import { DataNotFoundError } from "@/errors"
import { database } from "@/db"
import { catsTable } from "@/db/schemas"
import {
  dataNotFoundErrorResponse,
  serviceExecutionErrorResponse,
  zodErrorResponse,
} from "@/lib/error-response"

const logger = pino({ name: "services | cats | getCatService" })

const requestSchema = z.object({
  params: z.object({
    catId: z.string().min(1),
  }),
})

export async function getCatService(req: Request, res: Response) {
  try {
    const { params } = requestSchema.parse(req)

    const [cat] = await database.select().from(catsTable).where(eq(catsTable.id, params.catId))

    if (!cat) {
      throw new DataNotFoundError({
        name: "GET_CAT",
        message: `Unable to find cat by id ${params.catId}`,
        params: [
          {
            name: "id",
            value: params.catId,
          },
        ],
      })
    }

    res.status(200).json(cat)
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.error(`Get Cat request payload validation error ${JSON.stringify(error)}`)
      return zodErrorResponse("0001", error, res)
    }

    if (error instanceof DataNotFoundError) {
      logger.error(`Get Cat request data access error ${JSON.stringify(error)}`)
      return dataNotFoundErrorResponse("0002", error, res)
    }

    logger.error(`Get Cat request service execution error ${JSON.stringify(error)}`)
    serviceExecutionErrorResponse("0003", "Get Cat request service execution error", res)
  }
}
