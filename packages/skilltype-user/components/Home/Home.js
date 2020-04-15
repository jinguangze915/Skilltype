import React from 'react'
import CardMenu from '@skilltype/ui/modules/CardMenu/CardMenuLoader'
import {
  withLocationContext,
  pathFromUri,
} from '@skilltype/ui/components/Router/Router'
import { withServiceContext } from '@skilltype/services/components/ServiceProvider'
import menuItems from '@skilltype/data/data/user-menu.json'
import Header from '../App/Header'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuItems,
    }
  }
  onNavigate = e =>
    this.props.locationContext.navigate(pathFromUri(e.target.href))
  render() {
    return (
      <React.Fragment>
        <Header title="Home" />
        <CardMenu
          menuItems={this.state.menuItems}
          onNavigate={this.onNavigate}
        />
      </React.Fragment>
    )
  }
}

export default withServiceContext(withLocationContext(Home))
