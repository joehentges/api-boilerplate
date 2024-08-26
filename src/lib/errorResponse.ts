import { Response } from "express"
import { StatusCodes } from "http-status-codes"
import { ZodError } from "zod"

import { DataNotFoundError } from "@/errors"

export function zodErrorResponse(code: string, error: ZodError, res: Response) {
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    code,
    title: "Request payload validation error",
    message: "Request is missing required payload values",
    error: error.issues,
  })
}

export function dataNotFoundErrorResponse(code: string, error: DataNotFoundError, res: Response) {
  res.status(StatusCodes.NOT_FOUND).send({
    code,
    title: "No data found",
    message: error.message,
    params: error.params,
  })
}

export function serviceExecutionErrorResponse(code: string, message: string, res: Response) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    code,
    title: "Service exeution error",
    message,
  })
}
