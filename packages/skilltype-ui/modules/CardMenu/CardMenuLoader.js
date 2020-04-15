import React from 'react'
import injectSheet from 'react-jss'
import CardList from '../../components/Card/CardList'
import CardFallback from '../../components/Card/CardFallback'
import Progress from '../../components/Progress/Progress'
import { withAwait } from '../../components/Await/Await'
import CardMenu from './CardMenu'
import styles from './styles'

const LoadingFallback = injectSheet(styles)(({ classes }) => (
  <React.Fragment>
    <Progress />
    <CardList className={classes.cardMenuFallback}>
      {[0, 1, 2].map((item, idx) => <CardFallback key={idx} />)}
    </CardList>
  </React.Fragment>
))

export default withAwait(CardMenu, LoadingFallback)
