import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import PrimaryButton from './PrimaryButton'
import { withFormContext } from '../Form/Form'
import styles from './styles'

const PrimaryButtonWithFormContext = withFormContext(
  ({ classes, formContext, className, children, disabled, ...others }) => (
    <PrimaryButton
      type="submit"
      className={classnames(className, classes.submitButton)}
      disabled={(formContext && !formContext.canSubmit) || disabled}
      {...others}
    >
      {children}
    </PrimaryButton>
  )
)

const SubmitButton = ({ children, ...others }) => (
  <PrimaryButtonWithFormContext alwaysUpdateOnFormChange {...others}>
    {children}
  </PrimaryButtonWithFormContext>
)

export default injectSheet(styles)(SubmitButton)
