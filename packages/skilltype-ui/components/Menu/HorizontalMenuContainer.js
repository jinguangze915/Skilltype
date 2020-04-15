import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import MenuContainer from './MenuContainer'
import styles from './styles'

const HorizontalMenuContainer = ({ style, className, classes, children }) => (
  <MenuContainer
    className={classnames(className, classes.horizontalMenuContainer)}
    style={style}
    classes={classes}
  >
    {children}
  </MenuContainer>
)

export default injectSheet(styles)(HorizontalMenuContainer)
