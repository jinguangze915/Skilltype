```js
const profileHeroSrc = require('../../stories/data/assets/card-hero-profile.png')
;<CardList>
  <Card
    heroImageSource={profileHeroSrc}
    aria-label="build a profile"
    onClick={() => console.log('clicked')}
  >
    <CardHeading>Build a Profile</CardHeading>
    <CardContent>
      Showcase your skills, interests and product experience
    </CardContent>
  </Card>
  <Card onClick={() => null}>
    <CardHeading>Add Organization</CardHeading>
    <CardContent>Create your organization’s presence on the graph</CardContent>
  </Card>
</CardList>
```
