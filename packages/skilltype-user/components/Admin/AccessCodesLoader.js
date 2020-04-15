import React from 'react'
import qs from 'qs'
import Page from '@skilltype/ui/components/Viewport/Page'
import Progress from '@skilltype/ui/components/Progress/Progress'
import AccessCodes from '@skilltype/ui/modules/AccessCodes/AccessCodes'
import { withServiceContext } from '@skilltype/services/components/ServiceProvider'
import { withLocationContext } from '@skilltype/ui/components/Router/Router'
// TODO @jacob - Might need to set some loading state on this component to handle the following cases:
//
// 1. The table has been loaded and the skilltype admin generates new access codes
//    In this case the table needs to remain on screen and update its values
//
// 2. The page is changed
//    In this case the table should remain on screen until the next batch of data is loaded
//
// 3. The filter is changed
//    In this case, the table should remain on screen until the new results are applied and laoded again
class AccessCodesLoader extends React.Component {
  state = {
    // Loading state for the different loading cases described above
    isLoading: true,
    accessCodes: null,
  }

  componentDidMount() {
    const { page, filter } = qs.parse(
      this.props.locationContext.location.search,
      {
        ignoreQueryPrefix: true,
      }
    )

    // eslint-disable-next-line
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.props.serviceContext.admin
          .getAccessCodes(page, filter)
          .then(accessCodes => this.setState({ accessCodes, isLoading: false }))
      }
    )
  }

  handleCreateAccessCodes = values => {
    // Update state.accessCodes to be a promise again so withAwait triggers <Loading />
    //
    // createAccessCodes returns the list of newly generated accessCodes
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.props.serviceContext.admin.createAccessCodes(values).then(() => {
          this.setState({ isLoading: false })
        })
      }
    )
  }

  // This function takes `newPage` and/or `newFilter` values
  // It will update the current URL to include the new query parameters
  // Then make a new request to getAccessCodes with the updates values
  handleSearch = (newPage, newFilter) => {
    // Compute current query parameters and merge with new query parameters
    const { page: oldPage, filter: oldFilter } = qs.parse(
      this.props.locationContext.location.search,
      { ignoreQueryPrefix: true }
    )
    // One of these values will have changed, so override both by default with the old value as the fallback
    const page = newPage || oldPage
    const filter =
      newFilter !== undefined && newFilter !== null ? newFilter : oldFilter

    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.props.serviceContext.admin
          .getAccessCodes(page, filter)
          .then(accessCodes => {
            const query = qs.stringify(
              { page, filter },
              { includeQueryPrefix: true }
            )
            this.props.navigate(`?${query}`, { replace: true })
            this.setState({ accessCodes, isLoading: false })
          })
      }
    )
  }

  render() {
    // Can either be a promise or the access codes results
    const { accessCodes, isLoading } = this.state
    const { page, filter } = qs.parse(
      this.props.locationContext.location.search,
      {
        ignoreQueryPrefix: true,
      }
    )
    return (
      <Page>
        {isLoading && <Progress />}
        {accessCodes ? (
          <AccessCodes
            page={page}
            filter={filter}
            accessCodes={accessCodes}
            onSearch={this.handleSearch}
            onCreateAccessCodes={this.handleCreateAccessCodes}
          />
        ) : null}
      </Page>
    )
  }
}

export default withServiceContext(withLocationContext(AccessCodesLoader))
