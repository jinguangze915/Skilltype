import { getJson, addClientVersionQs } from '@skilltype/services/lib/request'

export const getHomeMenu = () =>
  getJson(addClientVersionQs(process.env.REACT_APP_MENU_DATA_URL))

export const getProfileSections = () =>
  getJson(addClientVersionQs(process.env.REACT_APP_PROFILE_SECTIONS_URL))

export const getOrganizationProfileSections = () =>
  getJson(
    addClientVersionQs(process.env.REACT_APP_ORGANIZATION_PROFILE_SECTIONS_URL)
  )

export const getAffiliationPermissions = () =>
  getJson(addClientVersionQs(process.env.REACT_APP_AFFILIATION_PERMISSIONS_URL))
// TODO: Dead code as data now comes from @skilltype-data. Remove in later version
