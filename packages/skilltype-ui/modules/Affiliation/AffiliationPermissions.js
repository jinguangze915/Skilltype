import React from 'react'
import Row from '../../components/Viewport/Row'
import Column from '../../components/Viewport/Column'
import Section from '../../components/Section/Section'
import SectionHeading from '../../components/Heading/SectionHeading'
import BulletSection from '../../components/Section/BulletSection'
import CalloutSection, {
  WARNING,
  INFO,
} from '../../components/Section/CalloutSection'
import Raw from '../../components/Viewport/Raw'
import CheckIcon from '../../assets/callout-icons/check.svg'
import WarningIcon from '../../assets/callout-icons/warning.svg'
import InfoIcon from '../../assets/callout-icons/info.svg'
import CancelIcon from '../../assets/callout-icons/cancel.svg'
import { isMobile } from '../../lib/mediaQuery'
import { withRenderOnBreakpoint } from '../../components/Responsive/RenderOnBreakpoint'

const calloutType = blockStyle =>
  ({
    warning: WARNING,
    info: INFO,
  }[blockStyle])

const blockIcon = blockStyle =>
  ({
    warning: WarningIcon,
    info: InfoIcon,
    positive: CheckIcon,
    negative: CancelIcon,
  }[blockStyle])

const replaceTags = (str, org) =>
  str.replace('{{organizationName}}', org.fullName)

const Block = ({ blockData, organization }) => {
  const Icon = blockIcon(blockData.style)
  const bullet = (
    <BulletSection icon={<Icon />} bigIcon={blockData.type === 'callout'}>
      <Raw html={replaceTags(blockData.description, organization)} />
    </BulletSection>
  )
  return blockData.type === 'callout' ? (
    <CalloutSection calloutType={calloutType(blockData.style)}>
      {bullet}
    </CalloutSection>
  ) : (
    bullet
  )
}

const AffiliationPermissions = ({ data, organization }) => (
  <Section>
    <Section style={{ marginBottom: '1.6em' }}>
      {data.headerBlocks.map((block, idx) => (
        <Block key={idx} blockData={block} organization={organization} />
      ))}
    </Section>
    <Row style={!isMobile() ? { padding: `0 15px` } : {}}>
      {data.columns.map((col, idx) => (
        <Column
          key={idx}
          withDivider={!isMobile() && idx === 0}
          grow
          basis="50%"
        >
          {col.map((section, idx) => (
            <Section key={idx}>
              <SectionHeading>
                <Raw html={replaceTags(section.title, organization)} />
              </SectionHeading>
              {section.blocks.map((block, idx) => (
                <Block
                  key={idx}
                  blockData={block}
                  organization={organization}
                />
              ))}
            </Section>
          ))}
        </Column>
      ))}
    </Row>
  </Section>
)

export default withRenderOnBreakpoint(AffiliationPermissions)
