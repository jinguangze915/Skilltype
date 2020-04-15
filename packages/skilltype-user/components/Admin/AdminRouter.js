import React from 'react'
import Header from '../App/Header'
import { GuardRoleSkilltypeAdmin } from '../User/UserProvider'

const withAdminHeader = children => (
  <React.Fragment>
    <Header title="Admin" />
    {children}
  </React.Fragment>
)

/**
 * We use the GuardRoleSkilltypeAdmin to check the authenticated user's role
 * If the user does not meet the minimum role check, then they are redirectred
 * to a different page
 *
 * props.children are passed down so that AdminRouter can be used in App.js like so
 *
 *
 * <AdminRouter path="/admin">
 *   <AccessCodes path="/accessCodes"
 * </AdminRouter>
 */
const AdminRouter = ({ children }) => (
  <GuardRoleSkilltypeAdmin redirect="/">
    {withAdminHeader(children)}
  </GuardRoleSkilltypeAdmin>
)

export default AdminRouter
