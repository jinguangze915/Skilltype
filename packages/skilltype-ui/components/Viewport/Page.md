```js
const loremIpsum = require('lorem-ipsum')
const { maxPageWidth } = require('../../shared-styles/theme').default
console.log('maxPageWidth', maxPageWidth)
;<Page>
  <Section>
    This content is constrained to theme.maxPageWidth ({maxPageWidth})
  </Section>
  <Raw html={loremIpsum({ format: 'html', units: 'paragraphs', count: 2 })} />
</Page>
```
