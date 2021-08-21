import { ErrorResponse } from '../dtos/ErrorResponse.dto'

export function isErrorResponse(res: unknown): res is ErrorResponse {
  return res instanceof ErrorResponse
}
