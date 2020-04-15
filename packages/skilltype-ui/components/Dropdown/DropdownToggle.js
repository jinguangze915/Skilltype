import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'

class DropdownToggle extends React.Component {
  state = {
    opened: false,
  }

  onClick = () => {
    const { opened } = this.state
    const { onClick } = this.props

    this.setState(
      {
        opened: !opened,
      },
      () => {
        if (!opened) {
          document.addEventListener('click', this.closeDropdown)
        }

        if (onClick) {
          onClick()
        }
      }
    )
  }

  closeDropdown = () => {
    this.setState(
      {
        opened: false,
      },
      () => document.removeEventListener('click', this.closeDropdown)
    )
  }

  render() {
    const { classes, className, children, style } = this.props
    const { opened } = this.state

    return (
      <button
        className={classnames(className, classes.toggle, {
          [classes.opened]: opened,
        })}
        style={style}
        onClick={this.onClick}
      >
        <div className={classnames(classes.label)}>{children}</div>
        <svg
          height="20"
          width="20"
          viewBox="0 0 20 20"
          className={classnames(classes.icon)}
        >
          <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
        </svg>
      </button>
    )
  }
}

export default injectSheet(styles)(DropdownToggle)
