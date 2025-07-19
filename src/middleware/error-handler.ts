import type { ErrorRequestHandler, RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import { pino } from "pino"

const logger = pino({ name: "middleware | errorHandler" })

const unexpectedRequest: RequestHandler = (_req, res) => {
  logger.error(`Path ${_req.url} NOT FOUND`)
  res.sendStatus(StatusCodes.NOT_FOUND)
}

const addErrorToRequestLog: ErrorRequestHandler = (err, _req, res, next) => {
  res.locals.err = err
  next(err)
}

export default () => [unexpectedRequest, addErrorToRequestLog]
