import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import Section from './Section'
import styles from './styles'

const FormSection = ({ classes, className, children, title, ...others }) => (
  <Section className={classnames([className, classes.formSection])} {...others}>
    {title && (
      <div
        className={classnames({
          [classes.formSectionTitle]: title,
        })}
      >
        {title}
      </div>
    )}
    {children}
  </Section>
)

export default injectSheet(styles)(FormSection)
