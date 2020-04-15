import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import Section from './Section'
import styles from './styles'

const BulletSection = ({
  classes,
  className,
  children,
  icon,
  bigIcon,
  ...others
}) => (
  <Section
    className={classnames(className, classes.bulletSection, {
      [classes.bigIcon]: bigIcon,
    })}
    {...others}
  >
    {React.cloneElement(icon, {
      className: classes.bulletIcon,
    })}
    <div className={classes.bulletContent}>{children}</div>
  </Section>
)

export default injectSheet(styles)(BulletSection)
