import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'
import Card from '../Card/Card'
import CardHeading from '../Card/CardHeading'
import CardContent from '../Card/CardContent'
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'
import CheckSvg from '../../assets/check.svg'

const ProfileCard = ({
  classes,
  className,
  profileTheme,
  name,
  avatarLabel,
  tagline,
  location,
  verified,
  style,
  onClick,
  href,
}) => (
  <Card
    className={classnames(className, classes.card)}
    onClick={onClick}
    href={href}
    hero={
      <ProfileAvatar
        className={classes.avatar}
        profileTheme={profileTheme}
        label={avatarLabel}
      />
    }
    style={style}
  >
    <CardHeading>
      {name}
      {verified && (
        <div className={classes.verified} aria-label="user is verified">
          <CheckSvg />
        </div>
      )}
    </CardHeading>
    <CardContent>{tagline}</CardContent>
    <CardContent>{location}</CardContent>
  </Card>
)

export default injectSheet(styles)(ProfileCard)
