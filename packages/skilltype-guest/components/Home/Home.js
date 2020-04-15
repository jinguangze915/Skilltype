import React from 'react'
import Page from '@skilltype/ui/components/Viewport/Page'
import PageHeading from '@skilltype/ui/components/Heading/PageHeading'
import GuestHomeHero from '@skilltype/ui/components/Hero/GuestHomeHero'
import PrimaryButton from '@skilltype/ui/components/Button/PrimaryButton'
import injectSheet from 'react-jss'
import styles from './styles'

const Home = ({ classes }) => (
  <Page centerContent>
    <PageHeading className={classes.pageHeading}>
      We&apos;re building a talent marketplace for information professionals.
    </PageHeading>
    <GuestHomeHero />
    <PrimaryButton
      className={classes.primaryCta}
      href="https://goo.gl/forms/wYXw0EmS6ZC9Yknx2"
      target="_blank"
    >
      Join Our Slack Workspace for Early Access
    </PrimaryButton>
  </Page>
)

export default injectSheet(styles)(Home)
