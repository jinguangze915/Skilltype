/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import createFocusTrap from 'focus-juggler'
import { number, bool, string } from 'prop-types'
import { MenuProvider } from '../Menu/Menu'
import styles from './styles'

const { Consumer, Provider } = React.createContext()

class MenuBar extends React.Component {
  static propTypes = {
    disabled: bool,
    pinned: bool,
    height: number,
    vertical: bool,
    activeItemTheme: string,
  }
  constructor(props) {
    super(props)
    this.baseContext = this.getBaseContext()
    this.currentContext = this.baseContext
    this.state = {
      activeIndex: 0,
      isOpen: false,
      wasOpen: false,
      childIsActive: false,
    }
    this.keyboardMode = false
  }
  componentWillUnmount() {
    if (this.focusTrap) {
      this.focusTrap.destroy()
    }
  }
  onMenuRef = e => {
    if (!e) {
      return
    }
    this.focusTrap = createFocusTrap(e, {
      trapHorizontalArrows: !this.props.vertical,
      trapVerticalArrows: this.props.vertical,
      trapTabs: false,
      trapFocus: false,
      escapeDeactivates: false,
      returnFocusOnDeactivate: false,
    })
  }
  onMouseDown = () => {
    this.keyboardMode = false
  }
  onKeyDown = e => {
    if (this.props.disabled) {
      return
    }
    this.keyboardMode = true
    switch (e.keyCode) {
      case 37: {
        // Left arrow
        if (this.props.vertical) {
          break
        }
        this.advanceActiveItem(-1)
        this.focusTrap.advanceOnUnpause(-1)
        break
      }
      case 38: {
        // Up arrow
        if (!this.props.vertical) {
          break
        }
        this.advanceActiveItem(-1)
        this.focusTrap.advanceOnUnpause(-1)
        break
      }
      case 39: {
        // Right arrow
        if (this.props.vertical) {
          break
        }
        this.advanceActiveItem(1)
        this.focusTrap.advanceOnUnpause(1)
        break
      }
      case 34: {
        // Down arrow
        if (!this.props.vertical) {
          break
        }
        this.advanceActiveItem(1)
        this.focusTrap.advanceOnUnpause(1)
        break
      }
      case 27: {
        // escape
        this.setState({ isOpen: false })
        this.focusTrap.stopIgnoringForwardTabs()
        break
      }
      case 9: {
        // tab
        if (e.shiftKey && !this.state.childIsActive) {
          // shift+tab
          if (this.state.activeIndex > 0) {
            setTimeout(() => this.advanceActiveItem(-1), 50)
          } else {
            this.focusTrap.stopIgnoringForwardTabs()
            this.setState({ isOpen: false, childIsActive: false })
          }
        }
        break
      }
      default: {
        break
      }
    }
  }
  getBaseContext = () => ({
    registerItem: () => {
      const itemIndex = this.itemCount
      this.itemCount += 1
      return itemIndex
    },
    makeOnOpen: activeIndex => () => {
      this.setState({ isOpen: true, activeIndex })
      this.focusTrap.ignoreForwardTabs()
    },
    onActivate: () => {
      this.setState({ childIsActive: true })
    },
    onDismiss: () => {
      this.setState({ isOpen: false, wasOpen: false, childIsActive: false })
      this.focusTrap.stopIgnoringForwardTabs()
    },
  })
  advanceActiveItem = incrementBy => {
    let nextIndex = this.state.activeIndex + incrementBy
    if (nextIndex === this.itemCount) {
      nextIndex = 0
    } else if (nextIndex < 0) {
      nextIndex = this.itemCount - 1
    }
    this.setState({
      activeIndex: nextIndex,
      wasOpen: this.state.isOpen,
      childIsActive: false,
    })
  }
  render() {
    const { classes, className, children, style, pinned, height } = this.props
    this.currentContext = {
      ...this.baseContext,
      activeIndex: this.state.activeIndex,
      isOpen: this.state.isOpen,
      wasOpen: this.state.wasOpen,
      keyboardMode: this.keyboardMode,
    }
    // reset item counter
    this.itemCount = 0
    return (
      <MenuProvider
        onNavigate={this.props.onNavigate}
        onCheckActive={this.props.onCheckActive}
        activeItemTheme={this.props.activeItemTheme}
      >
        <Provider value={this.currentContext}>
          <div
            className={classnames(className, classes.menuBar, {
              [classes.pinned]: pinned,
              [classes.container]: !pinned,
            })}
            style={{ ...(pinned ? { height } : {}), ...style }}
            role="menubar"
            ref={this.onMenuRef}
            tabIndex="-1"
            onKeyDown={this.onKeyDown}
            onMouseDown={this.onMouseDown}
          >
            {pinned ? (
              <div className={classes.container}>{children}</div>
            ) : (
              children
            )}
          </div>
        </Provider>
      </MenuProvider>
    )
  }
}

export default injectSheet(styles)(MenuBar)

export const withMenuBarContext = Wrapped => props => (
  <Consumer>
    {context => {
      if (!context) {
        console.warn('MenuBar child is not wrapped in a menu context provider.')
        return <Wrapped {...props} />
      }
      const index = context.registerItem()
      const open = context.isOpen && context.activeIndex === index
      const propsWithContext = {
        ...props,
        open,
        activateTrapOnOpen: open && !context.wasOpen && context.keyboardMode,
        onOpen: context.makeOnOpen(index),
        onActivate: context.onActivate,
        onDismiss: context.onDismiss,
        controlled: true,
        role: 'menuitem',
      }
      return <Wrapped {...propsWithContext} />
    }}
  </Consumer>
)
