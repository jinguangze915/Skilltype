// returns any items having word(s) starting with query
export const prefixSearch = (suggestions, query) =>
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

// filters tags in tagList out of suggestions
export const getExcluding = (suggestions, tagList) =>
  suggestions.filter(s => !tagList.find(t => t.id === s.id))
