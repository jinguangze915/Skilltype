```js
const CheckIcon = require('../../assets/callout-icons/check.svg').default
const WarningIcon = require('../../assets/callout-icons/warning.svg').default
;<Section style={{ width: '300px' }}>
  <BulletSection icon={<CheckIcon />}>
    Your personally identifiable information (e.g. name, email address,
    location)
  </BulletSection>
  <BulletSection icon={<CheckIcon />}>Short bullet content</BulletSection>
  <BulletSection icon={<WarningIcon />} bigIcon>
    <RawSection>
      You are requesting an affiliation with Tulane University as a{' '}
      <strong>member</strong>. Below describes what Skilltype will do with your data
    </RawSection>
  </BulletSection>
</Section>
```
