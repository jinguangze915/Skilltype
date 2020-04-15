```js
const suggestions = require('@skilltype/data').skillsList
initialState = { tag: '', isModal: false, query: '', onlySuggested: true }
;<Section>
  <Section
    style={{ backgroundColor: '#fff', padding: 10, flexDirection: 'row' }}
  >
    <AddTag
      getSuggestions={s => suggestions.find(suggestions.suggestions, s)}
      onAdd={t => setState({ tag: t.name, query: '' })}
      isModal={state.isModal}
      query={state.query}
      onQueryChange={query => setState({ query })}
      onlySuggestedQueries={state.onlySuggested}
      queryPlaceholder={'type a skill, like "professional development"'}
    />
  </Section>
  <Section>Tag added: {state.tag}</Section>
  <Section newGroup>
    <label>
      Modal add?
      <input
        type="checkbox"
        checked={state.isModal}
        onChange={e => setState({ isModal: e.target.checked })}
      />
    </label>
    <label>
      Only add suggested tags?
      <input
        type="checkbox"
        checked={state.onlySuggested}
        onChange={e => setState({ onlySuggested: e.target.checked })}
      />
    </label>
  </Section>
</Section>
```
