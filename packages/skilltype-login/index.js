import { getAuthCookie } from '@skilltype/services/lib/auth'

if (getAuthCookie()) {
  window.location = '/'
} else {
  import('./index.unauthenticated')
}
