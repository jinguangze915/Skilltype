import React from 'react'
import { string, bool, node, shape, arrayOf, oneOfType } from 'prop-types'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import { getAriaProps } from '../../lib/props'
import styles from './styles'

const Section = ({
  classes,
  className,
  children,
  style,
  contentPadding,
  newGroup,
  tight,
  ...others
}) => (
  <section
    className={classnames([
      className,
      classes.section,
      {
        [classes.newGroup]: newGroup,
        [classes.contentPadding]: contentPadding,
        [classes.tight]: tight,
      },
    ])}
    style={style}
    {...getAriaProps(others)}
  >
    {children}
  </section>
)

Section.propTypes = {
  className: string,
  children: oneOfType([arrayOf(node), node]),
  /** Style override for <section> element */
  style: shape({}),
  /** Add padding around the child content */
  contentPadding: bool,
  /** Display a border-top above this section to visually separate from other sections */
  newGroup: bool,
}

export default injectSheet(styles)(Section)
