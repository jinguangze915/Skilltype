import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import TransparentButton from '../Button/TransparentButton'
import LogoSvg from '../../assets/logo.svg'
import Menu from './Menu'
import styles from './styles'

const GuestHeaderMenu = ({
  classes,
  className,
  children,
  style,
  ...others
}) => (
  <Menu
    className={classnames(className, classes.guestHeaderMenu)}
    classes={classes}
    modalProps={{
      title: (
        <TransparentButton href="/">
          <LogoSvg className={classes.logo} />
        </TransparentButton>
      ),
    }}
    popperPlacement="bottom-end"
    {...others}
  >
    {children}
  </Menu>
)
export default injectSheet(styles)(GuestHeaderMenu)
