```js
initialState = { canEdit: false }
;<Section>
  <ProfileSection
    title="Afilliations"
    canEdit={state.canEdit}
    onEdit={() => alert('edit afilliations')}
  >
    <TagList>
      {Array(10)
        .fill()
        .map((_, i) => <Tag key={i}>Tag {i}</Tag>)}
    </TagList>
  </ProfileSection>
  <ProfileSection
    title="Skills"
    canEdit={state.canEdit}
    onEdit={() => alert('edit skills')}
  >
    <TagList>
      {Array(10)
        .fill()
        .map((_, i) => <Tag key={i}>Tag {i}</Tag>)}
    </TagList>
  </ProfileSection>
  <Section newGroup>
    <label>
      Can Edit?
      <input
        type="checkbox"
        checked={state.canEdit}
        onChange={e => setState({ canEdit: e.target.checked })}
      />
    </label>
  </Section>
</Section>
```
