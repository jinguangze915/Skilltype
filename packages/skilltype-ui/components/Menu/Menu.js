import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import MenuIcon from '@material-ui/icons/Menu'
import Popper from '@material-ui/core/Popper'
import createFocusTrap from 'focus-juggler'
import { func, bool, shape, string, oneOfType, element } from 'prop-types'
import isReact from 'is-react'
import TransparentButton from '../Button/TransparentButton'
import FullscreenModal from '../Modal/FullscreenModal'
import MenuContainer from './MenuContainer'
import Tablet from '../Responsive/Tablet'
import MobileOnly from '../Responsive/MobileOnly'
import styles from './styles'
import { getAriaProps } from '../../lib/props'

const { Consumer, Provider } = React.createContext()

class Menu extends React.Component {
  static propTypes = {
    alwaysCollapse: bool,
    controlled: bool,
    open: bool,
    activateTrapOnOpen: bool,
    onNavigate: func,
    onOpen: func,
    onActivate: func,
    onDismiss: func,
    renderOpener: func,
    modalProps: shape({ title: oneOfType([string, element]) }),
    appElementId: string,
    id: string,
    title: string,
    popperPlacement: string,
  }
  constructor(props) {
    super(props)
    this.openerRef = React.createRef()
  }
  state = {
    menuIsVisible: false,
  }
  onClickAway = e => {
    this.deactivateFocusTrap()
    if (e && e.target === this.openerRef.current) {
      return
    }
    this.dismiss()
  }
  onMenuToggle = () => {
    if (
      this.state.menuIsVisible ||
      (this.props.controlled && this.props.open)
    ) {
      this.deactivateFocusTrap()
      this.dismiss()
      return
    }
    this.open()
  }
  onNavigate = e => {
    this.onMenuToggle()
    if (this.props.onNavigate) {
      this.props.onNavigate(e)
    }
  }
  onMenuContentRef = ref => {
    if (!ref) {
      return
    }
    this.focusTrap = createFocusTrap(ref, {
      onDeactivate: () => this.dismiss(),
      returnFocusOnDeactivate: !this.props.controlled,
      trapVerticalArrows: true,
    })
    if (this.props.activateTrapOnOpen) {
      this.activateFocusTrap()
    }
  }
  onOpenerKeyDown = e => {
    if (this.props.disabled) {
      return
    }
    switch (e.keyCode) {
      case 40: {
        // Down arrow
        if (this.isOpen()) {
          this.activateFocusTrap()
        } else {
          this.onMenuToggle()
        }
        e.preventDefault()
        break
      }
      case 9: {
        // tab key
        if (this.isOpen() && !e.shiftKey) {
          this.activateFocusTrap()
          e.preventDefault()
        }
        break
      }
      default: {
        break
      }
    }
  }
  open = () => {
    if (this.props.onOpen) {
      this.props.onOpen()
    }
    if (this.props.controlled) {
      return
    }
    this.setState({ menuIsVisible: true })
  }
  dismiss = () => {
    if (this.props.onDismiss) {
      this.props.onDismiss()
    }
    if (this.props.controlled) {
      return
    }
    this.setState({ menuIsVisible: false })
  }
  activateFocusTrap = () => {
    if (!this.focusTrap) {
      return
    }
    this.focusTrap.activate()
    if (this.props.onActivate) {
      this.props.onActivate()
    }
  }
  deactivateFocusTrap = () => {
    if (this.focusTrap) {
      this.focusTrap.deactivate({ onDeactivate: null })
    }
  }
  isOpen = () =>
    this.props.controlled ? this.props.open : this.state.menuIsVisible
  render() {
    const {
      classes,
      className,
      children,
      style,
      alwaysCollapse,
      renderOpener,
      modalProps,
      appElementId,
      id,
      title,
      ...others
    } = this.props
    const _children = React.Children.map(children, child =>
      React.cloneElement(child, isReact.component(child) ? { classes } : {})
    )
    return (
      <MenuProvider onNavigate={this.onNavigate}>
        <div
          className={classnames(className, classes.menu, {
            [classes.alwaysCollapse]: alwaysCollapse,
          })}
          style={style}
        >
          {renderOpener({
            buttonProps: {
              onClick: this.onMenuToggle,
              buttonRef: this.openerRef,
              onKeyDown: this.onOpenerKeyDown,
              'aria-owns': id,
              'aria-haspopup': 'menu',
              'aria-label': 'open menu',
              highlight: this.isOpen(),
              ...getAriaProps(others),
            },
            classes,
          })}
          <MobileOnly>
            {this.isOpen() && (
              <FullscreenModal
                onDismiss={this.onMenuToggle}
                appElementId={appElementId}
                id={id}
                {...modalProps}
              >
                {_children}
              </FullscreenModal>
            )}
          </MobileOnly>
          <Tablet>
            {alwaysCollapse ? (
              <Popper
                open={this.isOpen()}
                anchorEl={this.openerRef.current}
                disablePortal
                placement={this.props.popperPlacement}
                role="menu"
                id={id}
              >
                <MenuContainer
                  title={title}
                  onClickAway={this.onClickAway}
                  classes={classes}
                  contentRef={this.onMenuContentRef}
                  onWillUnmount={this.deactivateFocusTrap}
                >
                  {_children}
                </MenuContainer>
              </Popper>
            ) : (
              _children
            )}
          </Tablet>
        </div>
      </MenuProvider>
    )
  }
}

Menu.defaultProps = {
  renderOpener: ({ buttonProps, classes }) => (
    <TransparentButton className={classes.menuButton} {...buttonProps}>
      <MenuIcon />
    </TransparentButton>
  ),
  appElementId: 'root',
  modalProps: {},
  popperPlacement: 'bottom-start',
}

const withMenuContext = Wrapped => props => (
  <Consumer>
    {context => {
      if (!context) {
        console.warn('MenuItem is not wrapped in a menu context provider.')
        return <Wrapped {...props} />
      }
      return (
        <Wrapped
          onClick={context.onNavigate}
          {...props}
          active={
            context.onCheckActive && context.onCheckActive(props, context)
          }
          activeTheme={context.activeItemTheme}
        />
      )
    }}
  </Consumer>
)

const MenuProvider = ({
  onNavigate,
  onCheckActive,
  activeItemTheme,
  children,
}) => (
  <Provider value={{ onNavigate, onCheckActive, activeItemTheme }}>
    {children}
  </Provider>
)

MenuProvider.propTypes = {
  onCheckActive: func,
  onNavigate: func,
  activeItemTheme: string,
}

export default injectSheet(styles)(Menu)
export { MenuProvider, withMenuContext }
