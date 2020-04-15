import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import LinearProgress from '@material-ui/core/LinearProgress'
import styles from './styles'
import { getAriaProps } from '../../lib/props'

const Progress = ({ classes, className, inFullscreenModal, ...others }) => (
  <LinearProgress
    className={classnames(className, classes.progress, {
      [classes.inFullscreenModal]: inFullscreenModal,
    })}
    classes={{
      colorPrimary: classes.progressColor,
      barColorPrimary: classes.progressBarColor,
    }}
    {...getAriaProps(others)}
  />
)

export default injectSheet(styles)(Progress)
