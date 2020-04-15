```js
const loremIpsum = require('lorem-ipsum')
initialState = {
  showModal: false,
}
;<Section>
  {state.showModal && (
    <Modal
      title="Basic Modal"
      showOkButton
      okButtonLabel="Ok"
      showCloseButton
      onOk={() => setState({ showModal: false })}
      onDismiss={() => setState({ showModal: false })}
      appElementId="rsg-root"
    >
      <Raw
        html={loremIpsum({
          count: 20,
          format: 'html',
          units: 'paragraphs',
        })}
      />
    </Modal>
  )}
  <PrimaryButton onClick={() => setState({ showModal: true })}>
    Basic Modal
  </PrimaryButton>
</Section>
```

```js
const loremIpsum = require('lorem-ipsum')
initialState = {
  showModal: false,
}
;<Section>
  {state.showModal && (
    <Modal
      appElementId="rsg-root"
      title="Basic Modal"
      fitContent
      showOkButton
      okButtonLabel="Ok"
      showCloseButton
      onOk={() => setState({ showModal: false })}
      onDismiss={() => setState({ showModal: false })}
    >
      <Raw
        html={loremIpsum({
          count: 2,
          format: 'html',
          units: 'paragraphs',
        })}
      />
    </Modal>
  )}
  <PrimaryButton onClick={() => setState({ showModal: true })}>
    Basic (Fit Content)
  </PrimaryButton>
</Section>
```

```js
const {
  skills,
  find,
  normalizeTagData,
  dedupe,
  getExcluding,
} = require('@skilltype/data')
const skillsList = dedupe(skills.map(normalizeTagData))
const placeholders = [
  'type a skill, like "professional development"',
  'press "Delete" key to remove last skill',
]
initialTagList = [
  { name: 'Strategy', id: 'strategy' },
  { name: 'Management', id: 'management' },
]
initialState = {
  tagList: initialTagList,
  suggestions: getExcluding(skillsList, initialTagList),
  querySuggestions: [],
  showModal: false,
  searchIsActive: false,
  query: '',
  placeholderIndex: 0,
}
tagListRef = null
;<Section>
  {state.showModal && (
    <Modal
      title={state.searchIsActive ? 'Add Skill' : 'Edit Skills'}
      showCancelButton
      showOkButton
      okButtonLabel={state.searchIsActive ? 'Add' : 'Update'}
      showCloseButton
      onOk={() =>
        state.searchIsActive
          ? setState(
              {
                tagList: [...state.tagList, state.querySuggestions[0]],
                query: '',
              },
              () => tagListRef.focus()
            )
          : alert('ok clicked')
      }
      onDismiss={() =>
        state.searchIsActive
          ? setState(
              {
                searchIsActive: false,
                query: '',
              },
              () => tagListRef.focus()
            )
          : setState({
              showModal: false,
            })
      }
      appElementId="rsg-root"
      shouldCloseOnEsc={!state.searchIsActive}
      okIsEnabled={!state.searchIsActive || state.querySuggestions.length === 1}
      hasEditableContent
    >
      <EditTagList
        addIsModal
        isInModal
        focusOnMount
        tagList={state.tagList}
        onChange={tagList =>
          setState({
            tagList,
            suggestions: getExcluding(state.suggestions, tagList),
            query: '',
            placeholderIndex: state.placeholderIndex + 1,
          })
        }
        getSuggestions={query => {
          querySuggestions = find(state.suggestions, query)
          setState({ querySuggestions })
          return querySuggestions
        }}
        onShowSuggestions={searchIsActive =>
          setState({ searchIsActive, query: searchIsActive ? state.query : '' })
        }
        noResultsMessage={'No skills found matching "$QUERY"'}
        query={state.query}
        onQueryChange={query =>
          setState({
            query,
          })
        }
        tagListRef={e => {
          tagListRef = e
        }}
        queryPlaceholder={placeholders[state.placeholderIndex]}
      />
    </Modal>
  )}
  <PrimaryButton onClick={() => setState({ showModal: true })}>
    Modal with Editable Content & Search
  </PrimaryButton>
</Section>
```

```js
const loremIpsum = require('lorem-ipsum')
initialState = {
  showModal: false,
}
;<Section>
  {state.showModal && (
    <React.Fragment>
      <Progress />
      <Modal
        title="Basic Modal"
        showOkButton
        okIsEnabled={false}
        okButtonLabel="Save"
        showCloseButton
        shouldCloseOnEsc
        cancelIsEnabled={true}
        onOk={() => setState({ showModal: false })}
        onDismiss={() => setState({ showModal: false })}
        appElementId="rsg-root"
      >
        <Raw
          html={loremIpsum({
            count: 4,
            format: 'html',
            units: 'paragraphs',
          })}
        />
      </Modal>
    </React.Fragment>
  )}
  <PrimaryButton onClick={() => setState({ showModal: true })}>
    Basic Modal (Saving)
  </PrimaryButton>
</Section>
```

```js
const loremIpsum = require('lorem-ipsum')
initialState = {
  showModal: false,
}
;<Section>
  {state.showModal && (
    <React.Fragment>
      <Modal
        title="Basic Modal"
        showOkButton
        okIsEnabled={false}
        okButtonLabel="Save"
        showCloseButton
        cancelIsEnabled={true}
        onOk={() => setState({ showModal: false })}
        onDismiss={() => setState({ showModal: false })}
        appElementId="rsg-root"
        hasEditableContent
      >
        <Progress />
        <Form disabled={true}>
          <FormSection>
            <EmailInput id="email" label="Email" />
          </FormSection>
          <SubmitButton disabled={state.showProgress}>
            Create Profile
          </SubmitButton>
        </Form>
      </Modal>
    </React.Fragment>
  )}
  <PrimaryButton onClick={() => setState({ showModal: true })}>
    Modal with Editable Content (Saving)
  </PrimaryButton>
</Section>
```
