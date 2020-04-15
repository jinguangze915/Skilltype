import React from 'react'
import * as admin from '../admin'
import * as user from '../user'
import * as organization from '../organization'
import * as content from '../content'
import * as resource from '../resource'

const { Consumer, Provider } = React.createContext()

class ServiceProvider extends React.Component {
  static defaultProps = {
    services: { admin, user, content, organization, resource },
  }
  render() {
    const { services, children } = this.props
    return <Provider value={services}>{children}</Provider>
  }
}

export default ServiceProvider

export const withServiceContext = Wrapped => props => (
  <Consumer>
    {context => {
      if (!context) {
        console.warn(
          'withServiceContext component not wrapped in a ServiceProvider',
          Wrapped
        )
        return <Wrapped {...props} />
      }
      return <Wrapped {...props} serviceContext={context} />
    }}
  </Consumer>
)
