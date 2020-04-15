import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'
import TransparentButton from './TransparentButton'
import CloseSvg from '../../assets/close.svg'

const CloseButton = ({ classes, className, onClick, ...others }) => (
  <TransparentButton
    className={classnames([className, classes.closeButton])}
    onClick={onClick}
    aria-label="close"
    {...others}
  >
    <CloseSvg />
  </TransparentButton>
)

export default injectSheet(styles)(CloseButton)
