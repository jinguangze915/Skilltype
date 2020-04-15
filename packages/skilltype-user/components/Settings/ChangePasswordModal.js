import React from 'react'
import { func } from 'prop-types'
import Modal from '@skilltype/ui/components/Modal/Modal'
import SubmitButton from '@skilltype/ui/components/Button/SubmitButton'
import ChangePasswordForm from './ChangePasswordForm'
import { withUserContext } from '../User/UserProvider'

class ChangePasswordModal extends React.Component {
  static propTypes = {
    navigate: func.isRequired,
  }

  state = {
    values: {},
  }

  setContextRef = context => {
    this.formContext = context
  }

  formContext = React.createRef()

  handleClose = () => {
    this.props.navigate('../')
  }

  handleChange = ({ values }) => {
    this.setState({ values })
  }

  handleSubmit = async () => {
    const { values } = this.state
    await this.props.userContext.changePassword(values)
    this.props.navigate('../')
  }

  render() {
    return (
      <Modal
        title="Change Password"
        appElementId="root"
        showOkButton
        OkButton={SubmitButton}
        okButtonLabel="Update"
        okIsEnabled={this.formContext.canSubmit}
        cancelButtonLabel="Cancel"
        showCancelButton
        onCancel={this.handleClose}
        onDismiss={this.handleClose}
        cancelIsEnabled
        onOk={this.handleSubmit}
        shouldCloseOnEsc
        lockBodyScroll
        showCloseButton
        hasEditableContent
        wide
        fitContent
      >
        <ChangePasswordForm
          values={this.state.values}
          handleChange={this.handleChange}
          hideModal={this.handleClose}
          onSave={() => {}}
        />
      </Modal>
    )
  }
}

export default withUserContext(ChangePasswordModal)
