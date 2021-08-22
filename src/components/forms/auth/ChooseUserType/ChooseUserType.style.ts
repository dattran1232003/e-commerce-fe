import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: { margin: theme.spacing(1) },
    radioBox: {
      display: 'flex',
      justifyContent: 'center',
    },
  })
)
