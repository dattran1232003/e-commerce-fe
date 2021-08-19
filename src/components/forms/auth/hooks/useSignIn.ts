import { useState } from 'react'
import { useAxiosInstance } from '@/adapters/axios'
import { SignInInputs } from '../AuthForm/AuthForm'

import { EStatus } from '@/commons/enums'
import statusType from '@/commons/utilities/status-type.util'
import useAuthData, { AuthData } from '@/commons/hooks/useAuthData'
import { IPostCallback } from '@/commons/interfaces/IPostCallback.interface'

interface ISignInOperation {
  signIn: (
    user: SignInInputs,
    callbacks?: IPostCallback<AuthData, unknown>
  ) => Promise<AuthData | null>
  loading: boolean
}

function useSignIn(): ISignInOperation {
  const [loading, setLoading] = useState<boolean>(false)
  const axios = useAxiosInstance()
  const { setAuthData } = useAuthData()

  async function signIn(
    user: SignInInputs,
    cbs: IPostCallback<AuthData, unknown> = {}
  ): Promise<AuthData | null> {
    setLoading(true)

    const { onSuccess, onError } = cbs

    const { status, data: authData } = await axios
      .post<AuthData>('/auth/buyers/sign-in', { data: user })
      .catch((error) => {
        setLoading(false)
        onError && onError(error)
        return error
      })

    const responseStatus = statusType(status)
    if (responseStatus !== EStatus.CREATED) {
      setLoading(false)
      onError && onError(authData)
      return null
    }

    setLoading(false)
    setAuthData(authData)
    onSuccess && onSuccess(authData)

    return authData
  }

  return { signIn, loading }
}

export default useSignIn
