import React from 'react'
import { storiesOf } from '@storybook/react'
import affiliationTypes from '@skilltype/data/data/affiliationTypes.json'
import { affiliations, normalizeTagData } from '@skilltype/data'
import Content from '@skilltype/ui/components/Viewport/Content'
import AffiliationRequest from '../../modules/Affiliation/AffiliationRequest'
import { ViewportDecorator } from '../decorators'

export const organizations = affiliations.map((org, idx) => ({
  ...normalizeTagData(org),
  type: 'library',
  location: ['Durham, NC', 'Houston, TX', 'Rochester, NY'][idx % 3],
  memberCount: [89, 98, 110][idx % 3],
}))

class AffiliationRequestRouter extends React.Component {
  state = {
    values: {},
  }
  render() {
    return (
      <Content
        style={{ backgroundColor: 'white', maxWidth: '400px', height: '500px' }}
      >
        <AffiliationRequest
          affiliationTypes={affiliationTypes}
          values={this.state.values}
          onChange={values => this.setState({ values })}
          organization={organizations[0]}
        />
      </Content>
    )
  }
}

storiesOf('Modules//Affiliation//Affiliation Request', module)
  .addDecorator(ViewportDecorator)
  .add('default', () => <AffiliationRequestRouter />)
