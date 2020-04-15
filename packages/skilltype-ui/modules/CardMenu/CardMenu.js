import React from 'react'
import injectSheet from 'react-jss'
import CardList from '../../components/Card/CardList'
import Card from '../../components/Card/Card'
import CardHeading from '../../components/Card/CardHeading'
import CardContent from '../../components/Card/CardContent'
import styles from './styles'

const CardMenu = ({ classes, menuItems, onNavigate }) => (
  <CardList className={classes.cardMenu}>
    {menuItems.map((item, idx) => (
      <Card
        heroImageSource={item.heroImageSource}
        aria-label={item.label}
        key={idx}
        onClick={onNavigate}
        href={item.path}
      >
        <CardHeading>{item.heading}</CardHeading>
        <CardContent>{item.content}</CardContent>
      </Card>
    ))}
  </CardList>
)
export default injectSheet(styles)(CardMenu)
