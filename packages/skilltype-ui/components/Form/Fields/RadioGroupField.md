## Vertical (default)

```js
initialState = {
  value: null,
}
;<FormSection>
  <RadioGroupField
    id="rgV"
    value={state.value}
    onChange={value => setState({ value })}
    label="Songs about radios"
    helperText="Pick your favorite song about radios. There's no wrong answer, because they're all great!"
  >
    <Radio label="Gaga" value="gaga" />
    <Radio label="Radio" value="radio" />
    <Radio label="Free Europe" value="freeEurope" />
  </RadioGroupField>
</FormSection>
```

## Vertical Inline

```js
initialState = {
  value: null,
}
;<FormSection>
  <RadioGroupField
    id="rgVi"
    value={state.value}
    onChange={value => setState({ value })}
    label="Songs about radios"
    helperText="Pick your favorite song about radios. There's no wrong answer, because they're all great!"
    inline
  >
    <Radio label="Gaga" value="gaga" />
    <Radio label="Radio" value="radio" />
    <Radio label="Free Europe" value="freeEurope" />
  </RadioGroupField>
</FormSection>
```

## Horizontal

```js
initialState = {
  value: null,
}
const { HORIZONTAL } = require('../../Radio/RadioGroup')
;<FormSection>
  <RadioGroupField
    id="rgH"
    value={state.value}
    onChange={value => setState({ value })}
    label="Songs about radios"
    orientation={HORIZONTAL}
    helperText="Pick your favorite song about radios. There's no wrong answer, because they're all great!"
  >
    <Radio label="Gaga" value="gaga" />
    <Radio label="Radio" value="radio" />
    <Radio label="Free Europe" value="freeEurope" />
  </RadioGroupField>
</FormSection>
```

## Horizontal Inline

```js
initialState = {
  value: null,
}
const { HORIZONTAL } = require('../../Radio/RadioGroup')
;<FormSection>
  <RadioGroupField
    id="rgHi"
    value={state.value}
    onChange={value => setState({ value })}
    label="Songs about radios"
    orientation={HORIZONTAL}
    inline
    helperText="Pick your favorite song about radios. There's no wrong answer, because they're all great!"
  >
    <Radio label="Gaga" value="gaga" />
    <Radio label="Radio" value="radio" />
    <Radio label="Free Europe" value="freeEurope" />
  </RadioGroupField>
</FormSection>
```

## Default value

```js
initialState = {
  value: 'radio',
}
const { HORIZONTAL } = require('../../Radio/RadioGroup')
;<FormSection>
  <RadioGroupField
    id="rgH"
    value={state.value}
    onChange={value => setState({ value })}
    label="Songs about radios"
    orientation={HORIZONTAL}
    helperText="Pick your favorite song about radios. There's no wrong answer, because they're all great!"
  >
    <Radio label="Gaga" value="gaga" />
    <Radio label="Radio" value="radio" />
    <Radio label="Free Europe" value="freeEurope" />
  </RadioGroupField>
</FormSection>
```
