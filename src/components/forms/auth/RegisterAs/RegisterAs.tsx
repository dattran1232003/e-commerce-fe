import { EUserType } from '@/commons/enums'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
// import { useStyles } from './RegisterAs.style'

export type Props = {
  currentUserType: EUserType | null
  onChange: (userType: EUserType) => void
}

function RegisterAs({ currentUserType, onChange }: Props): JSX.Element {
  // const classes = useStyles()

  const btnVariant = (definedType: EUserType) => {
    return currentUserType === definedType ? 'contained' : 'outlined'
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>
        Who are you?
        <ButtonGroup color="primary" orientation="horizontal" fullWidth>
          <Button
            variant={btnVariant(EUserType.BUYER)}
            onClick={() => onChange(EUserType.BUYER)}
          >
            Buyer
          </Button>

          <Button
            variant={btnVariant(EUserType.MERCHANT)}
            onClick={() => onChange(EUserType.MERCHANT)}
          >
            Merchant
          </Button>
        </ButtonGroup>
      </h1>
    </div>
  )
}

export default RegisterAs
