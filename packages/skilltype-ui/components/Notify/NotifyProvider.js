import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import bugsnagClient from '@skilltype/services/lib/bugsnag'
import { UnauthorizedError } from '@skilltype/services/lib/request'
import Notify from './Notify'
import NotifyError from './NotifyError'

const { Consumer, Provider } = React.createContext()

class NotifyProvider extends React.Component {
  constructor(props) {
    super(props)
    this.currentContext = this.getBaseContext()
  }
  state = {
    isOpen: false,
    isClosing: false,
    NotifyComponent: Notify,
    message: null,
    errorWasCaught: false,
  }
  onClose = () =>
    this.setState({ isOpen: false, isClosing: true }, () =>
      setTimeout(() => this.setState({ isClosing: false }))
    )
  getBaseContext = () => ({
    notify: msg => this.notify({ message: msg, component: Notify }),
    notifyError: msg => this.notify({ message: msg, component: NotifyError }),
    notifyClose: (time = 0) => setTimeout(this.onClose, time),
  })

  componentDidCatch(error, info) {
    if (error instanceof UnauthorizedError) {
      // we don't need to notify, we should be redirecting
      return
    }
    bugsnagClient.notify(error, {
      beforeSend: report => {
        report.metaData = info || error.info
      },
    })
    this.setState({
      isOpen: true,
      NotifyComponent: NotifyError,
      message: 'Uh oh, something went wrong',
      errorWasCaught: true,
    })
  }
  notify = ({ message, component }) => {
    const open = () =>
      this.setState({
        isOpen: true,
        message,
        NotifyComponent: component,
      })
    if (this.state.isClosing) {
      setTimeout(open, 300)
    } else {
      open()
    }
  }
  render() {
    const { NotifyComponent, message, isOpen } = this.state
    return (
      <Provider value={this.currentContext}>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={isOpen}
          onClose={this.onClose}
        >
          <NotifyComponent show onClose={this.onClose} id={this.props.id}>
            {message}
          </NotifyComponent>
        </Snackbar>
        {!this.state.errorWasCaught && this.props.children}
      </Provider>
    )
  }
}

export default NotifyProvider

export const withNotifyContext = Wrapped => props => (
  <Consumer>
    {context => {
      if (!context) {
        console.warn(
          'withNotifyContext component not wrapped in a NotifyProvider'
        )
        return <Wrapped {...props} />
      }
      return <Wrapped {...props} {...context} />
    }}
  </Consumer>
)
