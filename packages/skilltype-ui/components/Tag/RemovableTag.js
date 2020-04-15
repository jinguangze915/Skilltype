import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import Tag from './Tag'
import styles from './styles'
import Button from '../Button/Button'
import CloseSvg from '../../assets/close.svg'

const RemovableTag = ({
  classes,
  className,
  children,
  onRemove,
  disabled,
  ...others
}) => (
  <Tag
    className={classnames(className, classes.removableTag)}
    {...others}
    disabled={disabled}
    classes={classes}
  >
    <div className={classes.tagContent}>{children}</div>
    <Button
      className={classes.removeButton}
      tabIndex={-1}
      aria-hidden
      onClick={onRemove}
      disabled={disabled}
    >
      <CloseSvg />
    </Button>
  </Tag>
)

export default injectSheet(styles)(RemovableTag)
