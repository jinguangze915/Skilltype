import React from 'react'
import injectSheet from 'react-jss'
import { withServiceContext } from '@skilltype/services/components/ServiceProvider'
import { withNotifyContext } from '@skilltype/ui/components/Notify/NotifyProvider'
import RaisedSection from '@skilltype/ui/components/Section/RaisedSection'
import styles from './styles'
import AddResourceForm from './AddResourceForm'

class ManageItems extends React.Component {
  state = {}

  componentDidMount = () => {}

  render() {
    return (
      <React.Fragment>
        <RaisedSection style={{ width: '774px' }}>
          <AddResourceForm />
        </RaisedSection>
        <RaisedSection
          title="Reported Items"
          style={{ width: '774px', height: '714px' }}
        />
      </React.Fragment>
    )
  }
}

export default injectSheet(styles)(
  withServiceContext(withNotifyContext(ManageItems))
)
