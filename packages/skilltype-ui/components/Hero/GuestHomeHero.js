import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import Hero from './Hero'
import styles from './styles'

const GuestHomeHero = ({ classes, className, style, ...others }) => (
  <Hero
    className={classnames(className, classes.guestHomeHero)}
    style={style}
    desktopAsset={require('../../assets/hero-large.png')}
    tabletAsset={require('../../assets/hero-large.png')}
    mobileAsset={require('../../assets/hero-mobile.png')}
    {...others}
  />
)

export default injectSheet(styles)(GuestHomeHero)
