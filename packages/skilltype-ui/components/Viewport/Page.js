import React from 'react'
import { bool } from 'prop-types'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'

const Page = ({
  classes,
  className,
  children,
  style,
  centerContent,
  centerSelf,
}) => (
  <div
    className={classnames(className, classes.page, {
      [classes.centerContent]: centerContent,
      [classes.centerSelf]: centerSelf,
    })}
    style={style}
  >
    {children}
  </div>
)

Page.propTypes = {
  /**
   * Centers the children with `flex-direction: column` and `align-items: center`
   */
  centerContent: bool,
  /**
   * Centers the page componetn relative to the margin with `margin: 0 auto`
   */
  centerSelf: bool,
}

export default injectSheet(styles)(Page)
