```js
const { find, skillsList } = require('@skilltype/data')
initialState = {
  query: '',
  isModal: false,
  debugModal: false,
  suggestion: null,
  noResultsMessage: 'No matches found for "$QUERY"',
}
;<Section>
  <Section
    style={{ backgroundColor: '#fff', padding: 10, flexDirection: 'row' }}
  >
    <Search
      getSuggestions={s => find(skillsList, s)}
      initialSuggestions={state.debugModal && skillsList}
      shouldClearOnBlur={!state.debugModal}
      onQueryChange={query => setState({ query })}
      isModal={state.isModal}
      noResultsMessage={state.noResultsMessage}
      onSubmit={suggestion => setState({ suggestion, query: '' })}
      onShowSuggestions={show => show || setState({ query: '' })}
      query={state.query}
      placeholder={'type a product or service'}
    />
  </Section>
  <Section>Raw query: {state.query}</Section>
  <Section>Suggestion: {state.suggestion && state.suggestion.name}</Section>
  <Section newGroup>
    <label>
      "no results" message
      <input
        type="text"
        value={state.noResultsMessage}
        onChange={e => setState({ noResultsMessage: e.target.value })}
      />
    </label>
  </Section>
  <Section newGroup>
    <label>
      Modal UI?
      <input
        type="checkbox"
        checked={state.isModal}
        onChange={e =>
          setState({
            isModal: e.target.checked,
            debugModal: e.target.checked ? state.debugModal : false,
          })
        }
      />
    </label>
    <label>
      Debug modal (always show)?
      <input
        type="checkbox"
        checked={state.debugModal}
        onChange={e =>
          setState({ isModal: e.target.checked, debugModal: e.target.checked })
        }
      />
    </label>
  </Section>
</Section>
```
