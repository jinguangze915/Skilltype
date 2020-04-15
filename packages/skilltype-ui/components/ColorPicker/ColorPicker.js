import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'

const Color = ({ value, isSelected, disabled, classes, onClick }) => (
  <button
    className={classnames(classes.color, classes[value], {
      [classes.selected]: isSelected,
      [classes.disabled]: disabled,
    })}
    style={{ backgroundColor: value, marginTop: 0 }}
    onClick={e => {
      e.preventDefault()
      onClick(value)
    }}
  />
)

const makeHandleClick = onChange => color => {
  const event = { target: { value: color } }
  onChange(event)
}
const ColorPicker = ({ classes, value, colors, disabled, onChange }) => {
  const handleClick = disabled ? () => {} : makeHandleClick(onChange)
  return (
    <div className={classnames(classes.container)}>
      {colors.map((color, index) => (
        <Color
          key={index + color + (color === value)}
          value={color}
          isSelected={color === value}
          disabled={disabled}
          classes={classes}
          onClick={handleClick}
        />
      ))}
    </div>
  )
}

export default injectSheet(styles)(ColorPicker)
