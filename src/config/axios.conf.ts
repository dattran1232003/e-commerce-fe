import { AxiosRequestConfig } from 'axios'

export const axiosConfiguration: AxiosRequestConfig = {
  baseURL: process.env.BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  transformRequest: [
    (req: unknown): string | unknown =>
      typeof req === 'object' ? JSON.stringify(req) : req,
  ],
}
