```js
const profileThemes = require('../../shared-styles/profileThemes.js').default()
const colors = Object.keys(profileThemes.all)
const initialState = { default: '' }
;<FormSection>
  <ColorPicker
    colors={colors}
    value={state.default}
    onChange={event => setState({ default: event.target.value })}
  />
</FormSection>
```
