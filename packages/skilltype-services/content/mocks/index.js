import affiliationPermissions from '@skilltype/data/data/affiliation-permissions.json'
import { delay } from '../../lib/mocks'

export const getHomeMenu = async () => [
  {
    label: 'profile',
    heroImageSource:
      'https://uploads-ssl.webflow.com/5d73005a34bd367a51de8161/5db3b85a56a8610a7da9fd51_profile.png',
    heading: 'Profile',
    content: 'Manage your data privately',
    path: '/profile',
  },
  {
    label: 'organizations',
    heroImageSource:
      'https://uploads-ssl.webflow.com/5d73005a34bd367a51de8161/5db3b7da2f480919c394ca55_organizations.png',
    heading: 'Organizations',
    content: 'Share your data securely',
    path: '/organizations',
  },
  {
    label: 'resources',
    heroImageSource:
      'https://uploads-ssl.webflow.com/5d73005a34bd367a51de8161/5db3b7a213810c16f5415e63_feed.png',
    heading: 'Resources',
    content: 'Develop your expertise',
    path: '/resources',
  },
  {
    label: 'opportunities',
    heroImageSource:
      'https://uploads-ssl.webflow.com/5d73005a34bd367a51de8161/5db3b753aad4b5ef9ae7c407_settings.png',
    heading: 'Opportunities',
    content: 'Build your career (coming soon)',
    path: '/opportunities',
  },
  {
    label: 'settings',
    heroImageSource:
      'https://static1.squarespace.com/static/5bce6abc7fdcb8cc299bbaf9/5beb126dcd8366963b9ace45/5bf0c88c352f533b08c1c971/1542506781725/ratchet_wrench.png',
    heading: 'Settings',
    content: 'Configure your experience',
    path: '/settings',
  },
]

export const getProfileSections = async () => ({
  organizations: {
    title: 'Organizations',
    placeholder:
      'What organizations are you connected to? Adding them here enables them to better support your career.',
    searchPlaceholder: 'Search organizations',
    noResults: {
      message: 'No organizations found.',
      suggest: {
        message: 'Suggest a new organization',
        url: 'https://www.skilltype.com/addtag',
      },
    },
    noTags: {
      message: 'No organizations yet',
    },
  },
  skills: {
    title: 'Skills',
    placeholder:
      'What can you do on the job? Skilltype recommends opportunities to earn more income based on this data.',
    searchPlaceholder: 'Search skills',
    noResults: {
      message: 'No skills found.',
      suggest: {
        message: 'Suggest a new skill',
        url: 'https://www.skilltype.com/addtag',
      },
    },
    noTags: {
      message: 'No skills yet',
    },
  },
  interests: {
    title: 'Interests',
    placeholder:
      'What are you curious about? Skilltype recommends professional development opportunities based on this data.',
    searchPlaceholder: 'Search interests',
    noResults: {
      message: 'No interests found.',
      suggest: {
        message: 'Suggest a new interest',
        url: 'https://www.skilltype.com/addtag',
      },
    },
    noTags: {
      message: 'No interests yet',
    },
  },
  productExperience: {
    title: 'Product Experience',
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
})

export const getOrganizationProfileSections = async () => ({
  memberships: {
    title: 'Memberships',
    placeholder:
      'Which consortia are you a member of? Memberships enables these organizations to receive data across its membership.',
    searchPlaceholder: 'Search memberships',
    noResults: {
      message: 'No memberships found.',
      suggest: {
        message: 'Suggest a new membership',
        url: 'https://www.skilltype.com/addtag',
      },
    },
    noTags: {
      message: 'No organizations yet',
    },
  },
  strategicDirections: {
    title: 'Strategic Directions',
    placeholder:
      'What are your current strategic priorities? Skilltype uses these to align staff skills and activity to track progress.',
    searchPlaceholder: 'Search strategic directions',
    noResults: {
      message: 'No strategic directions found.',
      suggest: {
        message: 'Suggest a new strategic direction',
        url: 'https://www.skilltype.com/addtag',
      },
    },
    noTags: {
      message: 'No strategic directions yet',
    },
  },
  productsAndServices: {
    title: 'Products and Services',
    placeholder:
      'What products and services does you subscribe to? Skilltype uses these to track instituitonal knowledge across your teams.',
    searchPlaceholder: 'Search products and services',
    noResults: {
      message: 'No products or services found.',
      suggest: {
        message: 'Suggest a new product or service',
        url: 'https://www.skilltype.com/addtag',
      },
    },
    noTags: {
      message: 'No products and services yet',
    },
  },
})

export const getAffiliationPermissions = async () => {
  await delay(0.5)
  return affiliationPermissions
}
