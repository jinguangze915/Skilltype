import React from 'react'
import { bool, func } from 'prop-types'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import MenuBar from '../MenuBar/MenuBar'
import TransparentButton from '../Button/TransparentButton'
import BookmarkIcon from '../../assets/bookmark.svg'
import InfoIcon from '../../assets/info.svg'
import styles from './styles'

const ResourceItemMenu = ({
  onSaveClick,
  onInfoClick,
  isSaved,
  infoIsVisible,
  classes,
  className,
}) => (
  <React.Fragment>
    <MenuBar className={classnames(className, classes.resourceItemMenu)}>
      {onInfoClick && (
        <TransparentButton
          onClick={onInfoClick}
          className={classnames(classes.infoButton, {
            [classes.active]: infoIsVisible,
          })}
        >
          <InfoIcon />
        </TransparentButton>
      )}
      {onSaveClick && (
        <TransparentButton
          onClick={onSaveClick}
          className={classnames(classes.bookmarkButton, {
            [classes.active]: isSaved,
          })}
        >
          <BookmarkIcon />
        </TransparentButton>
      )}
    </MenuBar>
  </React.Fragment>
)

ResourceItemMenu.propTypes = {
  onSaveClick: func,
  onInfoClick: func,
  isSaved: bool,
  infoIsVisible: bool,
}

export default injectSheet(styles)(ResourceItemMenu)
