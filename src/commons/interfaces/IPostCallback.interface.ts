export interface IPostCallback<ResponseT, ErrorT> {
  onError?: (error: ErrorT) => void
  onSuccess?: (responseData: ResponseT) => void
}
