import React from 'react'
import { string, func, shape } from 'prop-types'
import injectSheet from 'react-jss'
import RaisedSection from '@skilltype/ui/components/Section/RaisedSection'
import Form from '@skilltype/ui/components/Form/Form'
import TextField from '@skilltype/ui/components/Form/Fields/TextField'
import SelectField from '@skilltype/ui/components/Form/Fields/SelectField'
import ZipField from '@skilltype/ui/components/Form/Fields/ZipField'
import ColorPickerField from '@skilltype/ui/components/Form/Fields/ColorPickerField'
import SubmitButton from '@skilltype/ui/components/Button/SubmitButton'
import SecondaryButton from '@skilltype/ui/components/Button/SecondaryButton'
import Modal from '@skilltype/ui/components/Modal/Modal'
import { withNotifyContext } from '@skilltype/ui/components/Notify/NotifyProvider'
// eslint-disable-next-line
import { withOrganizationContext } from '@skilltype/user/components/Organization/OrganizationProvider'
import { profileThemes } from '@skilltype/ui/shared-styles'
import styles from './styles'

const options = [
  { label: 'University', value: 'university' },
  { label: 'Vendor', value: 'vendor' },
  { label: 'Library', value: 'library' },
  { label: 'Consortium', value: 'consortium' },
  { label: 'Association', value: 'association' },
  { label: 'Community', value: 'community' },
]

class Settings extends React.Component {
  static propTypes = {
    organization: shape({
      fullName: string.isRequired,
      type: string.isRequired,
      cardColor: string.isRequired,
      zipCode: string.isRequired,
    }),
    saveOrganization: func.isRequired,
  }
  state = {
    showModal: false,
    values: this.props.organization || {},
  }

  handleChange = ({ values }) => {
    this.setState({ values })
  }

  handleSubmit = () => {
    this.props.saveOrganization(this.state.values)
  }

  openModal = () => {
    this.setState({ showModal: true })
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  deleteOrganization = () => {
    this.setState({ showModal: false })
    this.props.organizationContext
      .deleteOrganization(this.state.values.id)
      .then(() => {
        this.props.organizationContext.organizations.forEach(
          (valor, indice) => {
            if (this.state.values.id === valor.id) {
              this.props.organizationContext.organizations.splice(indice, 1)
            }
          }
        )
        this.props.navigate('/organizations', { state: { reload: true } })
        this.setState({ values: {} })
      })
  }

  render() {
    const { theme, classes } = this.props
    const { showModal } = this.state
    const userProfileThemes = Object.keys(profileThemes(theme).organization)
    return (
      <React.Fragment>
        <RaisedSection title="Settings" contentPadding>
          <Form
            id="organizationSettings"
            values={this.state.values}
            disableSubmitUntilValid={false}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          >
            <TextField id="fullName" label="Name" />
            <SelectField id="type" label="Type" options={options} />
            <TextField id="url" label="Website URL" placeholder="https://" />
            <TextField id="emailDomain" label="Email Domain" placeholder="" />
            <ZipField id="zipCode" label="Zipcode" />
            <ColorPickerField
              id="cardColor"
              label="Card Color"
              colors={userProfileThemes}
            />
            <SubmitButton style={{ marginTop: '2em', marginBottom: '-2em' }}>
              Update
            </SubmitButton>
          </Form>
        </RaisedSection>
        <RaisedSection
          contentPadding
          style={{
            lineHeight: '1',
          }}
        >
          <div className={classes.requestDeletion}>
            <div>
              <p className={classes.requestDeletionTitle}>
                Request Organization Deletion
              </p>
              <p>
                Once we process the deletion, it will be gone forever. Please be
                certain.
              </p>
            </div>
            <SecondaryButton
              onClick={this.openModal}
              className={classes.requestDeletionButton}
            >
              Request Delete
            </SecondaryButton>
          </div>
        </RaisedSection>
        {showModal && (
          <Modal
            title="Delete Organization"
            prompt
            showOkButton
            okButtonLabel="Delete"
            showCloseButton
            showCancelButton
            onOk={this.deleteOrganization}
            onDismiss={this.closeModal}
            onCancel={this.closeModal}
          >
            <div className={classes.confirmMessage}>
              Are you sure you want to permanently delete this organization from
              Skilltype?
            </div>
          </Modal>
        )}
      </React.Fragment>
    )
  }
}

export default injectSheet(styles)(
  withOrganizationContext(withNotifyContext(Settings))
)
