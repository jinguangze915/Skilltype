import { deleteAuthCookie } from '@skilltype/services/lib/auth'
import { shutdown as shutdownIntercom } from '@skilltype/services/lib/intercom'

const Logout = () => {
  deleteAuthCookie()
  shutdownIntercom()
  window.location = '/login'
  return null
}

export default Logout
