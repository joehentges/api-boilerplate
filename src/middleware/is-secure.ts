import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { pino } from "pino"

const logger = pino({ name: "middleware | isSecure" })

export async function isSecure(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization
  if (!token) {
    logger.error(`Missing authorization in headers ${JSON.stringify(req.headers)}`)
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Missing authorization token",
    })
  }
  next()
}
