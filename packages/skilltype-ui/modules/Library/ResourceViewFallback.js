import React from 'react'
import Progress from '../../components/Progress/Progress'
import ResourceListHead from '../../components/Library/ResourceListHead'
import ResourceList from '../../components/Library/ResourceList'
import ResourceListItem from '../../components/Library/ResourceListItem'
import ResourceItemFallback from '../../components/Library/ResourceItemFallback'

const ResourceViewFallback = () => (
  <React.Fragment>
    <Progress />
    <ResourceListHead resourceCount="..." disabled />
    <ResourceList>
      {Array(10)
        .fill()
        .map((_, idx) => (
          <ResourceListItem key={idx}>
            <ResourceItemFallback />
          </ResourceListItem>
        ))}
    </ResourceList>
  </React.Fragment>
)

export default ResourceViewFallback
