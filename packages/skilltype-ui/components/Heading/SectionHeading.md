```js
const { INFO } = require('../Section/CalloutSection')
const InfoIcon = require('../../assets/callout-icons/info.svg').default
const CheckIcon = require('../../assets/callout-icons/check.svg').default
const CancelIcon = require('../../assets/callout-icons/cancel.svg').default
;<Section style={{ backgroundColor: 'white', width: '300px' }} contentPadding>
  <SectionHeading>What you’re sharing</SectionHeading>
  <BulletSection icon={<CheckIcon />}>
    Your personally identifiable information (e.g. name, email address,
    location)
  </BulletSection>
  <BulletSection icon={<CheckIcon />}>
    Your personal demographics (e.g. race/ethniticy, gender, disability status)
  </BulletSection>
  <CalloutSection calloutType={INFO}>
    <BulletSection icon={<InfoIcon />} bigIcon>
      Once accepted, you will select which expertise and activity you want to
      share with this organization.
    </BulletSection>
  </CalloutSection>
  <SectionHeading>
    <Raw html="What you’re <strong>not</strong> sharing" />
  </SectionHeading>
  <BulletSection icon={<CancelIcon />}>
    Your private uploads (e.g. links, files, notes)
  </BulletSection>
  <BulletSection icon={<CancelIcon />}>
    Your personal activity (e.g. affiliations, bookmarks, login data)
  </BulletSection>
</Section>
```
