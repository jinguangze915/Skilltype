import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'
import { getAriaProps } from '../../lib/props'

const TagList = ({
  id,
  classes,
  className,
  children,
  tagTheme,
  style,
  containerRef,
  onClick,
  isEditable,
  disabled,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
  noTagsMessage,
  ...others
}) => (
  <div
    id={id}
    className={classnames(className, classes.tagList)}
    style={style}
    ref={containerRef}
    {...(isEditable && !disabled
      ? {
          onFocus,
          onClick,
          onBlur,
          onKeyDown,
          onKeyUp,
          tabIndex: 0,
          role: 'listbox',
        }
      : {
          role: 'list',
          readOnly: true,
        })}
    {...getAriaProps(others)}
  >
    {React.Children.map(children, child =>
      React.cloneElement(child, {
        ...(tagTheme ? { tagTheme } : {}),
        ...(isEditable ? { role: 'option' } : { role: 'listitem' }),
        disabled,
      })
    )}
    {!children.length && <div className={classes.noTags}>{noTagsMessage}</div>}
  </div>
)

export default injectSheet(styles)(TagList)
