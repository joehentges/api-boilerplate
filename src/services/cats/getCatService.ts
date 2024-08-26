import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { pino } from "pino"
import { z } from "zod"

import { DataNotFoundError } from "@/errors"
import { getCat } from "@/data-access/cats"

const logger = pino({ name: "get-cat-service" })

const requestSchema = z.object({
  params: z.object({
    catId: z.coerce.number(),
  }),
})

export async function getCatService(req: Request, res: Response) {
  try {
    const { params } = requestSchema.parse(req)

    const cat = await getCat(params.catId)

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
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        code: "0001",
        title: "Request payload validation error",
        message: "Request is missing required payload values",
        error: error.issues,
      })
      return
    }

    if (error instanceof DataNotFoundError) {
      logger.error(`Get Cat request data access error ${JSON.stringify(error)}`)
      res.status(StatusCodes.NOT_FOUND).send({
        code: "0001",
        title: "No data found",
        message: error.message,
        params: error.params,
      })
      return
    }

    logger.error(`Get Cat request service execution error ${JSON.stringify(error)}`)
    res.status(500).send("Get Cat request service execution error")
  }
}
