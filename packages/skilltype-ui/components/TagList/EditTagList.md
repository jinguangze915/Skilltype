```js
const {
  skills,
  find,
  getExcluding,
  normalizeTagData,
  dedupe,
} = require('@skilltype/data')
const skillsList = dedupe(skills.map(normalizeTagData))
initialTagList = [
  { name: 'Strategy', id: 'strategy' },
  { name: 'Management', id: 'management' },
]
initialState = {
  tagList: initialTagList,
  suggestions: getExcluding(skillsList, initialTagList),
  isModal: false,
  query: '',
  alphabetize: false,
  disabled: false,
}
;<Section style={{ position: 'relative' }}>
  <EditTagList
    tagList={state.tagList}
    onChange={tagList =>
      setState({
        tagList,
        suggestions: getExcluding(skillsList, tagList),
        query: '',
      })
    }
    getSuggestions={q => find(state.suggestions, q)}
    addIsModal={state.isModal}
    style={{ marginBottom: 20, maxHeight: 200 }}
    query={state.query}
    onQueryChange={query => setState({ query })}
    queryPlaceholder={'type a skill, like "professional development"'}
    disabled={state.disabled}
  />
  <Section newGroup>
    <label>
      Modal editor?
      <input
        type="checkbox"
        checked={state.isModal}
        onChange={e => setState({ isModal: e.target.checked })}
      />
    </label>
  </Section>
  <Section>
    <label>
      Disabled?
      <input
        type="checkbox"
        checked={state.disabled}
        onChange={e => setState({ disabled: e.target.checked })}
      />
    </label>
  </Section>
</Section>
```
