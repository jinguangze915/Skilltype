```js
initialState = {
  values: {
    strings: 'second',
  },
  inline: false,
}
;<Section>
  <Form
    id="textField1"
    onChange={({ values }) => setState({ values })}
    values={state.values}
  >
    <FormSection>
      <SelectField
        id="numbers"
        label="Numbers"
        options={[{ label: '10', value: 10 }, { label: '20', value: 20 }]}
        inline={state.inline}
      />
      <SelectField
        id="strings"
        label="Strings"
        options={[
          { label: 'first', value: 'first' },
          { label: 'second', value: 'second' },
        ]}
        inline={state.inline}
      />
      <SelectField
        id="placeholder"
        label="Placeholder"
        placeholder="pie"
        options={[
          { label: 'pie', value: 'pie' },
          { label: 'cake', value: 'cake' },
        ]}
        inline={state.inline}
      />
      <SelectField
        id="helper-text"
        label="Helper Text"
        helperText="SelectField at least one option"
        options={[
          { label: 'Chicago', value: 'Chicago' },
          { label: 'New York', value: 'New York' },
        ]}
        inline={state.inline}
      />
      <SelectField
        id="error"
        label="Error"
        missingRequiredError="SelectFieldion requried"
        error="SelectFieldion requried"
        options={[{ label: 'A', value: 'A' }, { label: 'B', value: 'B' }]}
        inline={state.inline}
      />
      <SelectField
        id="disabled"
        label="Disabled"
        disabled={true}
        options={[{ label: 'A', value: 'A' }, { label: 'B', value: 'B' }]}
        inline={state.inline}
      />
      <SelectField
        id="searchable"
        label="Not Searchable"
        searchable={false}
        options={[{ label: 'A', value: 'A' }, { label: 'B', value: 'B' }]}
        inline={state.inline}
      />
    </FormSection>
  </Form>
  <Checkbox
    value={state.inline}
    onChange={e => setState({ inline: e.target.value })}
    label="Inline"
  />
</Section>
```
