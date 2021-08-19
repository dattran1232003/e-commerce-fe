import yup from '@/config/yupGlobal'

export const signInSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(6).required('Required'),
})
