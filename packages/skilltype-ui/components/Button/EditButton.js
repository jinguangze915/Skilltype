import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'
import TransparentButton from './TransparentButton'
import EditSvg from '../../assets/edit.svg'

const EditButton = ({ classes, className, onClick, ...others }) => (
  <TransparentButton
    className={classnames([className, classes.editButton])}
    onClick={onClick}
    aria-label="edit"
    {...others}
  >
    <EditSvg />
    Edit
  </TransparentButton>
)

export default injectSheet(styles)(EditButton)
