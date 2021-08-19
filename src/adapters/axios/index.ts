import Axios, { AxiosInstance } from 'axios'

//import { EStatus } from '@/commons/enums'
import useAuthData from '@/commons/hooks/useAuthData'
import { axiosConfiguration } from '@/config/axios.conf'
//import statusType from '@/commons/utilities/status-type.util'

export function useAxiosInstance(): AxiosInstance {
  const { getAuthData } = useAuthData()
  const instance = Axios.create(axiosConfiguration)

  const { accessToken } = getAuthData()
  if (accessToken) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
  } else {
    delete instance.defaults.headers.common['Authorization']
  }

  return instance
}
