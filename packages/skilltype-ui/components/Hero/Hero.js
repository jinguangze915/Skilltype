import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import DesktopOnly from '../Responsive/DesktopOnly'
import TabletOnly from '../Responsive/TabletOnly'
import MobileOnly from '../Responsive/MobileOnly'
import styles from './styles'

const Hero = ({
  classes,
  className,
  style,
  desktopAsset,
  tabletAsset,
  mobileAsset,
}) => (
  <div
    role="banner"
    aria-label="hero"
    className={classnames(className, classes.hero)}
    style={style}
  >
    <DesktopOnly>
      <img src={desktopAsset} alt="hero" />
    </DesktopOnly>
    <TabletOnly>
      <img src={tabletAsset} alt="hero" />
    </TabletOnly>
    <MobileOnly>
      <img src={mobileAsset} alt="hero" />
    </MobileOnly>
  </div>
)

export default injectSheet(styles)(Hero)
