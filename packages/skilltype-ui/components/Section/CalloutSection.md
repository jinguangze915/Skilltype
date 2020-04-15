```js
const { WARNING, INFO } = require('./CalloutSection')
const WarningIcon = require('../../assets/callout-icons/warning.svg').default
const InfoIcon = require('../../assets/callout-icons/info.svg').default
;<Section style={{ backgroundColor: 'white', width: '600px' }} contentPadding>
  <CalloutSection calloutType={WARNING}>
    <BulletSection icon={<WarningIcon />} bigIcon>
      <RawSection>
        You are requesting an affiliation with Tulane University as a{' '}
        <strong>member</strong>. Below describes what Skilltype will do with your
        data
      </RawSection>
    </BulletSection>
  </CalloutSection>
  <CalloutSection calloutType={INFO} style={{ width: '300px' }}>
    <BulletSection icon={<InfoIcon />} bigIcon>
      Once accepted, you will select which expertise and activity you want to
      share with this organization.
    </BulletSection>
  </CalloutSection>
</Section>
```
