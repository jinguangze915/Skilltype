import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import { withLocationContext } from '../Router/Router'
import styles from './styles'
import { getAriaProps } from '../../lib/props'

class Button extends React.Component {
  constructor(props) {
    super(props)
    this._isMounted = true
  }
  state = {
    touchDecayActive: false,
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  onClick = e => {
    // assume that if props.target is set this is an external link
    if (this.props.disabled) {
      e.preventDefault()
      return
    }
    // if it's not an external link, prevent default browser nav
    if (this.props.href && !this.props.target && !this.props.external) {
      e.preventDefault()
      // if navigate prop is set, do the nav here using locationContext
      if (this.props.navigate) {
        this.props.locationContext.navigate(this.props.href)
      }
    }
    // if it IS an external link, don't fire onClick (let browser handle nav)
    if (this.props.href && (this.props.target || this.props.external)) {
      return
    }
    if (this.props.onClick) {
      this.props.onClick(e)
    }
  }
  onTouchStart = () => {
    this.setState({ touchDecayActive: true })
    clearTimeout(this.decayTimer)
    this.decayTimer = setTimeout(
      () => this._isMounted && this.setState({ touchDecayActive: false }),
      this.props.touchDecayDuration
    )
  }
  render() {
    const {
      classes,
      className,
      style,
      children,
      disabled,
      type,
      href,
      target,
      buttonRef,
      tabIndex,
      highlight,
      onKeyDown,
      ...others
    } = this.props
    const Tag = href && !disabled ? 'a' : 'button'
    return (
      <Tag
        className={classnames(className, classes.button, {
          touchDecay: this.state.touchDecayActive,
          [classes.highlight]: highlight,
          disabled,
        })}
        style={style}
        disabled={disabled}
        tabIndex={tabIndex || 0}
        onClick={this.onClick}
        onKeyDown={onKeyDown}
        onTouchStart={this.onTouchStart}
        type={type}
        target={target}
        href={href}
        ref={buttonRef}
        {...getAriaProps(others)}
      >
        {children}
      </Tag>
    )
  }
}

Button.defaultProps = {
  touchDecayDuration: 800,
  type: 'button',
  elementProps: {},
}

export default withLocationContext(injectSheet(styles)(Button))
