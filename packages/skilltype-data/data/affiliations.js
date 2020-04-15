import affiliationsJson from './affiliations.json'
import { dedupe, normalizeTagData } from '../utils'

const affiliations = dedupe(
  affiliationsJson
    .filter(org => org.location && org.latlng)
    .map(normalizeTagData)
).map((org, idx) => ({
  ...org,
  type:
    org.name.match(/library$/i) ||
    org.name.match(/^bibliotheque/i) ||
    org.name.match(/library system/i) ||
    org.name.match(/library district/i)
      ? 'library'
      : 'university',
  memberCount: [89, 98, 110, 45, 36, 220, 23][idx % 7],
  latlng: org.latlng
    .split(',')
    .splice(0, 2)
    .reverse()
    .map(n => parseFloat(n.replace('@', ''), 10)),
}))

export default affiliations
