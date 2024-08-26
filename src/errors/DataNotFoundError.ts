type Params = {
  name: string
  value: any
}

export class DataNotFoundError extends Error {
  name: string
  message: string
  params: Params[]
  cause: any

  constructor({
    name,
    message,
    params = [],
    cause,
  }: {
    name: string
    message: string
    params?: Params[]
    cause?: any
  }) {
    super()
    this.name = name
    this.message = message
    this.params = params
    this.cause = cause
  }
}
