import { pick, pickFirst, organizationTagGroups } from '@skilltype/data'

const { suggestionsByType } = organizationTagGroups

const skillsDedupe = {}

export const organizationData = {
  profileTheme: 'midnight',
  name: 'Gonzaga University',
  avatarLabel: 'GU',
  verified: false,
  tagline: 'Library',
  location: 'Spokane, WA',
  affiliates: [
    ['Steve Bowers', 'member', 'Pending'],
    ['Jon Cawthorne', 'admin', 'Active'],
    ['Tony Zanders', 'follower', ''],
    ['Andrea Steckle', 'alumni', 'Inactive'],
  ],
}
const gonzagaAffiliations = [
  'memberships.washington-idaho-network',
  'memberships.ajcu',
]
export const populatedOrganizationData = {
  ...organizationData,
  memberships: pick(suggestionsByType.memberships, gonzagaAffiliations),
  strategicDirections: pickFirst(
    8,
    suggestionsByType.strategicDirections,
    skillsDedupe
  ),
  productsAndServices: pickFirst(8, suggestionsByType.products, skillsDedupe),
}

export const organizationMeta = {
  memberships: {
    title: 'Memberships',
    placeholder:
      'What organizations are you connected to? Memberships enables these organizations to better support your career.',
    searchPlaceholder: 'Search memberships',
    noResults: {
      message: 'No memberships found.',
      suggest: {
        message: 'Suggest a new membership',
        url: 'https://www.skilltype.com/addtag',
      },
    },
    noTags: {
      message: 'No memberships yet',
    },
  },
  strategicDirections: {
    title: 'Strategic Directions',
    placeholder: '',
    searchPlaceholder: 'Search strategic directions',
    noResults: {
      message: 'No strategic directions found.',
      suggest: {
        message: 'Suggest a new strategic direction',
        url: 'https://www.skilltype.com/addtag',
      },
    },
    noTags: {
      message: 'No strategic direction yet',
    },
  },
  productsAndServices: {
    title: 'Products and Services',
    placeholder:
      'What tools and services have you used? Skilltype uses these to recommend opportunities to leverage your experience and sharpen your skills.',
    searchPlaceholder: 'Search products and services',
    noResults: {
      message: 'No products or services found.',
      suggest: {
        message: 'Suggest a new product or service',
        url: 'https://www.skilltype.com/addtag',
      },
    },
    noTags: {
      message: 'No products or services yet',
    },
  },
}
