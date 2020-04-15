import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import { string, func, number } from 'prop-types'
import styles from './styles'

const { Consumer, Provider } = React.createContext()

export const VERTICAL = 0
export const HORIZONTAL = 1

class RadioGroup extends React.Component {
  static propTypes = {
    onChange: func,
    orientation: number,
    value: string,
    id: string.isRequired,
  }
  constructor(props) {
    super(props)
    this.inputRefs = {}
    this.hasFocus = false
  }
  makeOnRadioClick = value => () => {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }
  render() {
    const {
      children,
      className,
      classes,
      orientation,
      value,
      id,
      style,
    } = this.props
    const currentContext = {
      makeOnRadioClick: this.makeOnRadioClick,
      makeInputRef: this.makeInputRef,
      value,
      classes,
      id,
    }
    return (
      <Provider value={currentContext}>
        <div
          className={classnames(className, classes.radioGroup, {
            [classes.vertical]: orientation === VERTICAL,
            [classes.horizontal]: orientation === HORIZONTAL,
          })}
          style={style}
        >
          {children}
        </div>
      </Provider>
    )
  }
}

export const withRadioGroupContext = Wrapped => ({
  disabled,
  value,
  ...others
}) => (
  <Consumer>
    {context => {
      if (!context) {
        return <Wrapped {...others} disabled={disabled} />
      }
      const { id } = context
      if (!id) {
        throw new Error('RadioGroupContext requires an id')
      }
      return (
        <Wrapped
          onClick={context.makeOnRadioClick(value)}
          name={id}
          id={`${id}_${value}`}
          value={value}
          checked={context.value === value}
          classes={context.classes}
          {...others}
        />
      )
    }}
  </Consumer>
)

RadioGroup.defaultProps = {
  orientation: VERTICAL,
}

export default injectSheet(styles)(RadioGroup)
