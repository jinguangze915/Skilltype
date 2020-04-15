import React from 'react'
import Page from '@skilltype/ui/components/Viewport/Page'
import PageHeading from '@skilltype/ui/components/Heading/PageHeading'
import GuestHomeHero from '@skilltype/ui/components/Hero/GuestHomeHero'
import Header from './Header'
import Body from './Body'
import { withUserContext } from '../User/UserProvider'

const ComingSoon = ({ title, userContext }) => (
  <Page centerContent>
    <Header title={title} />
    <Body userData={userContext.user}>
      <PageHeading
        style={{
          marginTop: '10px',
        }}
      >
        Coming Soon: {title}
      </PageHeading>
      <GuestHomeHero />
    </Body>
  </Page>
)

export default withUserContext(ComingSoon)
