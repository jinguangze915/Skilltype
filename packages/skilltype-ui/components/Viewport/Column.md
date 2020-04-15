```js
const Row = require('./Row').default
;<Row>
  <Column style={{ width: 50, backgroundColor: '#fff' }}>
    This column should only be 50px wide
  </Column>
  <Column grow style={{ backgroundColor: '#efe' }}>
    This column should grow to fill the rest of the width
  </Column>
</Row>
```
