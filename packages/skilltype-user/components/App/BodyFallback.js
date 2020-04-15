import React from 'react'
import Page from '@skilltype/ui/components/Viewport/Page'
import Row from '@skilltype/ui/components/Viewport/Row'
import Column from '@skilltype/ui/components/Viewport/Column'
import ProfileCardSkeleton from '@skilltype/ui/assets/profile-card-skeleton.svg'

const BodyFallback = ({ children }) => (
  <Page>
    <Row>
      <Column>
        <ProfileCardSkeleton />
      </Column>
      <Column grow>{children}</Column>
    </Row>
  </Page>
)

export default BodyFallback
