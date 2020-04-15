```js
initialState = {
  show: true,
}
;<Section>
  <Notify
    onClose={() => setState({ show: false })}
    show={state.show}
    id="notify"
  >
    Logged in as <a href="#">Tony Zanders</a>
  </Notify>
  <Section>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum
    lectus libero, venenatis aliquet odio feugiat quis.
  </Section>
</Section>
```
