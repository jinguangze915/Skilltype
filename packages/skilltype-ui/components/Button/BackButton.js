import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'
import TransparentButton from './TransparentButton'
import ArrowSvg from '../../assets/arrow.svg'

const BackButton = ({ classes, className, onClick }) => (
  <TransparentButton
    className={classnames([className, classes.backButton])}
    onClick={onClick}
    aria-label="back"
  >
    <ArrowSvg />
  </TransparentButton>
)

export default injectSheet(styles)(BackButton)
