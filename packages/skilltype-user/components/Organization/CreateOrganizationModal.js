import React from 'react'
import { string, shape } from 'prop-types'
import Modal from '@skilltype/ui/components/Modal/Modal'
import SubmitButton from '@skilltype/ui/components/Button/SubmitButton'
import CreateOrganization from '@skilltype/ui/modules/Organization/CreateOrganization'
import { isMobileOrMobileOs } from '@skilltype/ui/lib/mediaQuery'
import { withOrganizationContext } from './OrganizationProvider'
import { withUserContext } from '../User/UserProvider'
import organizationTypes from './data/organization.types'

class CreateOrganizationModal extends React.Component {
  static propTypes = {
    user: shape({
      zipCode: string,
    }),
  }

  state = {
    modalContentRef: undefined,
    values: {
      zipCode: this.props.userContext && this.props.userContext.user.zipcode,
    },
  }

  setContextRef = context => {
    this.formContext = context
  }

  formContext = React.createRef()

  handleChange = ({ values }) => {
    this.setState({ values })
  }

  handleSubmit = (event, { isValid }) => {
    const { organizationContext } = this.props
    const { values } = this.state

    if (isValid) {
      organizationContext
        .createOrganization(values)
        .then(() => this.props.navigate('../', { state: { reload: true } }))
    }
  }

  submitFormContext = () => {
    if (this.formContext) {
      this.formContext.submit()
    }
  }

  dismissModal = () => this.props.navigate('../')

  render() {
    const { values, modalContentRef } = this.state
    return (
      <Modal
        title="Create Organization"
        appElementId="root"
        showOkButton
        OkButton={SubmitButton}
        okButtonLabel={isMobileOrMobileOs() ? 'Create' : 'Create Organization'}
        okIsEnabled={this.formContext.canSubmit}
        onOk={this.submitFormContext}
        onDismiss={this.dismissModal}
        okButtonWide
        shouldCloseOnEsc
        lockBodyScroll
        showCloseButton
        hasEditableContent
        wide
        fitContent
        modalProps={{
          // In order to get the dropdown menu for the Select component to
          // render *over* the modal content we need a ref to the Modal's
          // content element. Settings menuPortalTarget to this ref will
          // correctly render the Select menu on top of the Modal
          contentRef: node => {
            if (this.state.modalContentRef !== node) {
              this.setState({ modalContentRef: node })
            }
          },
        }}
      >
        <CreateOrganization
          menuPortalTarget={modalContentRef}
          values={values}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          contextRef={this.setContextRef}
          organizationTypes={organizationTypes}
        />
      </Modal>
    )
  }
}

export default withUserContext(withOrganizationContext(CreateOrganizationModal))
