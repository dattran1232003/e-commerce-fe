import { useState } from 'react'
import { SignInInputs } from '../AuthForm/AuthForm'

import { EUserType } from '@/commons/enums'
import { useAxiosInstance } from '@/adapters/axios'
import { ErrorResponse } from '@/commons/dtos/ErrorResponse.dto'
import useAuthData, { AuthData } from '@/commons/hooks/useAuthData'

type Res = AuthData | ErrorResponse

interface ISignInOperation {
  signInAs: (userType: EUserType, user: SignInInputs) => Promise<Res>
  loading: boolean
}
function useSignIn(): ISignInOperation {
  const [loading, setLoading] = useState<boolean>(false)

  const axios = useAxiosInstance()
  const { setAuthData } = useAuthData()

  async function signInAs(
    userType: EUserType,
    user: SignInInputs
  ): Promise<Res> {
    const userTypeEndPoint =
      userType === EUserType.BUYER ? 'buyers' : 'merchants'

    setLoading(true)
    try {
      const response = await axios.post(
        `/auth/${userTypeEndPoint}/sign-in`,
        user
      )
      setLoading(false)

      // set for tokens
      setAuthData(response.data)
      return response.data
    } catch (error) {
      setLoading(false)

      const data = error?.response?.data
      return new ErrorResponse(data)
    }
  }

  return { signInAs, loading }
}

export default useSignIn
