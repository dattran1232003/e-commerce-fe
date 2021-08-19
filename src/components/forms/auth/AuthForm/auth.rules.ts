import { message as M } from '@/commons/utilities/validate-rule-message.util'

export const signInRules = {
  username: { required: 'Username is required' },
  password: {
    required: 'Password is required',
    minLength: M.minLength(6, 'password'),
  },
}
