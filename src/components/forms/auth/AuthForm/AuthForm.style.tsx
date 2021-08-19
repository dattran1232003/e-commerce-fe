import { createStyles, makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      margin: '0 auto',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
)
