import { useReducer } from 'react'
import { isExpired } from '../utilities/jwt.util'
// import { pipe } from 'ramda'

type Nullable<T> = T | null

export type AuthData = {
  accessToken: Nullable<string>
  refreshToken: Nullable<string>
}

export enum ActionType {
  SetAuthData = 'set_authdata',
  DelAuthData = 'del_authdata',
}

const initialAuthData: AuthData = {
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
}

export type SetAuthDataState = {
  type: ActionType.SetAuthData
  payload: AuthData
}

export type DelAuthDataState = {
  type: ActionType.DelAuthData
}

export type Action = SetAuthDataState | DelAuthDataState

function authDataReducer(state: AuthData, action: Action): AuthData {
  switch (action.type) {
    case ActionType.SetAuthData:
      return {
        ...state,
        ...action.payload, // override
      }
    case ActionType.DelAuthData:
      return {
        accessToken: null,
        refreshToken: null,
      }

    default:
      return state
  }
}

/* dispatch helper */
const setAuthDataState = (authData: AuthData): SetAuthDataState => ({
  type: ActionType.SetAuthData,
  payload: authData,
})

const delAuthDataState = (): DelAuthDataState => ({
  type: ActionType.DelAuthData,
})

/** store authData to localStorage */
function storeAuthData(_authData: AuthData): AuthData {
  localStorage.setItem('accessToken', _authData.accessToken || '')
  localStorage.setItem('refreshToken', _authData.refreshToken || '')

  return _authData
}
/** delete authData from localStorage */
function unstoreAuthData(): void {
  localStorage.setItem('accessToken', '')
  localStorage.setItem('refreshToken', '')
}

export interface IAuthDataOperation {
  getAuthData: () => AuthData
  setAuthData: (_authData: AuthData) => void
  delAuthData: () => void
  isAuth: () => boolean
}

/** Make easier to work with auth-data like access/refresh token */
function useAuthData(): IAuthDataOperation {
  const [authDataState, dispatch] = useReducer(authDataReducer, initialAuthData)

  function getAuthData(): AuthData {
    return authDataState
  }

  function setAuthData(_authData: AuthData): void {
    storeAuthData(_authData)
    dispatch(setAuthDataState(_authData))
  }

  function delAuthData(): void {
    unstoreAuthData()
    dispatch(delAuthDataState())
  }

  function isAuth(): boolean {
    const isHasTokens =
      Boolean(authDataState.accessToken) && Boolean(authDataState.refreshToken)

    const isAccessTokenExpired = isExpired(authDataState.accessToken)

    return isHasTokens && !isAccessTokenExpired
  }

  return { getAuthData, setAuthData, delAuthData, isAuth }
}
export default useAuthData
