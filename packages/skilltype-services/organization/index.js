import { httpGet, httpPost, httpPatch, httpDelete } from '../lib/requestApi'
import { findAffiliations } from './mocks/index'

// Organizations (for authenticated user only)
export const getOrganizationsList = () => httpGet('/organizations')

// Single organization endpoints
export const createOrganization = organization =>
  httpPost('/organizations', organization)

export const getOrganization = id => httpGet(`/organizations/${id}`)

export const saveOrganization = (id, organization) =>
  httpPatch(`/organizations/${id}`, organization)

export const deleteOrganization = id => httpDelete(`/organizations/${id}`, id)

// Single organization profile
export const getOrganizationProfile = id =>
  httpGet(`/organizations/${id}/profile`)

export const saveOrganizationProfile = (id, profile) =>
  httpPost(`/organizations/${id}/profile`, profile)

export const requestAffiliation = ({ organizationId, relationship }) =>
  httpPost(`/organizations/${organizationId}/affiliates`, { relationship })

export const disconnectAffiliation = ({ organizationId }) =>
  httpDelete(`/organizations/${organizationId}/affiliates`)

export const getOrganizationsAvailableToAffiliate = () =>
  httpGet('/organizations/available-to-affiliate')

export const getOrganizationAffiliates = organizationId =>
  httpGet(`/organizations/${organizationId}/affiliates`)

export const updateAffiliateRelationShip = (
  organizationId,
  affiliationId,
  reason,
  relationship
) =>
  httpPatch(`/organizations/${organizationId}/affiliates/${affiliationId}`, {
    reason,
    relationship,
  })

export { findAffiliations }
