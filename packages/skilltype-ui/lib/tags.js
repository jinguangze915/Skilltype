export const alphabetizeTagList = tagList =>
  tagList.sort((tagA, tagB) => {
    if (tagA.name < tagB.name) {
      return -1
    }
    if (tagA.name > tagB.name) {
      return 1
    }
    return 0
  })
