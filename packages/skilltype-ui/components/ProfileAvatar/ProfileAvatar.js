import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'

const ProfileAvatar = ({ classes, className, label, profileTheme, style }) => (
  <div
    role="banner"
    className={classnames([
      className,
      classes[profileTheme],
      classes.profileAvatar,
    ])}
    style={style}
  >
    {label}
  </div>
)

export default injectSheet(styles)(ProfileAvatar)
