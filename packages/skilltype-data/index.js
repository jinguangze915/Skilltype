// Functions
import {
  dedupe,
  normalizeTagData,
  prefixTagData,
  pick,
  pickFirst,
  find,
  getExcluding,
} from './utils'

import affiliations from './data/affiliations'
import memberships from './data/memberships.json'
import products from './data/products.json'
import skills from './data/skills.json'
import strategicDirections from './data/strategicDirections.json'
import teams from './data/teams.json'

// Tag Groups
import profileTagGroups from './profile.tagGroups'
import organizationTagGroups from './organization.tagGroups'

export {
  affiliations,
  memberships,
  products,
  skills,
  strategicDirections,
  teams,
  profileTagGroups,
  organizationTagGroups,
  // utils
  dedupe,
  normalizeTagData,
  prefixTagData,
  pick,
  pickFirst,
  find,
  getExcluding,
}
