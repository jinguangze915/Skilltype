import React from 'react'
import { Portal } from 'react-portal'
import Progress from './Progress'

const ProgressPortal = props => (
  <Portal>
    <Progress {...props} />
  </Portal>
)

export default ProgressPortal
