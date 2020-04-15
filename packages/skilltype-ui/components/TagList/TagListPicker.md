```js
const { skills, find, normalizeTagData, dedupe } = require('@skilltype/data')
const suggestions = dedupe(skills.map(normalizeTagData))
initialTagList = [
  { name: 'Strategy', id: 'strategy' },
  { name: 'Management', id: 'management' },
]
initialState = {
  tagList: initialTagList,
  suggestions,
  query: '',
  alphabetize: false,
  disabled: false,
  showModal: false,
}
;<Section>
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
  <Section newGroup>
    {state.showModal && (
      <Modal
        title="Edit Skills"
        showOkButton
        okButtonLabel="Update"
        showCloseButton
        onOk={() => setState({ showModal: false })}
        onDismiss={() => setState({ showModal: false })}
        appElementId="rsg-root"
        shouldCloseOnEsc={false}
        lockBodyScroll
        hasEditableContent
        wide
        contentHandlesScroll
      >
        <TagListPicker
          id="modalTagListPicker"
          tagList={state.tagList}
          onChange={tagList => setState({ tagList })}
          suggestions={find(suggestions, state.query)}
          query={state.query}
          onQueryChange={query => setState({ query })}
          queryPlaceholder="Search skills..."
          noResultsMessage="no skills found"
          noTagsMessage="no skills yet"
          disabled={state.disabled}
          style={{ flexGrow: 1 }}
        />
      </Modal>
    )}
    <PrimaryButton onClick={() => setState({ showModal: true })}>
      Modal TagListPicker
    </PrimaryButton>
  </Section>
</Section>
```
