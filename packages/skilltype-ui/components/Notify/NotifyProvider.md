```js
const { withNotifyContext } = require('./NotifyProvider')
const NotifyButtons = withNotifyContext(({ notify, notifyError }) => (
  <React.Fragment>
    <Section>
      <PrimaryButton onClick={() => notify('You clicked the Notify button')}>
        Notify
      </PrimaryButton>
    </Section>
    <Section>
      <PrimaryButton
        onClick={() => notifyError('You clicked the Notify Error button')}
      >
        Notify Error
      </PrimaryButton>
    </Section>
  </React.Fragment>
))
initialState = {
  BadComponent: () => <div>Normal</div>,
}
;<Section>
  <NotifyProvider>
    <NotifyButtons />
    <Section>
      <PrimaryButton onClick={() => setState({ BadComponent: null })}>
        Trigger error boundary
      </PrimaryButton>
    </Section>
    <Section>
      <state.BadComponent />
    </Section>
  </NotifyProvider>
</Section>
```
