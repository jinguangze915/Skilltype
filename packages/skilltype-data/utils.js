import camelCase from 'lodash.camelcase'
import kebabCase from 'lodash.kebabcase'

export const dedupe = list =>
  Object.values(
    list.reduce((dict, item) => {
      dict[item.id] = item
      return dict
    }, {})
  )

export const normalizeTagData = tagJson => {
  const name = tagJson.Title || tagJson.name || tagJson
  // normalize the id values
  const id = tagJson.Id || tagJson.id || tagJson.replace(/[^a-zA-Z]+/, '-')
  // Don't prefix if we already have an id prefix on the values
  return {
    ...tagJson,
    name,
    id,
  }
}
export const prefixTagData = (tagJson, idPrefix) => {
  // Match against prefix syntax "prefix.tag-name-snake-case"
  // Don't prefix if one already exists
  //
  // Idempotency
  //
  // camelCase.kebab-case format for already prefixed data

  // Normalize if it has not been already
  const json = normalizeTagData(tagJson)

  const matchPrefixedTag = /^([a-z]+)([A-Z][a-z]*)*\.([a-z-]+)$/
  const alreadyPrefixed = Boolean(json.id.match(matchPrefixedTag))
  if (alreadyPrefixed) {
    return tagJson
  }
  const prefix = camelCase(idPrefix)
  const id = `${prefix}.${kebabCase(json.id)}`
  return {
    ...json,
    id,
  }
}

export const pickFirst = (count, array, dedupeList) => {
  const picks = []
  let idx = 0
  while (picks.length < count) {
    const pick = { ...array[idx], name: array[idx].name.trim() }
    if (pick.name && !dedupeList[pick.id]) {
      picks.push(pick)
      dedupeList[pick.id] = pick
    }
    idx += 1
  }
  return picks
}

export const pick = (array, items) =>
  array.map(item => (items.includes(item.id) ? item : null)).filter(Boolean)

export const find = (suggestions, query) =>
  suggestions.filter(s =>
    s.name
      .split(' ')
      .reduce(
        (found, w) =>
          found ||
          query.toLowerCase() === w.slice(0, query.length).toLowerCase(),
        false
      )
  )

export const getExcluding = (suggestions, tagList) =>
  suggestions.filter(s => !tagList.find(t => t.id === s.id))

export const hideEmail = email =>
  email
    .split('@')
    .map(word => {
      let hiddenWord = ''
      for (let i = 0; i < word.length; i += 1) {
        if (i === 0) {
          hiddenWord += word[0]
        } else {
          hiddenWord += '*'
        }
      }
      return hiddenWord
    })
    .join('@')

// https://stackoverflow.com/a/9204568/9828708
export const validateEmail = email =>
  typeof email === 'string' && /\S+@\S+\.\S+/.test(email.trim())

export const isObjectEmpty = obj =>
  Object.entries(obj).length === 0 && obj.constructor === Object
