import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import { string, bool, func } from 'prop-types'
import { withRadioGroupContext } from './RadioGroup'
import { getAriaProps } from '../../lib/props'
import styles from './styles'

class Radio extends React.Component {
  static propTypes = {
    label: string,
    onClick: func,
    value: string,
    disabled: bool,
    id: string,
  }
  onClick = e => {
    e.preventDefault()
    if (this.props.onClick) {
      this.props.onClick()
    }
  }
  render() {
    const {
      label,
      onClick,
      value,
      classes,
      className,
      style,
      id,
      disabled,
      name,
      checked,
      inputRef,
      ...other
    } = this.props
    return (
      <label
        className={classnames(className, classes.radio)}
        style={style}
        htmlFor={id}
      >
        <input
          type="radio"
          onChange={onClick}
          value={value}
          id={id}
          disabled={disabled}
          name={name}
          checked={checked}
          ref={inputRef}
          {...getAriaProps(other)}
        />
        <div className={classes.glyph} role="presentation" />
        {label}
      </label>
    )
  }
}

export default withRadioGroupContext(injectSheet(styles)(Radio))
