import React from 'react'
import injectSheet from 'react-jss'
import ProfileCard from './ProfileCard'
import styles from './styles'

const PinnedProfileCard = ({ classes, children, ...others }) => (
  <div className={classes.pinnedProfileCard}>
    <ProfileCard classes={classes} {...others} />
    {children}
  </div>
)

export default injectSheet(styles)(PinnedProfileCard)
