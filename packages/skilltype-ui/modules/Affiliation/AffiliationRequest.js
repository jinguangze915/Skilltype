import React from 'react'
import { shape, string, func, arrayOf } from 'prop-types'
import { isMobile } from '../../lib/mediaQuery'
import Tablet from '../../components/Responsive/Tablet'
import CardHeading from '../../components/Card/CardHeading'
import CardContent from '../../components/Card/CardContent'
import RadioGroupField from '../../components/Form/Fields/RadioGroupField'
import { HORIZONTAL } from '../../components/Radio/RadioGroup'
import Radio from '../../components/Radio/Radio'
import Section from '../../components/Section/Section'
import BasicMap from '../../components/Map/BasicMap'
import MapMarker from '../../components/Map/MapMarker'
import { SCHOOL } from '../../components/Map/MarkerSvg'

const affiliationTypeName = type =>
  ({
    library: 'Library',
    university: 'University',
    vendor: 'Vendor',
    consortium: 'Consortium',
    association: 'Association',
    community: 'Community',
  }[type])

class AffiliationRequest extends React.Component {
  static propTypes = {
    onChange: func.isRequired,
    affiliationTypes: arrayOf(
      shape({
        id: string,
        description: string,
        name: string,
      })
    ).isRequired,
    values: shape({
      affiliationType: string,
      organization: string,
    }).isRequired,
  }
  componentDidUpdate() {
    if (this.mapRef) {
      this.mapRef.resize()
    }
  }
  onAffiliationTypeChange = value => {
    this.props.onChange({ ...this.props.values, affiliationType: value })
  }
  onMapLoad = mapRef => {
    this.mapRef = mapRef
  }
  render() {
    const { affiliationTypes, values, organization } = this.props
    const selectedAffiliationType = affiliationTypes.find(
      t => t.id === values.affiliationType
    )
    return (
      <React.Fragment>
        <Section contentPadding tight>
          <CardHeading style={{ justifyContent: 'flex-start' }}>
            {organization.fullName}
          </CardHeading>
          <CardContent>
            {affiliationTypeName(organization.type.toLowerCase())} •{' '}
            {organization.location}
          </CardContent>
          {/* <CardContent>{organization.memberCount} members</CardContent> */}
        </Section>
        {organization.affiliated || (
          <Section newGroup contentPadding tight>
            <RadioGroupField
              id="affiliationType"
              value={values.affiliationType}
              onChange={this.onAffiliationTypeChange}
              label="Choose an affiliation type"
              orientation={HORIZONTAL}
              helperText={
                selectedAffiliationType && selectedAffiliationType.description
              }
            >
              {affiliationTypes.map(t => (
                <Radio label={t.name} value={t.id} key={t.id} />
              ))}
            </RadioGroupField>
          </Section>
        )}
        <Tablet>
          <Section
            newGroup
            style={{ flexGrow: 1, ...(isMobile() ? { height: '200px' } : {}) }}
            tight
          >
            <BasicMap lnglat={organization.latlng} onLoad={this.onMapLoad}>
              <MapMarker
                lnglat={organization.latlng}
                icon={SCHOOL}
                color="midnightColor"
              />
            </BasicMap>
          </Section>
        </Tablet>
      </React.Fragment>
    )
  }
}

export default AffiliationRequest
