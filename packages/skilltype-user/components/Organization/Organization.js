import React from 'react'
import { string } from 'prop-types'
import { withTheme } from 'react-jss'
import { navigate } from '@reach/router'
import Router, {
  Redirect,
  pathFromUri,
  trimmedPathFromUri,
} from '@skilltype/ui/components/Router/Router'
import { organizationTagGroups } from '@skilltype/data'
import Row from '@skilltype/ui/components/Viewport/Row'
import Column from '@skilltype/ui/components/Viewport/Column'
import ProfileCard from '@skilltype/ui/components/ProfileCard/ProfileCard'
import PrimaryButton from '@skilltype/ui/components/Button/PrimaryButton'
import Page from '@skilltype/ui/components/Viewport/Page'
import VerticalMenuBar from '@skilltype/ui/components/MenuBar/VerticalMenuBar'
import MenuContainer from '@skilltype/ui/components/Menu/MenuContainer'
import MenuSection from '@skilltype/ui/components/Menu/MenuSection'
import SegmentedMenuItem from '@skilltype/ui/components/Menu/SegmentedMenuItem'
import Tablet from '@skilltype/ui/components/Responsive/Tablet'
import Header from '../App/Header'
import Profile from './Loaders/OrganizationProfileLoader'
import Directory from './Loaders/OrganizationDirectoryLoader'
import Settings from './Loaders/OrganizationSettingsLoader'

const { getTagGroups, suggestionsByType } = organizationTagGroups
const capitalize = str =>
  typeof str === 'string' ? str.charAt(0).toUpperCase() + str.slice(1) : ''

class Organization extends React.Component {
  static propTypes = {
    /**
     * When navigating to an organization page, the URL will be /organizations/:id/*
     * This id is used to eiter lookup a value fetched from OrganizationProvider or make a network request to establish the necesarry data
     */
    id: string,
  }

  state = {
    adminMode: this.props.organization.isAdmin,
  }

  switchViewMode = () => {
    const { adminMode } = this.state
    const { id, organization } = this.props

    if (organization.isAdmin) {
      if (adminMode) {
        navigate(`/organizations/${id}/profile`)
      }
      this.setState({
        adminMode: !adminMode,
      })
    }
  }

  render() {
    const { id, navigate, location, organization } = this.props
    const cardData = organization
      ? {
          profileTheme: organization.cardColor,
          name: organization.fullName,
          avatarLabel: organization.avatarLabel,
          tagline: capitalize(organization.type),
          location: organization.location,
        }
      : {}
    return (
      <React.Fragment>
        <Header title="Organizations" />
        <Page>
          <Row>
            <Tablet>
              <Column fixed>
                <ProfileCard {...cardData} />
                {organization.isAdmin && (
                  <PrimaryButton
                    style={{ marginTop: '15px' }}
                    onClick={this.switchViewMode}
                  >
                    View as {`${this.state.adminMode ? 'Member' : 'Admin'}`}
                  </PrimaryButton>
                )}
                {this.state.adminMode && (
                  <VerticalMenuBar
                    onNavigate={e => {
                      const path = pathFromUri(e.target.href)
                      navigate(path)
                    }}
                    onCheckActive={props => {
                      const trimmedHref = trimmedPathFromUri(props.href)
                      const trimmedPathname = trimmedPathFromUri(
                        location.pathname
                      )
                      return trimmedPathname.includes(trimmedHref)
                    }}
                    style={{ marginTop: '15px' }}
                  >
                    <MenuContainer>
                      <MenuSection title="Admin Panel">
                        <SegmentedMenuItem
                          href={`/organizations/${id}/profile`}
                        >
                          Profile
                        </SegmentedMenuItem>
                        <SegmentedMenuItem
                          href={`/organizations/${id}/directory`}
                        >
                          Directory
                        </SegmentedMenuItem>
                        <SegmentedMenuItem
                          href={`/organizations/${id}/settings`}
                        >
                          Settings
                        </SegmentedMenuItem>
                      </MenuSection>
                    </MenuContainer>
                  </VerticalMenuBar>
                )}
              </Column>
            </Tablet>
            <Column grow>
              <Router>
                {/* Redirect only takes absolute paths in to={} field */}
                <Redirect from="/" to={`/organizations/${id}/profile`} />
                <Profile
                  default
                  path="profile"
                  id={id}
                  adminMode={this.state.adminMode}
                  getTagGroups={getTagGroups}
                  suggestionsByType={suggestionsByType}
                />
                <Directory path="directory" id={id} />
                <Settings path="settings" id={id} />
              </Router>
            </Column>
          </Row>
        </Page>
      </React.Fragment>
    )
  }
}

export default withTheme(Organization)
