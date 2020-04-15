import React from 'react'
import { func, shape } from 'prop-types'
import { withNotifyContext } from '@skilltype/ui/components/Notify/NotifyProvider'
import { withServiceContext } from '@skilltype/services/components/ServiceProvider'

const { Consumer, Provider } = React.createContext()

class OrganizationProvider extends React.Component {
  static propTypes = {
    notify: func.isRequired,
    notifyError: func.isRequired,
    serviceContext: shape({
      content: shape({}),
      user: shape({}),
      organization: shape({}),
    }),
  }

  static defaultProps = {}

  state = {
    isPending: false,
    organizations: null,
    organizationMap: null,
    organization: null,
    organizationProfile: null,
    organizationAffiliates: null,
  }

  organizationContext = {}

  /**
   * This method is used when a ROLE_ADMIN user is creating an organization
   */
  createOrganization = async (
    values,
    successMessage = `Successfully created organization`,
    errorMessage = `Something went wrong while creating the organization. Please try again later`
  ) => {
    if (this.state.isPending) return false
    this.setState({ isPending: true })
    try {
      await this.props.serviceContext.organization.createOrganization(values)
      this.setState({ isPending: false })
      this.props.notify(successMessage)
      return true
    } catch (error) {
      console.error(error)
      this.props.notifyError(errorMessage)
      this.setState({ isPending: false })
      return false
    }
  }

  /**
   * This method returns the list of organizations that the current authenitcated user has affiliated with
   */
  fetchUserOrganizations = async (
    _,
    errorMessage = 'Something went wrong while loading organizations. Please try again later'
  ) => {
    if (this.state.isPending) return false
    this.setState({ isPending: true })
    try {
      const organizations = await this.props.serviceContext.organization.getOrganizationsList()
      // Create a mapping from [id] -> organization for easier lookup
      const organizationMap = organizations.reduce(
        (map, org) => ({
          ...map,
          [org.id]: org,
        }),
        {}
      )
      this.setState({ isPending: false, organizations, organizationMap })
      return true
    } catch (error) {
      console.error(error)
      this.props.notifyError(errorMessage)
      this.setState({ isPending: false, organizations: [] })
      return false
    }
  }

  /**
   *  This method returns the data necessary to render a single organization card
   */
  fetchOrganization = async (
    id,
    _,
    errorMessage = 'Something went wrong while loading the organization. Please try again later'
  ) => {
    if (!id) return false
    if (this.state.isPending) return false
    this.setState({ isPending: true })
    try {
      // Attempt to hit the organizationMap cache and get the basic values for an organization
      if (this.state.organizationMap && this.state.organizationMap[id]) {
        const cachedOrg = this.state.organizationMap[id]
        this.setState({ isPending: false, organization: cachedOrg })
        return true
      }
      // Reach out to the network if we don't already have this value
      // This happens when we load directly to /organizations/${id}/profile|affiliations|settings
      const organization = await this.props.serviceContext.organization.getOrganization(
        id
      )
      this.setState({ isPending: false, organization })
      return true
    } catch (error) {
      console.error(error)
      this.setState({ isPending: false, organization: null })
      this.props.notifyError(errorMessage)
      return false
    }
  }

  /**
   * This method is used when updating the settings for an organization
   */
  saveOrganization = async (
    id,
    values,
    successMessage = 'Organization updated.',
    errorMessage = 'Something went wrong while updating settings. Please try again later.'
  ) => {
    if (this.state.isPending) return false
    this.setState({ isPending: true })
    try {
      const { location, ...oldOrganization } = this.state.organization
      const newOrganization = {
        ...oldOrganization,
        ...values,
      }
      const organization = await this.props.serviceContext.organization.saveOrganization(
        id,
        newOrganization
      )
      // Update the current organization value with the submitted values (if HTTP status 200)
      this.setState({ isPending: false, organization })
      this.props.notify(successMessage)
      return true
    } catch (error) {
      console.error(error)
      this.setState({ isPending: false })
      this.props.notifyError(errorMessage)
      return false
    }
  }

