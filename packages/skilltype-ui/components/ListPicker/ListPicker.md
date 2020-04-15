```js
const { skills, find, normalizeTagData, dedupe } = require('@skilltype/data')
const skillsList = dedupe(skills.map(normalizeTagData))
initialState = {
  selected: {},
  query: '',
  activeIndex: -1,
}
;<Section>
  <ListPicker
    id="listPicker"
    suggestions={find(skillsList, state.query)}
    selected={state.selected}
    onQueryChange={query => setState({ query, activeIndex: -1 })}
    query={state.query}
    activeIndex={state.activeIndex}
    placeholder="Type to filter..."
    noResultsMessage="No matches found"
    onItemSelected={(id, index) => {
      state.selected[id] = !state.selected[id]
      setState({ activeIndex: index, selected: state.selected })
    }}
    onActiveIndexChange={activeIndex => setState({ activeIndex })}
    aria-label="skills"
    isMultiSelect
    style={{
      maxHeight: '400px',
    }}
  />
</Section>
```
