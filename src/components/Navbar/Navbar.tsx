//imports region
// dependencies
import React from 'react'

// types & interfaces
import { EAuthForm } from '@/commons/enums/auth-form.enum'

// UI
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu'
import Switch from '@material-ui/core/Switch'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuItem from '@material-ui/core/MenuItem'
import FormGroup from '@material-ui/core/FormGroup'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import FormControlLabel from '@material-ui/core/FormControlLabel'

// Components
import FormModal from './components/FormModal/FormModal'
import { SignInForm, SignUpForm } from '@/components/forms/auth'

// hooks
import { useStyles } from './Navbar.style'

//#imports region

export type UserMenuItem = {
  onClick?: React.MouseEventHandler<HTMLLIElement>
  label: React.ReactNode
}

export default function MenuAppBar(): JSX.Element {
  const classes = useStyles()

  const [auth, setAuth] = React.useState(false)
  const [formModalOpen, setFormModalOpen] = React.useState<EAuthForm | null>(
    null
  )

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked)
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const onSignInClick = () => {
    handleMenuClose()
    setFormModalOpen(EAuthForm.SIGNIN)
  }

  const onSignUpClick = () => {
    handleMenuClose()
    setFormModalOpen(EAuthForm.SIGNUP)
  }

  const userMenuItems = React.useMemo<UserMenuItem[]>(
    () =>
      auth
        ? [
            { label: 'Profile', onClick: handleMenuClose },
            { label: 'My account', onClick: handleMenuClose },
            { label: 'Logout', onClick: handleMenuClose },
          ]
        : [
            { label: 'Sign In', onClick: onSignInClick },
            { label: 'Sign Up', onClick: onSignUpClick },
          ],
    [auth]
  )

  return (
    <div className={classes.root}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            Titles
          </Typography>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleMenuClose}
            >
              {userMenuItems.map((item, index) => (
                <MenuItem key={index} onClick={item.onClick}>
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <FormModal
        formModalOpen={formModalOpen}
        handleCloseFormModal={() => setFormModalOpen(null)}
      >
        <AuthForm formType={formModalOpen} changeForm={setFormModalOpen} />
      </FormModal>
    </div>
  )
}

type AFProps = {
  formType: EAuthForm | null
  changeForm: React.Dispatch<React.SetStateAction<EAuthForm | null>>
}
function AuthForm({ formType, ...props }: AFProps): JSX.Element {
  // switch case like
  const form = {
    [EAuthForm.SIGNIN]: <SignInForm {...props} />,
    [EAuthForm.SIGNUP]: <SignUpForm {...props} />,
    default: <div></div>,
  }

  return form[formType || 'default']
}
