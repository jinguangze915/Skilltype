import React from 'react'
import { withTheme } from 'react-jss'
import Row from '@skilltype/ui/components/Viewport/Row'
import Column from '@skilltype/ui/components/Viewport/Column'
import Page from '@skilltype/ui/components/Viewport/Page'
import VerticalMenuBar from '@skilltype/ui/components/MenuBar/VerticalMenuBar'
import MenuContainer from '@skilltype/ui/components/Menu/MenuContainer'
import MenuSection from '@skilltype/ui/components/Menu/MenuSection'
import SegmentedMenuItem from '@skilltype/ui/components/Menu/SegmentedMenuItem'
import Tablet from '@skilltype/ui/components/Responsive/Tablet'
import Router, {
  Redirect,
  pathFromUri,
  trimmedPathFromUri,
} from '@skilltype/ui/components/Router/Router'
import { navigate } from '@reach/router'
import ManageUsers from './ManageUsers'
import ManageResources from './ManageResources'

const AdminIndex = () => (
  <React.Fragment>
    <Page>
      <Row>
        <Tablet>
          <Column fixed>
            <VerticalMenuBar
              onNavigate={e => {
                const path = pathFromUri(e.target.href)
                navigate(path)
              }}
              onCheckActive={props => {
                const trimmedHref = trimmedPathFromUri(props.href)
                const trimmedPathname = trimmedPathFromUri(
                  window.location.pathname
                )
                return trimmedPathname.includes(trimmedHref)
              }}
            >
              <MenuContainer style={{ width: '201px' }}>
                <MenuSection title="Admin Panel">
                  <SegmentedMenuItem href="/admin/resources">
                    Resources
                  </SegmentedMenuItem>
                  <SegmentedMenuItem href="/admin/tags">Tags</SegmentedMenuItem>
                  <SegmentedMenuItem href="/admin/users">
                    Users
                  </SegmentedMenuItem>
                </MenuSection>
              </MenuContainer>
            </VerticalMenuBar>
          </Column>
        </Tablet>
        <Column grow>
          <Router>
            <Redirect from="/" to="/admin/users" />
            <ManageResources path="resources" />
            <ManageUsers path="users" />
          </Router>
        </Column>
      </Row>
    </Page>
  </React.Fragment>
)

export default withTheme(AdminIndex)
