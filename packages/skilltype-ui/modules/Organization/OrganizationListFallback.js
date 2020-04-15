import React from 'react'
import { navigate } from '@reach/router'
import injectSheet from 'react-jss'
import Row from '../../components/Viewport/Row'
import Section from '../../components/Section/Section'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import PrimaryButton from '../../components/Button/PrimaryButton'
import styles from './styles'

const OrganizationListFallback = props => {
  const { classes } = props
  return (
    <Row style={{ justifyContent: 'center' }}>
      <Section className={classes.fallbackContainer}>
        <div className={classes.fallbackLeft}>
          <div className={classes.fallbackHeader}>Welcome to Organizations</div>
          <div className={classes.fallbackDescription}>
            To get started, go to your profile to request an affiliation with an
            organization. Once accepted, you will receive a notification. You
            will be able to access the organization via a card on this page.
          </div>
          <PrimaryButton
            href="/profile"
            onClick={e => navigate(e.target.href)}
            style={{ marginTop: '1rem' }}
          >
            Go to Profile
          </PrimaryButton>
        </div>
        <div className={classes.fallbackRight}>
          <ProfileCard
            profileTheme="carolina"
            avatarLabel="SU"
            name="Southern University"
            tagline="Library"
            location="Baton Rouge, LA"
          />
        </div>
      </Section>
    </Row>
  )
}

export default injectSheet(styles)(OrganizationListFallback)
