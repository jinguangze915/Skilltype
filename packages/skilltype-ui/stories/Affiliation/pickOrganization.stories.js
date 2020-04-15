import React from 'react'
import { storiesOf } from '@storybook/react'
import affiliationTypes from '@skilltype/data/data/affiliationTypes.json'
import affiliations from '@skilltype/data/data/affiliations'
import { find } from '@skilltype/data'
import Content from '../../components/Viewport/Content'
import { isMobile } from '../../lib/mediaQuery'
import PickOrganization from '../../modules/Affiliation/PickOrganization'
import { ViewportDecorator } from '../decorators'

class PickOrganizationRouter extends React.Component {
  state = {
    values: {
      affiliationType: 'member',
    },
    suggestions: [],
  }
  componentDidMount() {
    this.onQueryChange('')
  }
  onQueryChange = query => {
    const suggestions = find(affiliations, query)
    this.setState({
      suggestions,
      values: {
        ...this.state.values,
        organization: this.state.values.organization || suggestions[0].id,
      },
    })
  }
  render() {
    return (
      <Content
        style={{
          backgroundColor: 'white',
          maxWidth: '750px',
          height: isMobile() ? 'auto' : '500px',
        }}
      >
        <PickOrganization
          affiliationTypes={affiliationTypes}
          values={this.state.values}
          onChange={values => {
            this.setState({
              values: {
                ...values,
                ...(values.organization === this.state.values.organization
                  ? {}
                  : { affiliationType: 'member' }),
              },
            })
          }}
          suggestions={this.state.suggestions}
          onQueryChange={this.onQueryChange}
        />
      </Content>
    )
  }
}

storiesOf('Modules//Affiliation//Pick Organization', module)
  .addDecorator(ViewportDecorator)
  .add('default', () => <PickOrganizationRouter />)
