import React from 'react'
import { func, shape } from 'prop-types'
import Section from '@skilltype/ui/components/Section/Section'
import Form from '@skilltype/ui/components/Form/Form'
import TextField from '@skilltype/ui/components/Form/Fields/TextField'
import LongTextField from '@skilltype/ui/components/Form/Fields/LongTextField'

const AddResource = ({ values, onChange, onSubmit }) => (
  <Section>
    <Form
      id="addResource"
      values={values}
      onChange={onChange}
      onSubmit={onSubmit}
    >
      <TextField
        required
        id="url"
        label="URL"
        missingRequiredError="Required"
        placeholder="https://www.skilltype.com"
      />
      <LongTextField
        id="info"
        label="Notes"
        placeholder="What makes this helpful?"
        style={{ minHeight: '3em' }}
      />
    </Form>
  </Section>
)

AddResource.propTypes = {
  values: shape({}),
  onSubmit: func,
  onChange: func,
}
export default AddResource
