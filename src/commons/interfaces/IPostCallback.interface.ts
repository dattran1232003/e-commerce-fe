import { ErrorResponse } from '@/commons/dtos/ErrorResponse.dto'

export interface IPostCallback<ResponseT> {
  onError?: (error: ErrorResponse) => void
  onSuccess?: (responseData: ResponseT) => void
}
