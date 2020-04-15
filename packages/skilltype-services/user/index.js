import { httpDelete, httpGet, httpPost } from '../lib/requestApi'

export const getSettings = () => httpGet('/user/settings')
export const getProfile = () => httpGet('/user/profile')
export const saveSettings = values => httpPost('/user/settings', values)
export const saveProfile = values => httpPost('/user/profile', values)
export const changePassword = values =>
  httpPost('/user/change-password', values)
export const requestPasswordReset = ({ email }) =>
  httpPost('/user/passwordReset', email)
export const validateResetToken = token =>
  httpGet(`/user/passwordReset/${token}`)
export const confirmEmail = token => httpPost(`/user/email/${token}/confirm`)
export const resetPassword = ({ newPassword }, token) =>
  httpPost(`/user/passwordReset/${token}/confirm`, newPassword)
export const inviteUsers = values => {
  httpPost('/user/invites', values)
}
export const resendInvite = inviteId =>
  httpGet(`/user/invites/${inviteId}/resend`)
export const revokeInvite = inviteId => httpDelete(`/user/invites/${inviteId}`)
