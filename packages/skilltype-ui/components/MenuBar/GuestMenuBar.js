import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import MenuBar, { withMenuBarContext } from './MenuBar'
import TransparentButton from '../Button/TransparentButton'
import styles from './styles'
import LogoSvg from '../../assets/logo.svg'

const HomeButton = withMenuBarContext(({ onClick, classes }) => (
  <TransparentButton
    onClick={onClick}
    aria-label="home button"
    className={classes.logo}
  >
    <LogoSvg />
  </TransparentButton>
))

const GuestMenuBar = ({
  classes,
  className,
  children,
  onLogoClick,
  ...others
}) => (
  <MenuBar
    className={classnames(className, classes.guestMenuBar)}
    classes={classes}
    {...others}
  >
    <HomeButton classes={classes} onClick={onLogoClick} />
    {children && <div className={classes.links}>{children}</div>}
  </MenuBar>
)

export default injectSheet(styles)(GuestMenuBar)
