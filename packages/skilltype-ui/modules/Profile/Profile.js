import React from 'react'
import ProfileSection from '../../components/ProfileSection/ProfileSection'
import InstructionSection from '../../components/Section/InstructionSection'
import TagList from '../../components/TagList/TagList'
import Tag from '../../components/Tag/Tag'
import Content from '../../components/Viewport/Content'
import { alphabetizeTagList } from '../../lib/tags'

export default ({ tagGroups, onEditTagGroup }) => (
  <Content>
    {Object.keys(tagGroups).map(groupKey => (
      <ProfileSection
        title={tagGroups[groupKey].title}
        key={groupKey}
        canEdit={tagGroups[groupKey].canEdit}
        onEdit={() => onEditTagGroup(groupKey)}
      >
        {tagGroups[groupKey].tags.length ? (
          <TagList
            tagTheme="white"
            aria-label={`Tag list for "${tagGroups[groupKey].title}"`}
          >
            {alphabetizeTagList(tagGroups[groupKey].tags).map(tag => (
              <Tag key={tag.id}>{tag.name}</Tag>
            ))}
          </TagList>
        ) : (
          <InstructionSection>
            {tagGroups[groupKey].placeholder}
          </InstructionSection>
        )}
      </ProfileSection>
    ))}
  </Content>
)
