import React, { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

// custom
import { useStyles } from './SignUpForm.style'
import RegisterAs from '../RegisterAs/RegisterAs'
import { EAuthForm, EUserType } from '@/commons/enums'
import AuthForm, { SignUpInputs } from '../AuthForm/AuthForm'

// UIs
import Link from '@material-ui/core/Link'
import Step from '@material-ui/core/Step'
import Button from '@material-ui/core/Button'
import Stepper from '@material-ui/core/Stepper'
import StepLabel from '@material-ui/core/StepLabel'
import Typography from '@material-ui/core/Typography'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

function getSteps() {
  return ['Select account type', 'Create an account', 'Register']
}

export type Props = {
  changeForm: React.Dispatch<React.SetStateAction<EAuthForm | null>>
}
export default function SignUp({ changeForm }: Props): JSX.Element {
  const [userType, setUserType] = useState<EUserType | null>(null)

  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const handleChangeUserType = (userType: EUserType) => {
    setUserType(userType)
    handleNext()
  }

  const onSubmit: SubmitHandler<SignUpInputs> = (data) => {
    console.log(data)
  }

  function getStepContent(stepIndex: number) {
    const stepContents = [
      <RegisterAs
        key="0"
        currentUserType={userType}
        onChange={handleChangeUserType}
      />,

      <div key="1">
        <h2>Sign Up</h2>
        <AuthForm formType={EAuthForm.SIGNUP} onSubmit={onSubmit} />
      </div>,
      'This is the bit I really care about!',
    ]

    return stepContents[stepIndex] || 'Unknown stepIndex'
  }

  return (
    <div className={classes.root}>
      <Button
        onClick={handleBack}
        disabled={activeStep === 0}
        className={classes.backButton}
      >
        <ArrowBackIosIcon />
      </Button>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            {/* <div>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div> */}
          </div>
        )}
      </div>

      <Link
        href="#"
        variant="body2"
        onClick={() => changeForm(EAuthForm.SIGNIN)}
      >
        Already have an account? Sign in now.
      </Link>
    </div>
  )
}
