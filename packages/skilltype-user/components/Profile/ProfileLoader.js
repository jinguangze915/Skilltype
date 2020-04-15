import { withAwait } from '@skilltype/ui/components/Await/Await'
import ProfileFallback from './ProfileFallback'
import Profile from './Profile'

export default withAwait(Profile, ProfileFallback)
