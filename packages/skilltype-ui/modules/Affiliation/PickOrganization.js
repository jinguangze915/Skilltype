import React from 'react'
import { shape, string, func } from 'prop-types'
import { isMobile } from '../../lib/mediaQuery'
import Row from '../../components/Viewport/Row'
import Column from '../../components/Viewport/Column'
import ListPicker from '../../components/ListPicker/ListPicker'
import AffiliationRequest from './AffiliationRequest'

class PickOrganization extends React.Component {
  static propTypes = {
    onQueryChange: func.isRequired,
    query: string,
    onChange: func.isRequired,
    values: shape(),
  }
  state = {
    activeIndex: -1,
  }
  onActiveIndexChange = activeIndex => this.setState({ activeIndex })
  onQueryChange = query => {
    this.props.onQueryChange(query)
    this.setState({ activeIndex: -1 })
  }
  onItemSelected = (id, index) => {
    this.props.onChange({
      ...this.props.values,
      organization: id,
    })
    this.setState({
      activeIndex: index,
    })
  }
  onAffiliationRequestChange = values =>
    this.props.onChange({ ...this.props.values, ...values })

  render() {
    const { suggestions, affiliationTypes, values, query } = this.props
    const { activeIndex } = this.state
    // if we're not fetching suggestions, update the selected org
    // only update if the selected org is in the list of suggestions
    //   otherwise leave it at the value stored in the component
    if (!(suggestions instanceof Promise) && values.organization) {
      this.selectedOrganization =
        suggestions.find(org => org.uniqueName === values.organization) ||
        this.selectedOrganization
    }
    return (
      <Row style={{ flexGrow: 1 }} tight>
        <Column
          style={{
            flexBasis: '48%',
            ...(!isMobile() ? { height: '100%' } : {}),
          }}
          tight
          grow
        >
          <ListPicker
            id="pickOrg"
            suggestions={suggestions}
            selected={{ [values.organization]: true }}
            onQueryChange={this.onQueryChange}
            query={query}
            activeIndex={activeIndex}
            placeholder="Type to filter..."
            noResultsMessage="No matches found"
            onItemSelected={this.onItemSelected}
            onActiveIndexChange={this.onActiveIndexChange}
            aria-label="organizations"
            style={{ height: isMobile() ? '40vh' : '100%' }}
          />
        </Column>
        {this.selectedOrganization && (
          <Column
            withDivider
            tight
            grow
            style={{ height: '100%', width: '50%' }}
          >
            <AffiliationRequest
              affiliationTypes={affiliationTypes}
              values={values}
              onChange={this.onAffiliationRequestChange}
              organization={this.selectedOrganization}
            />
          </Column>
        )}
      </Row>
    )
  }
}

export default PickOrganization
