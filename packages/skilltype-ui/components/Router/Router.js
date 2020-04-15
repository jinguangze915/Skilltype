import React from 'react'
import { Router as ReachRouter, Location, Redirect } from '@reach/router'
import { scrollTo } from '../../lib/dom'

class Router extends React.Component {
  constructor(props) {
    super(props)
    this.prevLocation = null
  }
  onNavigate = () => {
    // TODO: store breadcrumbs and restore scroll positions as expected
    if (this.props.resetScrollOnNavigate) {
      scrollTo(0)
    }
  }
  render() {
    const { children, others } = this.props
    return (
      <Location>
        {({ location }) => {
          if (location !== this.prevLocation) {
            this.onNavigate()
            this.prevLocation = location
          }
          return (
            <ReachRouter location={location} {...others}>
              {React.Children.map(
                children,
                child =>
                  child.type.name === 'Redirect'
                    ? React.cloneElement(child, { noThrow: true })
                    : child
              )}
            </ReachRouter>
          )
        }}
      </Location>
    )
  }
}

export default Router

const pathFromUri = uri => {
  let path = uri
  if (uri.match(/^http/)) {
    const url = new URL(uri)
    path = url.pathname
    return path
  }
  return uri
}

const trimmedPathFromUri = uri => {
  const path = pathFromUri(uri)
  return path.replace(/^\//, '').replace(/\/$/, '')
}

const withLocationContext = Wrapped => props => (
  <Location>
    {context => {
      if (!context) {
        console.warn(
          'withLocationContext component not wrapped in a LocationProvider',
          Wrapped
        )
        return <Wrapped {...props} />
      }
      return <Wrapped {...props} locationContext={context} />
    }}
  </Location>
)

export { pathFromUri, trimmedPathFromUri, Redirect, withLocationContext }
