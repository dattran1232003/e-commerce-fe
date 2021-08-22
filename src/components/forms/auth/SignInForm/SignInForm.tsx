import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

// customs
import useSignIn from '../hooks/useSignIn'
import { isErrorResponse } from '@/commons/utilities'
import { EAuthForm, EUserType } from '@/commons/enums'
import AuthForm, { SignInInputs } from '../AuthForm/AuthForm'

// UI
import Link from '@material-ui/core/Link'
import LinearProgress from '@material-ui/core/LinearProgress'
import ChooseUserType from '../ChooseUserType/ChooseUserType'

export type Props = {
  changeForm: React.Dispatch<React.SetStateAction<EAuthForm | null>>
}
export default function SignInForm({ changeForm }: Props): JSX.Element {
  const [errors, setErrors] = useState<string[]>([])
  const [userType, setUserType] = useState<EUserType | null>(null)

  const { signInAs, loading } = useSignIn()

  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    if (!userType) return

    const res = await signInAs(userType, data)

    isErrorResponse(res) && setErrors(res.message)
  }

  return (
    <div>
      {loading && <LinearProgress />}

      <h2>Sign In</h2>

      <ChooseUserType onChange={setUserType} currentUserType={userType} />

      <AuthForm
        httpError={errors}
        onSubmit={onSubmit}
        formType={EAuthForm.SIGNIN}
      />

      <Link
        href="#"
        variant="body2"
        onClick={() => changeForm(EAuthForm.SIGNUP)}
      >
        Do not have an account yet? Sign up now.
      </Link>
    </div>
  )
}
