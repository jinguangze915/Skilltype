import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import CloseButton from '../Button/CloseButton'
import styles from './styles'

const Notify = ({ classes, className, children, style, id, onClose, show }) =>
  show ? (
    <SnackbarContent
      elevation={0}
      style={style}
      className={classnames(className, classes.notify, 'dark')}
      aria-describedby={`${id}-message`}
      message={
        <span id={`${id}-message`} className={classes.message}>
          {children}
        </span>
      }
      action={
        <CloseButton
          aria-label="Close"
          onClick={onClose}
          className={classes.closeButton}
        />
      }
    />
  ) : null

export default injectSheet(styles)(Notify)
