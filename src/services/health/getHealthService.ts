import { Request, Response } from "express"

export function getHealthService(_: Request, res: Response) {
  res.send("Server is running!")
}
