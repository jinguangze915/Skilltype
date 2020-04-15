```js
const profileHeroSrc = require('../../stories/data/assets/card-hero-profile.png')
const orgHeroSrc = require('../../stories/data/assets/card-hero-org.png')
;<div>
  <Section>
    <CardList>
      <Card
        heroImageSource={profileHeroSrc}
        aria-label="build a profile"
        onClick={() => console.log('clicked profile')}
      >
        <CardHeading>Build a Profile</CardHeading>
        <CardContent>
          Showcase your skills, interests and product experience
        </CardContent>
      </Card>
      <Card
        heroImageSource={orgHeroSrc}
        aria-label="join an organization"
        onClick={() => console.log('clicked org')}
      >
        <CardHeading>Join an Organization</CardHeading>
        <CardContent>
          Connect with your team, alumni network or professional association
        </CardContent>
      </Card>
    </CardList>
  </Section>
</div>
```
