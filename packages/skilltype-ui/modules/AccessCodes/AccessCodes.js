import React from 'react'
import { bool, string, shape, func, arrayOf } from 'prop-types'
import { withTheme } from 'react-jss'
import RaisedSection from '../../components/Section/RaisedSection'
import Form from '../../components/Form/Form'
import NumberField from '../../components/Form/Fields/NumberField'
import SelectField from '../../components/Form/Fields/SelectField'
import SubmitButton from '../../components/Button/SubmitButton'
import Table from '../../components/Table/Table'
import ClipboardCopy from '../../components/ClipboardCopy/ClipboardCopy'
import InlineLinkButton from '../../components/Button/InlineLinkButton'

class GenerateAccessCodes extends React.Component {
  static propTypes = {
    onCreateAccessCodes: func.isRequired,
  }

  state = {
    values: { count: 500 },
  }

  handleChange = ({ values }) => this.setState({ values })

  handleSubmit = (_, { isValid }) => {
    if (!isValid) return
    this.props.onCreateAccessCodes(this.state.values)
  }

  render() {
    return (
      <Form
        id="generate-access-codes"
        values={this.state.values}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      >
        <NumberField id="count" label="Count" />
        <SubmitButton>Generate Access Codes</SubmitButton>
      </Form>
    )
  }
}

class FilterAccessCodes extends React.Component {
  state = {
    values: {
      page: this.props.page || 0,
      filter: this.props.filter,
    },
  }

  handleChange = ({ values }) => this.setState({ values })

  handleSubmit = () => {
    const { values } = this.state
    this.props.onSearch(values.page, values.filter)
  }

  render() {
    const { page, filter } = this.state.values
    return (
      <Form
        id="search"
        values={this.state.values}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      >
        <NumberField id="page" label="Page" value={page} />
        <SelectField
          id="filter"
          label="Activated"
          value={filter}
          options={[
            { label: 'Activated', value: true },
            { label: 'Unactivated', value: false },
          ]}
        />
        <SubmitButton>Update Filters</SubmitButton>
      </Form>
    )
  }
}

/**
 *
 */
class AccessCodes extends React.Component {
  static propTypes = {
    accessCodes: arrayOf(
      shape({
        id: string.isRequired,
        activated: bool.isRequired,
        email: string,
        value: string.isRequired,
      }).isRequired
    ).isRequired,
    onCreateAccessCodes: func.isRequired,
    theme: shape({}),
  }

  onUpdate = () => {}

  formatTableData = accessCodes => {
    if (!accessCodes.length) {
      return [[]]
    }
    // Order of data in this array must match the order of columns in <Table columns={ [ ... ] } />
    return accessCodes.map(code => [code.value, code.email, code.activated])
  }

  render() {
    const {
      theme,
      accessCodes,
      page,
      filter,
      onCreateAccessCodes,
      onSearch,
    } = this.props
    const data = this.formatTableData(accessCodes)
    return (
      <React.Fragment>
        <RaisedSection contentPadding title="Generate Access Codes">
          <GenerateAccessCodes onCreateAccessCodes={onCreateAccessCodes} />
        </RaisedSection>
        <RaisedSection contentPadding title="Filter Access Codes">
          <FilterAccessCodes page={page} filter={filter} onSearch={onSearch} />
        </RaisedSection>

        <RaisedSection contentPadding title="List Access Codes">
          <Table
            data={data}
            onUpdate={this.onUpdate}
            columns={[
              {
                name: 'Code',
                options: {
                  customBodyRender: value => (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        maxWidth: '20rem',
                      }}
                    >
                      <div className="code">{value}</div>
                      <div className="copy">
                        <ClipboardCopy text={value} />
                      </div>
                    </div>
                  ),
                },
              },
              {
                name: 'Email',
                options: {
                  customBodyRender: email =>
                    email ? (
                      <InlineLinkButton href={`mailto:${email}`}>
                        {email}
                      </InlineLinkButton>
                    ) : (
                      ''
                    ),
                },
              },

              {
                name: 'Activated',
                options: {
                  customBodyRender: activated => {
                    // Simple color mapping for access code status
                    const color = activated ? theme.red : theme.green
                    const name = activated ? 'Activated' : 'Unactivated'
                    return <div style={{ color }}>{name}</div>
                  },
                },
              },
            ]}
          />
        </RaisedSection>
      </React.Fragment>
    )
  }
}

export default withTheme(AccessCodes)
