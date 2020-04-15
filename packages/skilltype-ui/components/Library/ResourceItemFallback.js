import React from 'react'
import injectSheet from 'react-jss'
import ResourceItem from './ResourceItem'
import styles from './styles'

const ResourceItemFallback = ({ classes }) => (
  <ResourceItem
    classes={classes}
    className={classes.resourceItemFallback}
    resourceType="video"
    title=""
    publishedOn=""
    source=""
    url=""
  />
)

export default injectSheet(styles)(ResourceItemFallback)
