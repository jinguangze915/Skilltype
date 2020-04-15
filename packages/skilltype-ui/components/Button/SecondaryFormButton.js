import React from 'react'
import injectSheet from 'react-jss'
import SecondaryTextButton from './SecondaryTextButton'
import { withFormContext } from '../Form/Form'
import styles from './styles'

const SecondaryFormButton = ({ children, ...others }) => (
  <SecondaryTextButton {...others}>{children}</SecondaryTextButton>
)

export default injectSheet(styles)(withFormContext(SecondaryFormButton))
