import { prefixTagData, dedupe } from './utils'
import affiliations from './data/affiliations.json'
import products from './data/products.json'
import skills from './data/skills.json'
import strategicDirections from './data/strategicDirections.json'

const suggestionsByType = {
  organizations: dedupe(affiliations.map(t => prefixTagData(t, 'affiliation'))),
  skills: dedupe(skills.map(t => prefixTagData(t, 'skill'))),
  priorities: dedupe(
    strategicDirections.map(t => prefixTagData(t, 'priority'))
  ),
  interests: dedupe(skills.map(t => prefixTagData(t, 'interest'))),
  products: dedupe(products.map(t => prefixTagData(t, 'product'))),
}

const getTagGroups = (profileData, profileMeta) => ({
  // TODO: @jacob - change the backend response field from affiliations to organizations
  affiliations: {
    ...profileMeta.organizations,
    canEdit: true,
    // TODO: @jacob - change the backend response field from affiliations to organizations
    tags: profileData.affiliations.map(t => prefixTagData(t, 'affiliation')),
    suggestionsType: 'organizations',
  },
  skills: {
    ...profileMeta.skills,
    canEdit: true,
    tags: profileData.skills.map(t => prefixTagData(t, 'skill')),
    suggestionsType: 'skills',
  },
  priorities: {
    ...profileMeta.priorities,
    canEdit: true,
    tags: profileData.priorities.map(t => prefixTagData(t, 'priority')),
    suggestionsType: 'priorities',
  },
  interests: {
    ...profileMeta.interests,
    canEdit: true,
    tags: profileData.interests.map(t => prefixTagData(t, 'interest')),
    suggestionsType: 'interests',
  },
  productExperience: {
    ...profileMeta.productExperience,
    canEdit: true,
    tags: profileData.productExperience.map(t => prefixTagData(t, 'product')),
    suggestionsType: 'products',
  },
})

export default {
  suggestionsByType,
  getTagGroups,
}
