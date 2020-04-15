import React from 'react'
import { func } from 'prop-types'
import { isMobile } from '@skilltype/ui/lib/mediaQuery'
import affiliationTypes from '@skilltype/data/data/affiliationTypes.json'
import Modal from '@skilltype/ui/components/Modal/Modal'
import PrimaryButton from '@skilltype/ui/components/Button/PrimaryButton'
import SecondaryButton from '@skilltype/ui/components/Button/SecondaryButton'
import PickOrganization from '@skilltype/ui/modules/Affiliation/PickOrganization'
import AffiliationPermissions from '@skilltype/ui/modules/Affiliation/AffiliationPermissions'
import { withServiceContext } from '@skilltype/services/components/ServiceProvider'
import { withNotifyContext } from '@skilltype/ui/components/Notify/NotifyProvider'

const PICKER_STEP = 0
const PERMISSIONS_STEP = 1
const DISCONNECT_STEP = 2

class RequestAffiliationModal extends React.Component {
  static propTypes = {
    onDismiss: func.isRequired,
  }
  state = {
    step: PICKER_STEP,
    values: {
      affiliationType: 'staff',
    },
    suggestions: [],
    memberStatus: 0,
  }

  componentDidMount() {
    this.props.serviceContext.organization
      .getOrganizationsAvailableToAffiliate()
      .then(suggestions => {
        this.setState({
          suggestions,
          organization: suggestions[0],
          organizations: suggestions,
          values: {
            ...this.state.values,
            organization: suggestions[0].uniqueName,
          },
          memberStatus: suggestions[0].affiliated ? 1 : 2,
        })
      })
  }

  onQueryChange = query => {
    const suggestions = this.state.organizations.filter(org =>
      org.fullName.toLowerCase().includes(query.toLowerCase())
    )

    this.setState({ suggestions })
  }

  onChange = values => {
    const suggestion = this.state.suggestions.find(
      org => org.uniqueName === values.organization
    )

    this.setState({
      values: {
        ...values,
        ...(values.organization === this.state.values.organization
          ? {}
          : { affiliationType: 'staff' }),
      },
      organization: suggestion,
      memberStatus: suggestion.affiliated ? 1 : 2,
    })
  }

  onOk = () => {
    if (this.state.step === PICKER_STEP) {
      const { memberStatus } = this.state
      if (memberStatus === 1) {
        this.setState({ step: DISCONNECT_STEP })
      } else {
        this.setState({ step: PERMISSIONS_STEP })
      }
    } else {
      this.dismissModal()

      const { organization, values } = this.state

      this.props.serviceContext.organization.requestAffiliation({
        organizationId: organization.id,
        relationship: values.affiliationType.toUpperCase(),
      })
    }
  }

  onCancel = () => {
    if (this.state.step === PICKER_STEP) {
      this.dismissModal()
    } else {
      this.setState({ step: PICKER_STEP })
    }
  }

  onDisconnect = () => {
    const { organization } = this.state
    const { notify, notifyError, notifyClose } = this.props

    this.props.serviceContext.organization
      .disconnectAffiliation({
        organizationId: organization.id,
      })
      .then(() => {
        this.dismissModal()
        notify('You have been disconnected.')
        notifyClose(2000)
      })
      .catch(e => {
        console.error(e)
        notifyError('Error Disconnecting Affiliation')
        notifyClose(2000)
      })
  }

  dismissModal = () => this.props.onDismiss()

  render() {
    const { values, step, memberStatus } = this.state
    const { permissionsContent } = this.props
    let okBtnLabel = 'Next'
    let okBtn = PrimaryButton
    if (step !== PERMISSIONS_STEP) {
      if (memberStatus === 1) {
        okBtnLabel = 'Disconnect'
        okBtn = ({ children, style, ...props }) => (
          <PrimaryButton
            style={{ backgroundColor: '#D0021B', borderColor: '#D0021B' }}
            {...props}
          >
            {children}
          </PrimaryButton>
        )
      } else if (memberStatus === 2) {
        okBtnLabel = 'Connect'
      }
    } else {
      okBtnLabel = isMobile() ? 'Submit' : 'Submit Request'
    }

    return (
      <React.Fragment>
        <Modal
          title="Request Affiliation"
          appElementId="root"
          showOkButton
          OkButton={okBtn}
          okButtonLabel={okBtnLabel}
          showCancelButton
          CancelButton={SecondaryButton}
          cancelButtonLabel={step === PICKER_STEP ? 'Cancel' : 'Back'}
          onOk={this.onOk}
          onDismiss={this.dismissModal}
          onCancel={this.onCancel}
          okButtonWide
          shouldCloseOnEsc
          lockBodyScroll
          showCloseButton
          hasEditableContent
          wide
          fitContent
          contentHandlesScroll={step !== PERMISSIONS_STEP}
        >
          {step === PERMISSIONS_STEP ? (
            <AffiliationPermissions
              data={permissionsContent.find(
                c => c.affiliationType === values.affiliationType
              )}
              organization={this.state.organization}
            />
          ) : (
            <PickOrganization
              affiliationTypes={affiliationTypes}
              values={values}
              onChange={this.onChange}
              suggestions={this.state.suggestions}
              onQueryChange={this.onQueryChange}
            />
          )}
        </Modal>
        {step === DISCONNECT_STEP && (
          <Modal
            title="Disconnect from Organization"
            prompt
            showOkButton
            OkButton={okBtn}
            okButtonLabel={okBtnLabel}
            showCancelButton
            onOk={this.onDisconnect}
            onDismiss={this.onCancel}
            onCancel={this.onCancel}
            okButtonWide
            shouldCloseOnEsc
            lockBodyScroll
            showCloseButton
          >
            <div
              style={{
                fontFamily: '"-apple-system", "Helvetica", sans-serif',
                fontSize: '14px',
              }}
            >
              Are you sure you want to permanently disconnect form this
              organization?
            </div>
          </Modal>
        )}
      </React.Fragment>
    )
  }
}

export default withServiceContext(withNotifyContext(RequestAffiliationModal))
