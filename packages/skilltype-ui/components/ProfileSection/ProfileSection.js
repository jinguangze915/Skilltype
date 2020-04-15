import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import Section from '../Section/Section'
import EditButton from '../Button/EditButton'
import styles from './styles'

const ProfileSection = ({
  classes,
  className,
  title,
  children,
  style,
  canEdit,
  onEdit,
}) => (
  <article
    role="group"
    aria-label={title}
    className={classnames([className, classes.profileSection])}
    style={style}
  >
    <header>
      {title}
      {canEdit && (
        <EditButton
          className={classes.editButton}
          onClick={onEdit}
          aria-label={`Edit ${title}, opens dialog`}
        />
      )}
    </header>
    <Section>{children}</Section>
  </article>
)

export default injectSheet(styles)(ProfileSection)
