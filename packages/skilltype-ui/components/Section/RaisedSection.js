import React from 'react'
import { string, bool } from 'prop-types'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'
import Section from './Section'

const RaisedSection = ({
  title,
  classes,
  style,
  children,
  contentPadding,
  ...other
}) => (
  <Section
    className={classnames(classes.titledSection)}
    style={style}
    {...other}
  >
    {title && (
      <div
        className={classnames({
          [classes.title]: title,
        })}
      >
        {title}
      </div>
    )}
    <div
      className={classnames({
        [classes.contentPadding]: contentPadding,
      })}
    >
      {children}
    </div>
  </Section>
)

RaisedSection.propTypes = {
  title: string,
  contentPadding: bool,
}

RaisedSection.defaultProps = {
  contentPadding: false,
}

export default injectSheet(styles)(RaisedSection)
