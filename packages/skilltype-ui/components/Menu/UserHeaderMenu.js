import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import OpenerIcon from '@material-ui/icons/MoreVert'
import TransparentButton from '../Button/TransparentButton'
import MenuSection from './MenuSection'
import MenuItem from './MenuItem'
import { withMenuBarContext } from '../MenuBar/MenuBar'
import styles from './styles'
import Menu from './Menu'
import { version } from '../../../../package.json'

const UserHeaderMenu = ({
  classes,
  className,
  children,
  style,
  title,
  isAdmin,
  theme,
  ...others
}) => (
  <Menu
    className={classnames(className, classes.userHeaderMenu)}
    classes={classes}
    popperPlacement="bottom-end"
    alwaysCollapse
    controlled
    renderOpener={({ buttonProps, classes }) => (
      <TransparentButton className={classes.menuButton} {...buttonProps}>
        <OpenerIcon />
      </TransparentButton>
    )}
    {...others}
  >
    <div
      className={classes.headerMenuTitle}
      style={title ? {} : { display: 'none' }}
    >
      {title}
    </div>
    <MenuItem href="/profile" style={{ color: theme.purple }}>
      View Profile
    </MenuItem>
    <MenuSection title="Account">
      <React.Fragment>
        {isAdmin && <MenuItem href="/admin">Admin Panel</MenuItem>}
      </React.Fragment>
      <MenuItem href="/settings">Settings</MenuItem>
      <MenuItem href="http://help.skilltype.com" target="_blank">
        Help Center
      </MenuItem>
      <MenuItem href="/logout">Logout</MenuItem>
    </MenuSection>
    <div className={classes.version}>v{version}</div>
  </Menu>
)

export default withMenuBarContext(injectSheet(styles)(UserHeaderMenu))
