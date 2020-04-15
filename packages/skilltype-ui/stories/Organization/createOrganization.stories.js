import React from 'react'
import { storiesOf } from '@storybook/react'
import CreateOrganization from '../../modules/Organization/CreateOrganization'
import organizationTypes from '../data/organization.types'
import { ModalDecorator } from '../decorators'

class CreateOrganizationRouter extends React.Component {
  state = {
    values: {},
  }
  render() {
    return (
      <CreateOrganization
        organizationTypes={organizationTypes}
        values={this.state.values}
        onChange={({ values }) => this.setState({ values })}
      />
    )
  }
}

storiesOf('Modules//Organization//Create', module)
  .addDecorator(ModalDecorator)
  .add('default', () => <CreateOrganizationRouter />)