  /**
   * This method is used for getting an organization's profile values
   */
  fetchOrganizationProfile = async (
    id,
    _,
    errorMessage = 'Something went wrong while loading the organization. Please try again later'
  ) => {
    if (!id) return false
    if (this.state.isPending) return false
    this.setState({ isPending: true })
    try {
      // Reach out to the network if we don't already have this value
      // This happens when we load directly to /organizations/${id}/profile|affiliations|settings
      const organizationProfile = await this.props.serviceContext.organization.getOrganizationProfile(
        id
      )
      this.setState({ isPending: false, organizationProfile })
      return true
    } catch (error) {
      console.error(error)
      this.setState({ isPending: false, organizationProfile: null })
      this.props.notifyError(errorMessage)
      return false
    }
  }

  /**
   * TODO @jacob: This needs to be implemented in the ServiceProvider
   * TODO @jacob: Need to fetch real results
   */
  fetchOrganizationAffiliates = async (
    id,
    _,
    errorMessage = 'Something went wrong while loading affiliates. Please try again later'
  ) => {
    if (!id) return false
    if (this.state.isPending) return false
    this.setState({ isPending: true })
    try {
      const organizationAffiliates = await this.props.serviceContext.organization.getOrganizationAffiliates(
        id
      )
      const affiliatesData = organizationAffiliates.map(item => {
        const status = item.revokedAccessDate ? 'Inactive' : 'Active'
        return [item.id, item.affiliate, item.relationship, status]
      })
      this.setState({
        isPending: false,
        organizationAffiliates: affiliatesData,
      })
      return true
    } catch (error) {
      console.error(error)
      this.setState({ isPending: false })
      this.props.notifyError(errorMessage)
      return false
    }
  }

  saveOrganizationProfie = async (
    id,
    values,
    _,
    errorMessage = 'Something went wrong while loading the organization. Please try again later'
  ) => {
    if (!id) return false
    if (this.state.isPending) return false
    this.setState({ isPending: true })
    try {
      // Reach out to the network if we don't already have this value
      // This happens when we load directly to /organizations/${id}/profile|affiliations|settings
      await this.props.serviceContext.organization.saveOrganizationProfile(
        id,
        values
      )
      this.setState({ isPending: false, organizationProfile: values })
      return true
    } catch (error) {
      console.error(error)
      this.setState({ isPending: false })
      this.props.notifyError(errorMessage)
      return false
    }
  }

  /**
   * This method is used when requesting deletion of an organization
   */
  deleteOrganization = async (
    id,
    successMessage = 'Your request has been recieved',
    errorMessage = 'Something went wrong while requesting deletion. Please try again later'
  ) => {
    if (this.state.isPending) return false
    this.setState({ isPending: true })
    try {
      await this.props.serviceContext.organization.deleteOrganization(id)
      this.setState({ isPending: false })
      this.props.notify(successMessage)
      return true
    } catch (error) {
      this.setState({ isPending: false })
      this.props.notifyError(errorMessage)
      return false
    }
  }

  render() {
    const organizationContext = {
      createOrganization: this.createOrganization,
      fetchUserOrganizations: this.fetchUserOrganizations,
      fetchOrganization: this.fetchOrganization,
      fetchOrganizationProfile: this.fetchOrganizationProfile,
      fetchOrganizationAffiliates: this.fetchOrganizationAffiliates,
      saveOrganizationProfile: this.saveOrganizationProfie,
      saveOrganization: this.saveOrganization,
      deleteOrganization: this.deleteOrganization,
      ...this.state,
    }
    return (
      <Provider value={organizationContext}>{this.props.children}</Provider>
    )
  }
}

export default withNotifyContext(withServiceContext(OrganizationProvider))

export const withOrganizationContext = Wrapped => props => (
  <Consumer>
    {context => {
      if (!context) {
        console.warn(
          'withOrganizationContext component wrapped in OrganizationProvider',
          Wrapped
        )
        return <Wrapped {...props} />
      }

      return <Wrapped {...props} organizationContext={context} />
    }}
  </Consumer>
)
