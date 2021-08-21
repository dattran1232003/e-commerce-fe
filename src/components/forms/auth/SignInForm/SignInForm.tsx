// import region
import { SubmitHandler } from 'react-hook-form'
// import { useHistory } from 'react-router-dom'

// customs
import { EAuthForm, EUserType } from '@/commons/enums'
import useSignIn from '../hooks/useSignIn'

import AuthForm, { SignInInputs } from '../AuthForm/AuthForm'

// UI
import Link from '@material-ui/core/Link'
import { LinearProgress } from '@material-ui/core'
// # import region

export type Props = {
  changeForm: React.Dispatch<React.SetStateAction<EAuthForm | null>>
}
export default function SignInForm({ changeForm }: Props): JSX.Element {
  // const history = useHistory()
  const { signIn, loading } = useSignIn(EUserType.BUYER)

  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    const res = await signIn(data)

    console.log(res)
  }

  return (
    <div>
      {loading && <LinearProgress />}

      <h2>Sign In</h2>

      <AuthForm onSubmit={onSubmit} formType={EAuthForm.SIGNIN} />

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
