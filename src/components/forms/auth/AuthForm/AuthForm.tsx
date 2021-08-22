import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

import { EAuthForm } from '@/commons/enums'
import { useStyles } from './AuthForm.style'
import { signInSchema } from '../schema/sign-in.schema'
import { signUpSchema } from '../schema/sign-up.schema'

import Alert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import ChooseUserType from '../ChooseUserType/ChooseUserType'

export type SignInInputs = {
  username: string
  password: string
}
export type SignUpInputs = {
  username: string
  password: string
  confirmPassword: string
}

export type Props = {
  httpError?: string[]
  formType: EAuthForm
  onSubmit: SubmitHandler<SignInInputs> | SubmitHandler<SignUpInputs>
}
function AuthForm({ formType, onSubmit, httpError }: Props): JSX.Element {
  const classes = useStyles()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInputs & SignUpInputs>({
    mode: 'onChange',
    resolver: isSignUp()
      ? yupResolver(signUpSchema)
      : yupResolver(signInSchema),
  })

  function isSignUp() {
    return formType === EAuthForm.SIGNUP
  }
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const toggleShowPwdProps = {
    type: showPassword ? 'text' : 'password',
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            edge="end"
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      ),
    },
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        required
        fullWidth
        autoFocus
        id="username"
        margin="normal"
        label="Username"
        variant="outlined"
        {...register('username')}
      />

      <TextField
        required
        fullWidth
        id="password"
        margin="normal"
        label="Password"
        variant="outlined"
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        {...toggleShowPwdProps}
        {...register('password')}
      />

      {isSignUp() && (
        <TextField
          required
          fullWidth
          margin="normal"
          variant="outlined"
          id="confirm-password"
          label="Confirm Password"
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword?.message}
          {...toggleShowPwdProps}
          {...register('confirmPassword')}
        />
      )}

      {httpError &&
        httpError.length !== 0 &&
        httpError.map((error, i) => (
          <Alert severity="error" key={i}>
            {error}
          </Alert>
        ))}

      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign In
      </Button>
    </form>
  )
}

export default AuthForm
