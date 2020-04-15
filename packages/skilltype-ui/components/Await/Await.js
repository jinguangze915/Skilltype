/* eslint-disable no-restricted-syntax */
import React from 'react'
import { UnauthorizedError } from '@skilltype/services/lib/request'
import bugsnagClient from '@skilltype/services/lib/bugsnag'
import { withNotifyContext } from '../Notify/NotifyProvider'
import Progress from '../../components/Progress/Progress'

export default class Await extends React.Component {
  state = {
    error: false,
  }
  componentDidMount() {
    const child = React.Children.only(this.props.children)
    const promises = []
    Object.keys(child.props).forEach(prop => {
      if (child.props[prop] instanceof Promise) {
        child.props[prop].catch(error => {
          if (error instanceof UnauthorizedError) {
            // we don't need to notify, we should be redirecting
            return
          }
          console.error(error)
          bugsnagClient.notify(error, {
            beforeSend: report => {
              report.metaData = error.info
            },
          })
          this.setState({ error })
        })
        promises.push(child.props[prop])
      }
    })
    // HACK: we need to re-render when the promises return (even though the
    //  parent should already be re-rendering) to fix the weird JSS bug
    Promise.all(promises).then(() => {
      this.setState({ loaded: true })
    })
  }
  render() {
    const { loadingFallback, errorFallback, children } = this.props
    if (this.state.error) {
      return React.cloneElement(errorFallback, { error: this.state.error })
    }
    const child = React.Children.only(children)
    if (!this.state.loaded) {
      return loadingFallback
    }
    for (const prop of Object.keys(child.props)) {
      if (child.props[prop] instanceof Promise) {
        return loadingFallback
      }
    }
    return child
  }
}

const DefaultErrorFallback = withNotifyContext(({ notifyError }) => {
  notifyError('Network error. Please try again later.')
  return null
})
const DefaultLoadingFallback = () => <Progress />

Await.defaultProps = {
  errorFallback: <DefaultErrorFallback />,
  loadingFallback: <DefaultLoadingFallback />,
}

export const withAwait = (
  Wrapped,
  LoadingFallback = DefaultLoadingFallback,
  ErrorFallback = DefaultErrorFallback
) => props => (
  <Await
    loadingFallback={<LoadingFallback />}
    errorFallback={<ErrorFallback />}
  >
    <Wrapped {...props} />
  </Await>
)
