```js
const themes = Object.keys(
  require('../../shared-styles/profileThemes').default().all
)
const PinnedProfileCard = require('./PinnedProfileCard').default
initialState = {
  profileTheme: 'hibiscus',
  name: 'Annie Bélanger',
  avatarLabel: 'AB',
  verified: true,
  title: 'Dean of Libraries',
  location: 'Grand Rapids, MI',
  fixed: false,
}
;<div>
  <Section>
    {state.fixed ? (
      <PinnedProfileCard {...state} />
    ) : (
      <ProfileCard {...state} />
    )}
  </Section>
  <Section newGroup>
    <label>
      fixed?
      <input
        type="checkbox"
        id="fixed"
        checked={state.fixed}
        onChange={e => setState({ fixed: e.target.checked })}
      />
    </label>
  </Section>
  <Section>
    theme:
    <select
      onChange={e => setState({ profileTheme: e.target.value })}
      value={state.theme}
    >
      <option value="">Choose a theme</option>
      {themes.map(t => <option key={t}>{t}</option>)}
    </select>
  </Section>
  <Section>
    name:
    <input
      type="text"
      value={state.name}
      onChange={e => setState({ name: e.target.value })}
    />
  </Section>
  <Section>
    avatarLabel:
    <input
      type="text"
      value={state.avatarLabel}
      onChange={e => setState({ avatarLabel: e.target.value })}
    />
  </Section>
  <Section>
    <label>
      verified?
      <input
        type="checkbox"
        id="verified"
        checked={state.verified}
        onChange={e => setState({ verified: e.target.checked })}
      />
    </label>
  </Section>
  <Section>
    title:
    <input
      type="text"
      value={state.title}
      onChange={e => setState({ title: e.target.value })}
    />
  </Section>
  <Section>
    location:
    <input
      type="text"
      value={state.location}
      onChange={e => setState({ location: e.target.value })}
    />
  </Section>
</div>
```
