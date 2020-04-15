import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import CardList from '@skilltype/ui/components/Card/CardList'
import Card from '@skilltype/ui/components/Card/Card'
import CardHeading from '@skilltype/ui/components/Card/CardHeading'
import CardContent from '@skilltype/ui/components/Card/CardContent'
import ProfileCard from '@skilltype/ui/components/ProfileCard/ProfileCard'
import styles from './styles'

const OrganizationList = ({
  organizations,
  showAdd,
  onAdd,
  classes,
  onNavigate,
}) => (
  <CardList style={{ display: 'flex', flexDirection: 'row' }}>
    {showAdd && (
      <Card
        onClick={onAdd}
        className={classnames({
          [classes.addCard]: !organizations.length,
        })}
      >
        <CardHeading>Add Organization</CardHeading>
        <CardContent centered>
          Create your organization’s presence on the graph
        </CardContent>
      </Card>
    )}
    {organizations.map((org, index) => (
      <ProfileCard
        key={`${index}-${org.name}`}
        href={`/organizations/${org.id}`}
        onClick={onNavigate}
        {...org}
      />
    ))}
  </CardList>
)

export default injectSheet(styles)(OrganizationList)
