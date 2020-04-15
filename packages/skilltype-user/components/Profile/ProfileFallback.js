import React from 'react'
import TagListSkeleton from '@skilltype/ui/assets/tag-list-skeleton.svg'
import Progress from '@skilltype/ui/components/Progress/Progress'

const ProfileFallback = () => (
  <React.Fragment>
    <Progress />
    {[1, 2, 3, 4, 5].map(idx => (
      <TagListSkeleton key={idx} style={{ marginBottom: '50px' }} />
    ))}
  </React.Fragment>
)

export default ProfileFallback
