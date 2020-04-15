import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import MenuBar, { withMenuBarContext } from './MenuBar'
import TransparentButton from '../Button/TransparentButton'
import styles from './styles'

const HomeButton = withMenuBarContext(({ onClick, classes }) => (
  <TransparentButton
    onClick={onClick}
    aria-label="home button"
    className={classes.homeButton}
  >
    <img src={require('../../assets/icon_192.png')} alt="skilltype icon" />
  </TransparentButton>
))

const AppMenuBar = ({
  classes,
  className,
  children,
  title,
  onLogoClick,
  ...others
}) => (
  <MenuBar
    className={classnames(className, classes.appMenuBar)}
    classes={classes}
    {...others}
  >
    <HomeButton id="appMenuBar-home" onClick={onLogoClick} classes={classes} />
    <div className={classes.separator} role="separator" />
    <div className={classes.title} role="heading" aria-label="page title">
      {title}
    </div>
    {children && <div className={classes.links}>{children}</div>}
  </MenuBar>
)

export default injectSheet(styles)(AppMenuBar)
