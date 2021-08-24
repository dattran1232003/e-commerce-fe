// import region
import { ReactNode } from 'react'

// types
import { EAuthForm } from '@/commons/enums/auth-form.enum'

// UI
import Fade from '@material-ui/core/Fade'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'

// hooks
import { useStyles } from './FormModal.style'

//# import region

export type Props = {
  children?: ReactNode
  formModalOpen: EAuthForm | null
  handleCloseFormModal: () => void
}

export default function FormModal({
  children,
  formModalOpen,
  handleCloseFormModal,
}: Props): JSX.Element {
  const classes = useStyles()

  const open = Boolean(formModalOpen)

  return (
    <div>
      <Modal
        open={open}
        className={classes.modal}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        onClose={handleCloseFormModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open} timeout={{ exit: 0 }}>
          <div className={classes.paper}>{children}</div>
        </Fade>
      </Modal>
    </div>
  )
}
