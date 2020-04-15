import React from 'react'
import injectSheet from 'react-jss'
import CardSkeleton from '../../assets/menu-card-skeleton.svg'
import styles from './styles'

const CardFallback = ({ classes }) => (
  <CardSkeleton className={classes.cardFallback} />
)

export default injectSheet(styles)(CardFallback)
