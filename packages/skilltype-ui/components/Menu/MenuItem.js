import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import PrimaryTextButton from '../Button/PrimaryTextButton'
import { withMenuContext } from './Menu'
import styles from './styles'

class MenuItem extends React.Component {
  onClick = e => {
    if (this.props.onClick) {
      this.props.onClick(e, { id: this.props.id })
    }
  }
  render() {
    const {
      classes,
      className,
      children,
      style,
      href,
      active,
      activeTheme,
      ...others
    } = this.props
    const activeClassName = activeTheme ? `active_${activeTheme}` : 'active'
    return (
      <PrimaryTextButton
        style={style}
        className={classnames(className, classes.menuItem, {
          [classes[activeClassName]]: active,
        })}
        href={href}
        role="menuitem"
        {...others}
        onClick={this.onClick}
      >
        {children}
      </PrimaryTextButton>
    )
  }
}
export default injectSheet(styles)(withMenuContext(MenuItem))
