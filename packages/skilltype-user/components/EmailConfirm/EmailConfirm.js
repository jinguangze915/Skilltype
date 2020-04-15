import React, { Component } from 'react'
import qs from 'qs'
import Progress from '@skilltype/ui/components/Progress/Progress'
import { withNotifyContext } from '@skilltype/ui/components/Notify/NotifyProvider'
import { withUserContext } from '../../../skilltype-user/components/User/UserProvider'

class EmailConfirm extends Component {
  componentDidMount() {
    const { notify, notifyError, notifyClose } = this.props
    const { token } = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    })
    this.props.userContext
      .confirmEmail(token)
      .then(() => {
        this.props.navigate('/')
        notify('Email has been confirmed successfully.')
        notifyClose(2000)
      })
      .catch(err => {
        console.error(err)
        this.props.navigate('/')
        notifyError('Failed to confirm email.')
        notifyClose(2000)
      })
  }

  render() {
    return <Progress />
  }
}

export default withNotifyContext(withUserContext(EmailConfirm))
