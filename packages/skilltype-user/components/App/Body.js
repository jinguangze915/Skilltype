import React from 'react'
import Page from '@skilltype/ui/components/Viewport/Page'
import Row from '@skilltype/ui/components/Viewport/Row'
import Column from '@skilltype/ui/components/Viewport/Column'
import ProfileCard from '@skilltype/ui/components/ProfileCard/ProfileCard'
import Tablet from '@skilltype/ui/components/Responsive/Tablet'
import NavMenu from './NavMenu'

const Body = ({ userData, children }) => {
  const { city, state } = userData
  const location = city && state ? `${city}, ${state}` : ''
  const cardData = {
    profileTheme: userData.cardColor || 'fog',
    name: `${userData.firstName} ${userData.lastName}`,
    tagline: userData.tagline || '',
    location,
    avatarLabel:
      userData.firstName.charAt(0).toUpperCase() +
      userData.lastName.charAt(0).toUpperCase(),
    verified: false,
  }
  return (
    <Page>
      <Row>
        <Tablet>
          <Column fixed style={{ paddingBottom: '2em' }}>
            <ProfileCard {...cardData} style={{ marginBottom: '1em' }} />
            <NavMenu />
          </Column>
        </Tablet>
        <Column grow>{children}</Column>
      </Row>
    </Page>
  )
}

export default Body
