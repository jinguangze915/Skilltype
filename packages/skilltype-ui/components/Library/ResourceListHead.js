import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
// import PrimaryButton from '../Button/PrimaryButton'
import { isMobile } from '../../lib/mediaQuery'
import styles from './styles'

const ResourceListHead = ({
  resourceCount,
  // onAddClick,
  // disabled,
  children,
  className,
  classes,
  style,
}) => (
  <div
    className={classnames(className, classes.resourceListHead)}
    style={style}
  >
    <div className={classes.content}>
      <div role="heading" aria-level="3" className={classes.heading}>
        Collection
      </div>
      <div className={classes.summary}>
        {resourceCount} resources {isMobile() ? '' : 'based on your interests'}
      </div>
      {React.Children.map(
        children,
        child => child && React.cloneElement(child, { classes })
      )}
    </div>
    {/* <PrimaryButton onClick={onAddClick} disabled={disabled}>
      {isMobile() ? '+' : 'Add Resource'}
    </PrimaryButton> */}
    {
      // TODO: temporarily disabling 'Add Resource' button until functionality is updated - @donovantaitt 8/16/19
    }
  </div>
)

export default injectSheet(styles)(ResourceListHead)
