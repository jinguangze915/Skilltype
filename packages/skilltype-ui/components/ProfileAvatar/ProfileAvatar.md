```js
initialState = { theme: '' }
const themes = Object.keys(
  require('../../shared-styles/profileThemes').default()
)
;<Section>
  <ProfileAvatar
    label="AB"
    theme={state.theme}
    style={{ width: 250, height: 130, display: 'flex', marginBottom: 20 }}
  />
  <Section newGroup>
    theme:
    <select
      onChange={e => setState({ theme: e.target.value })}
      value={state.theme}
    >
      <option value="">Choose a theme</option>
      {themes.map(t => <option key={t}>{t}</option>)}
    </select>
  </Section>
</Section>
```
