import * as jwt from 'jsonwebtoken'

export const isExpired = (token: string | null): boolean => {
  if (!token) return true

  const decoded = jwt.decode(token)

  if (!decoded || typeof decoded !== 'object') {
    return true
  }

  return (decoded.exp || 0) < Date.now() / 1000
}
