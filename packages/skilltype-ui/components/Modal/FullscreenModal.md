```js
const loremIpsum = require('lorem-ipsum')
const LogoSvg = require('../../assets/logo.svg').default
initialState = {
  showModal: false,
}
;<Section>
  {state.showModal && (
    <FullscreenModal
      onDismiss={() => setState({ showModal: false })}
      title={<LogoSvg style={{ marginLeft: '15px' }} />}
      appElementId="rsg-root"
    >
      <Raw
        html={loremIpsum({
          count: 20,
          format: 'html',
          units: 'paragraphs',
        })}
      />
    </FullscreenModal>
  )}
  <PrimaryButton onClick={() => setState({ showModal: true })}>
    Fullscreen Modal
  </PrimaryButton>
</Section>
```

```js
const loremIpsum = require('lorem-ipsum')
const Tablet = require('../Responsive/Tablet').default
const MobileOnly = require('../Responsive/MobileOnly').default
const LogoSvg = require('../../assets/logo.svg').default
initialState = {
  showModal: false,
  values: {},
}
;<Section>
  {state.showModal && (
    <FullscreenModal
      onDismiss={() => setState({ showModal: false })}
      hasEditableContent
      title={
        <React.Fragment>
          <Tablet notMobileOs>
            <LogoSvg style={{ marginLeft: '15px' }} />
          </Tablet>
          <MobileOnly orMobileOs>Sign Up</MobileOnly>
        </React.Fragment>
      }
      appElementId="rsg-root"
      showOkButton
      okButtonLabel={'Create'}
    >
      <Page centerContent centerSelf>
        <PageHeading style={{ margin: '0.5em 0 1em', textAlign: 'center' }}>
          <Raw html="Create your Skilltype&nbsp;profile" />
        </PageHeading>
        <Content>
          <Form
            id="register"
            onChange={({ values }) => setState({ values })}
            values={state.values}
          >
            <FormSection>
              <TextInput id="firstName" label="First Name" required />
              <TextInput id="lastName" label="Last Name" required />
            </FormSection>
          </Form>
        </Content>
      </Page>
    </FullscreenModal>
  )}
  <PrimaryButton onClick={() => setState({ showModal: true })}>
    Fullscreen w/Editable Content
  </PrimaryButton>
</Section>
```
