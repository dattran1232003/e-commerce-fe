import { AxiosRequestConfig } from 'axios'

export const axiosConfiguration: AxiosRequestConfig = {
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
}
