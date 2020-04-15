import {
  find,
  pick,
  pickFirst,
  organizationTagGroups,
  affiliations,
} from '@skilltype/data'
import { delay } from '../../lib/mocks'

const { suggestionsByType } = organizationTagGroups

const organizationsList = [
  {
    cardColor: 'cinnamon',
    fullName: 'Boston University',
    shortName: 'BU',
    type: 'library',
    location: 'Boston, MA',
  },
  {
    cardColor: 'midnight',
    fullName: 'Brandeis University',
    shortName: 'BU',
    type: 'library',
    location: 'Waltham, MA',
  },
  {
    cardColor: 'forest',
    fullName: 'Wayne State University',
    shortName: 'WS',
    type: 'library',
    location: 'Detroit, MI',
  },
  {
    cardColor: 'carolina',
    fullName: 'UNC Chapel Hill',
    shortName: 'CH',
    type: 'library',
    location: 'Chapell Hill, NC',
  },
  {
    cardColor: 'midnight',
    fullName: 'Gonzaga University',
    shortName: 'GU',
    type: 'library',
    location: 'Spokane, WA',
  },
  {
    cardColor: 'cabernet',
    fullName: 'Oberlin College',
    shortName: 'OC',
    type: 'library',
    location: 'Oberlin, OH',
  },
  {
    cardColor: 'desert',
    fullName: 'University of Rhode Island',
    shortName: 'URI',
    type: 'library',
    location: 'Kingston, RI',
  },
  {
    cardColor: 'smoke',
    fullName: 'Libraries We Here',
    shortName: 'WE',
    type: 'library',
    location: 'Baltimore, MD',
  },
].map((org, index) => ({ ...org, id: index }))

const affiliates = [
  ['Bryn Geffert', 'member', 'Active'],
  ['Laura Hibbler', 'member', 'Pending'],
  ['Nora Dimmock', 'member', 'Pending'],
  ['Ruth Szpunar', 'member', 'Active'],
  ['Brad Matthies', 'member', 'Active'],
  ['Steven Beardsley', 'follower', 'Inactive'],
  ['Dave Comeaux', 'member', 'Active'],
  ['Stanley Wilder', 'member', 'Active'],
  ['Scott Carlson', 'member', 'Active'],
  ['Lisa Hinchliffe', 'member', 'Active'],
  ['George Hart', 'follower', 'Inactive'],
  ['Alexandra Sarkozy', 'alumni', 'Inactive'],
  ['Damecia Donahue', 'alumni', 'Inactive'],
  ['Tim McGeary', 'alumni', 'Inactive'],
]

/*
 * GET /organization/id
 * Return Gonzaga University Profile
 */
const skillsDedupe = {}
const gonzagaAffiliations = [
  'membership.washington-idaho-network',
  'membership.ajcu',
]
const organizationProfile = {
  memberships: pick(suggestionsByType.memberships, gonzagaAffiliations, []),
  strategicDirections: pickFirst(
    8,
    suggestionsByType.strategicDirections,
    skillsDedupe
  ),
  productsAndServices: pickFirst(8, suggestionsByType.products, skillsDedupe),
}

/*
 * API method mocks
 */
export const getOrganizationsList = async () => {
  await delay(1)
  return organizationsList
}

export const getOrganization = async id => {
  const org = organizationsList[id]
  await delay(2)
  return {
    ...org,
    ...organizationProfile,
    affiliates,
  }
}

export const getOrganizationAffiliates = async () => {
  await delay(2)
  return affiliates
}

export const saveOrganization = async organization => {
  await delay(2)
  return organization
}

export const deleteOrganization = async () => {
  await delay(2)
  return true
}

export const getOrganizationProfile = async () => {
  await delay(2)
  return organizationProfile
}

export const saveOrganizationProfile = async profile => {
  await delay(2)
  return profile
}

export const findAffiliations = async query => {
  await delay(0.5)
  return find(affiliations, query)
}
