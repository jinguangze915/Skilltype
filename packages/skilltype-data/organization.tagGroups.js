import memberships from './data/memberships.json'
import strategicDirections from './data/strategicDirections.json'
import products from './data/products.json'
import { prefixTagData, dedupe } from './utils'

const suggestionsByType = {
  memberships: dedupe(memberships.map(t => prefixTagData(t, 'membership'))),
  strategicDirections: dedupe(
    strategicDirections.map(t => prefixTagData(t, 'strategicDirection'))
  ),
  products: dedupe(products.map(t => prefixTagData(t, 'product'))),
}

const getTagGroups = (organizationData, organizationMeta) => ({
  memberships: {
    ...organizationMeta.memberships,
    canEdit: true,
    tags: organizationData.memberships.map(t => prefixTagData(t, 'membership')),
    suggestionsType: 'memberships',
  },
  strategicDirections: {
    ...organizationMeta.strategicDirections,
    canEdit: true,
    tags: organizationData.strategicDirections.map(t =>
      prefixTagData(t, 'strategicDirection')
    ),
    suggestionsType: 'strategicDirections',
  },
  productsAndServices: {
    ...organizationMeta.productsAndServices,
    canEdit: true,
    tags: organizationData.productsAndServices.map(t =>
      prefixTagData(t, 'product')
    ),
    suggestionsType: 'products',
  },
})

export default {
  suggestionsByType,
  getTagGroups,
}
