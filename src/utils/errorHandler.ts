export default class ErrorHandler extends Error {
  statusCode: number
  status: string
  isOperational: boolean
  constructor({message, statusCode}: Params) {
    super(message)
    this.statusCode = statusCode
    this.status = statusCode.toString().startsWith('4') ? 'failed' : 'error'
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}
