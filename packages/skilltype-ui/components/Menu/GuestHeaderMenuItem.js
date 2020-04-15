import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import RightChevronIcon from '@material-ui/icons/ChevronRight'
import MenuItem from './MenuItem'
import styles from './styles'

const GuestHeaderMenuItem = ({ classes, className, children, ...others }) => (
  <MenuItem
    className={classnames(className, classes.guestHeaderMenuItem)}
    classes={classes}
    {...others}
  >
    {children}
    <RightChevronIcon className={classes.chevron} />
  </MenuItem>
)
export default injectSheet(styles)(GuestHeaderMenuItem)
