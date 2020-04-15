import { getAuthCookie } from '@skilltype/services/lib/auth'
import { navigate } from '@reach/router'

const unauthenticatedRoutes = [
  '/login',
  '/login/',
  '/signup',
  '/signup/',
  '/passwordReset',
  '/passwordReset/',
  '/passwordReset/new',
  '/passwordReset/new/',
  '/passwordReset/invalidToken',
  '/passwordReset/invalidToken/',
]
const isAuthenticated = getAuthCookie()
const isOnAuthenticatedPage = !unauthenticatedRoutes.includes(
  window.location.pathname
)
if (!isAuthenticated && !isOnAuthenticatedPage) {
  import('./index.unauthenticated')
} else if (isAuthenticated && isOnAuthenticatedPage) {
  import('./index.authenticated')
} else if (!isAuthenticated && isOnAuthenticatedPage) {
  navigate('/login')
  import('./index.unauthenticated')
} else if (isAuthenticated && !isOnAuthenticatedPage) {
  navigate('/')
  import('./index.authenticated')
}
