import Axios, { AxiosInstance } from 'axios'

//import { EStatus } from '@/commons/enums'
import useAuthData, { AuthData } from '@/commons/hooks/useAuthData'
import { axiosConfiguration } from '@/config/axios.conf'
import { ErrorResponse } from '@/commons/dtos/ErrorResponse.dto'
//import statusType from '@/commons/utilities/status-type.util'

export function useAxiosInstance(): AxiosInstance {
  const { isAuth, getAuthData, delAuthData, setAuthData } = useAuthData()
  const instance = Axios.create(axiosConfiguration)

  const { accessToken, refreshToken } = getAuthData()
  console.log(isAuth())
  if (isAuth() && accessToken) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
  } else {
    delete instance.defaults.headers.common['Authorization']
    if (refreshToken) refreshExpiredToken(refreshToken)
  }

  async function refreshExpiredToken(refreshToken: string) {
    console.log('refreshing token...')
    try {
      const { data } = await instance.post<AuthData>(
        `/auth/token/refresh/${refreshToken}`
      )

      console.log('refresh token successfully :))')
      setAuthData(data)
      return data
    } catch (error) {
      console.log('refresh token failed :((')
      delAuthData()
      const data = error?.response?.data
      return new ErrorResponse(data)
    }
  }

  return instance
}
