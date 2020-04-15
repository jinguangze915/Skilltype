/* eslint-disable
  jsx-a11y/click-events-have-key-events,
  jsx-a11y/no-noninteractive-element-interactions,
  jsx-a11y/no-static-element-interactions,
*/
import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import Color from 'color'
import styles from './styles'
import profileThemes from '../../shared-styles/profileThemes'
import { getAriaProps } from '../../lib/props'

const Tag = ({
  id,
  classes,
  theme,
  tagTheme,
  className,
  children,
  style,
  isActive,
  onClick,
  tagRef,
  ...others
}) => {
  const pt = profileThemes(theme).all
  const tagStyle = (style || tagTheme) && {
    ...(tagTheme
      ? {
          backgroundColor: isActive
            ? Color(pt[tagTheme].backgroundColor).darken(0.25)
            : Color(pt[tagTheme].backgroundColor),
        }
      : {}),
    ...style,
  }
  return (
    <div
      id={id}
      className={classnames(className, classes.tag, {
        [classes.active]: isActive,
        [classes.clickable]: onClick,
      })}
      style={tagStyle}
      onClick={onClick}
      ref={tagRef}
      {...getAriaProps(others)}
    >
      {children}
    </div>
  )
}

export default injectSheet(styles)(Tag)
