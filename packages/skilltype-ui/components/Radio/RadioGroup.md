## Vertical (default)

```js
initialState = {
  value: null,
}
;<FormSection>
  <RadioGroup
    id="rgV"
    value={state.value}
    onChange={value => setState({ value })}
  >
    <Radio label="Gaga" value="gaga" />
    <Radio label="Radio" value="radio" />
    <Radio label="Free Europe" value="freeEurope" />
  </RadioGroup>
</FormSection>
```

## Horizontal

```js
initialState = {
  value: null,
}
const { HORIZONTAL } = require('./RadioGroup')
;<FormSection>
  <RadioGroup
    id="rgH"
    value={state.value}
    onChange={value => setState({ value })}
    orientation={HORIZONTAL}
  >
    <Radio label="Gaga" value="gaga" />
    <Radio label="Radio" value="radio" />
    <Radio label="Free Europe" value="freeEurope" />
  </RadioGroup>
</FormSection>
```
