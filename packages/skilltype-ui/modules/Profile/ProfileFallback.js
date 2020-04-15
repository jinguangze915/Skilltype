import React from 'react'
import TagListSkeleton from '../../assets/tag-list-skeleton.svg'
import Progress from '../../components/Progress/Progress'
import Content from '../../components/Viewport/Content'

const ProfileFallback = () => (
  <Content>
    <Progress />
    {[1, 2, 3, 4].map(idx => (
      <TagListSkeleton key={idx} style={{ marginBottom: '50px' }} />
    ))}
  </Content>
)

export default ProfileFallback
