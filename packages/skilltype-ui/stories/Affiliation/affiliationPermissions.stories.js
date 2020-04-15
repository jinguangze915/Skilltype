import React from 'react'
import { storiesOf } from '@storybook/react'
import data from '@skilltype/data/data/affiliation-permissions.json'
import AffiliationPermissions from '../../modules/Affiliation/AffiliationPermissions'
import { ModalDecorator } from '../decorators'
import { organizations } from './affiliationRequest.stories'

storiesOf('Modules//Affiliation//Affiliation Permissions', module)
  .addDecorator(ModalDecorator)
  .add('default', () => (
    <AffiliationPermissions data={data[0]} organization={organizations[0]} />
  ))
