import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { pino } from "pino"

const logger = pino({ name: "middleware | isSecure" })

export function isSecure(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.session) {
    logger.error(`Missing session in headers ${JSON.stringify(req.headers)}`)
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Missing session",
    })
  }
  next()
}
