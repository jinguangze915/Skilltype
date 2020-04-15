```js
const loremIpsum = require('lorem-ipsum')
const { maxContentWidth } = require('../../shared-styles/theme').default
;<Page>
  <Content>
    <Section>
      This content is constrained to theme.maxContentWidth ({maxContentWidth})
    </Section>
    <Raw html={loremIpsum({ format: 'html', units: 'paragraphs', count: 2 })} />
  </Content>
</Page>
```
