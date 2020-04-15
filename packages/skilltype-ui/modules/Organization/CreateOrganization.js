import React from 'react'
import { string, func, shape, arrayOf, instanceOf } from 'prop-types'
import { affiliations } from '@skilltype/data'
import Section from '@skilltype/ui/components/Section/Section'
import Form from '@skilltype/ui/components/Form/Form'
import ZipField from '@skilltype/ui/components/Form/Fields/ZipField'
import TextField from '@skilltype/ui/components/Form/Fields/TextField'
import SelectField from '@skilltype/ui/components/Form/Fields/SelectField'
import CheckboxField from '@skilltype/ui/components/Form/Fields/CheckboxField'

const formSectionStyles = {
  paddingTop: '20px',
  paddingBottom: '20px',
  paddingLeft: '20px',
  paddingRight: '20px',
}

const universityOptions = affiliations.map(({ name, id }) => ({
  label: name,
  value: id,
}))

class CreateOrganization extends React.Component {
  static propTypes = {
    values: shape({}),
    menuPortalTarget: instanceOf(Element),
    onSubmit: func,
    onChange: func,
    contextRef: func,
    organizationTypes: arrayOf(shape({ label: string, value: string })),
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.menuPortalTarget !== nextProps.menuPortalTarget) {
      return true
    }

    if (this.props.values !== nextProps.values) {
      return true
    }
    return false
  }

  render() {
    const {
      values,
      menuPortalTarget,
      onChange,
      onSubmit,
      contextRef,
      organizationTypes,
    } = this.props
    return (
      <Section>
        <Form
          id="createOrganization"
          style={{ paddingBottom: 0 }}
          values={values}
          onChange={onChange}
          onSubmit={onSubmit}
          contextRef={contextRef}
          disableSubmitUntilValid={false}
        >
          <Section style={formSectionStyles}>
            <SelectField
              required
              id="uniqueName"
              label="Name"
              missingRequiredError="Please select an organization"
              options={universityOptions}
              inputProps={{
                menuPortalTarget,
                maxMenuHeight: 250,
              }}
            />
            <SelectField
              required
              id="type"
              label="Type"
              missingRequiredError="Please select an organization type"
              options={organizationTypes}
              inputProps={{
                menuPortalTarget,
                maxMenuHeight: 200,
              }}
            />
            <TextField id="url" label="Website URL" placeholder="https://" />
            <TextField id="emailDomain" label="Email Domain" placeholder="" />
            <ZipField
              required
              id="zipCode"
              label="Zip Code"
              placeholder="70115"
              missingRequiredError="Please add a zipcode"
              inputProps={{
                style: { width: 'auto' },
              }}
            />
            <CheckboxField
              id="representative"
              label="I am an official representative of this organization"
            />
          </Section>
        </Form>
      </Section>
    )
  }
}

export default CreateOrganization
