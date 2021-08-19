import yup from '@/config/yupGlobal'
import { signInSchema } from './sign-in.schema'

export const signUpSchema = signInSchema.shape({
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match'),
})
