```js
initialState = {
  show: true,
}
;<Section>
  <NotifyError
    onClose={() => setState({ show: false })}
    show={state.show}
    id="notify"
  >
    Incorrect email address and / or password. Do you need{' '}
    <a href="https://www.skilltype.com/forgot" target="_blank">
      help logging in
    </a>?
  </NotifyError>
  <Section>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum
    lectus libero, venenatis aliquet odio feugiat quis.
  </Section>
</Section>
```
