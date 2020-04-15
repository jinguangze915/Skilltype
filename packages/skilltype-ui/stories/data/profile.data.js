import { pickFirst, profileTagGroups } from '@skilltype/data'

const { suggestionsByType } = profileTagGroups

const dedupeDict = {}

export const profileData = {
  verified: true,
  tagline: 'Dean of Libraries',
  affiliations: [],
  skills: [],
  priorities: [],
  interests: [],
  productExperience: [],
}
export const populatedProfileData = {
  ...profileData,
  // TODO: @jacob - change this field when the backend field is changed to organizations
  affiliations: pickFirst(20, suggestionsByType.organizations, dedupeDict),
  skills: pickFirst(20, suggestionsByType.skills, dedupeDict),
  priorities: pickFirst(20, suggestionsByType.priorities, dedupeDict),
  interests: pickFirst(20, suggestionsByType.interests, dedupeDict),
  productExperience: pickFirst(20, suggestionsByType.products, dedupeDict),
}

export const userData = {
  city: 'Grand Rapids',
  state: 'MI',
  firstName: 'Annie',
  lastName: 'Bélanger',
  cardColor: 'hibiscus',
}

export const profileMeta = {
  organizations: {
    title: 'Organizations',
    placeholder:
      'What organizations are you connected to? organizations enables these organizations to better support your career.',
    searchPlaceholder: 'Search organizations',
    noResults: {
      message: 'No organizations found.',
      suggest: {
        message: 'Suggest a new affiliation',
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
  priorities: {
    title: 'Priorities',
    placeholder:
      'What types of work gets you excited in the morning? Skilltype uses these to match you with organizations and opportunities.',
    searchPlaceholder: 'Search Priorities',
    noResults: {
      message: 'No Priorities found.',
      suggest: {
        message: 'Suggest a new priority',
        url: 'https://www.skilltype.com/addtag',
      },
    },
    noTags: {
      message: 'No priorities yet',
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
}
