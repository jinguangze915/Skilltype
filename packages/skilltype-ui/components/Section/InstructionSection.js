import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import Section from './Section'
import styles from './styles'

const InstructionSection = ({ classes, className, children, style }) => (
  <Section
    className={classnames(className, classes.instructionSection)}
    style={style}
  >
    {children}
  </Section>
)

export default injectSheet(styles)(InstructionSection)
