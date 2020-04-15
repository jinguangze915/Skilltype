import React from 'react'
import classnames from 'classnames'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import injectSheet from 'react-jss'
import isReact from 'is-react'
import styles from './styles'

const MenuContainerInner = ({
  classes,
  className,
  style,
  contentRef,
  children,
  transparent,
}) => (
  <div
    className={classnames(className, classes.menuContainer, {
      [classes.transparent]: transparent,
    })}
    style={style}
    ref={contentRef}
  >
    {React.Children.map(children, child =>
      React.cloneElement(child, isReact.element(child) ? { classes } : {})
    )}
  </div>
)

class MenuContainer extends React.Component {
  componentWillUnmount() {
    if (this.props.onWillUnmount) {
      this.props.onWillUnmount()
    }
  }
  render() {
    const { children, onClickAway, ...others } = this.props
    return onClickAway ? (
      <ClickAwayListener onClickAway={onClickAway}>
        <MenuContainerInner {...others}>{children}</MenuContainerInner>
      </ClickAwayListener>
    ) : (
      <MenuContainerInner {...others}>{children}</MenuContainerInner>
    )
  }
}
export default injectSheet(styles)(MenuContainer)
