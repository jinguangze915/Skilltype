import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import Section from './Section'
import styles from './styles'

export const WARNING = 0
export const INFO = 1

const CalloutSection = ({
  classes,
  theme,
  className,
  children,
  calloutType,
  style,
  ...others
}) => {
  const backgroundColor = {
    [WARNING]: theme.warningCalloutBackgroundColor,
    [INFO]: theme.infoCalloutBackgroundColor,
  }[calloutType]
  return (
    <Section
      className={classnames(className, classes.calloutSection)}
      style={{ backgroundColor, ...style }}
      contentPadding
      {...others}
    >
      {children}
    </Section>
  )
}

export default injectSheet(styles)(CalloutSection)
