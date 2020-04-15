import { httpGet, httpPut } from '../lib/requestApi'

export const getUsersWithRoles = () => httpGet('/skilltype-admin/roles/users')

export const updateUserRole = ({ id, roleName }) =>
  httpPut(`/skilltype-admin/users/${id}/role`, { roleName })
export const inviteUsersOrganization = organizationId =>
  httpGet(`/user/invites/organization/${organizationId}`)
