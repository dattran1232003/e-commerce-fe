// import region
import { SubmitHandler } from 'react-hook-form'
// import { useHistory } from 'react-router-dom'

// customs
import { EAuthForm } from '@/commons/enums'
import useSignIn from '../hooks/useSignIn'
import { AuthData } from '@/commons/hooks/useAuthData'
import AuthForm, { SignInInputs } from '../AuthForm/AuthForm'

// UI
import Link from '@material-ui/core/Link'
// # import region

export type Props = {
  changeForm: React.Dispatch<React.SetStateAction<EAuthForm | null>>
}
export default function SignInForm({ changeForm }: Props): JSX.Element {
  // const history = useHistory()
  const { signIn, loading } = useSignIn()

  const onSubmit: SubmitHandler<SignInInputs> = (data) => {
    signIn(data, { onSuccess, onError })

    function onSuccess(authData: AuthData): void {
      console.log('login success:', authData)
    }

    function onError(error: any) {
      console.log(error)
    }
  }

  if (loading) return <div>Loading...</div>
  return (
    <div>
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
