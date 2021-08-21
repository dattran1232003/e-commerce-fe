import { IErrorResponse } from '@/commons/interfaces/IErrorResponse.interface'

export class ErrorResponse implements IErrorResponse {
  readonly status: number = 500
  readonly message: string[] = ['Server error']
  readonly error?: string

  constructor(errorResponse: ErrorResponse & { statusCode?: number }) {
    if (!errorResponse) return
    console.log(errorResponse)

    const { status, statusCode, message, error } = errorResponse

    this.status = status || statusCode || 500
    this.message = Array.isArray(message) ? message : [message]
    this.error = error || ''
  }
}
