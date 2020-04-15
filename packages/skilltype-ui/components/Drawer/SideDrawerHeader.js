import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'
import LogoSvg from '../../assets/logo.svg'
import CloseButton from '../Button/CloseButton'

const SideDrawerHeader = ({ classes, className, children, style, onClose }) => (
  <div
    role="heading"
    className={classnames(className, classes.sideDrawerHeader)}
    style={style}
  >
    <div className={classes.content}>
      <LogoSvg />
      <CloseButton onClick={onClose} className={classes.closeButton} />
      {children}
    </div>
  </div>
)

export default injectSheet(styles)(SideDrawerHeader)
