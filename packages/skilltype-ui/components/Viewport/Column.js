import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'
import { getBodyScroll } from '../../lib/dom'
import { isMobile } from '../../lib/mediaQuery'

class Column extends React.Component {
  state = {
    top: null,
  }
  onContainerRef = e => {
    if (e) {
      const scrollTop = getBodyScroll()
      this.setState({ top: e.getBoundingClientRect().y + scrollTop })
    }
  }
  render() {
    const {
      classes,
      className,
      children,
      style,
      grow,
      fixed,
      withDivider,
      tight,
      basis,
    } = this.props
    const { top } = this.state
    return (
      <div
        role="cell"
        className={classnames(className, classes.column, {
          [classes.grow]: grow,
          [classes.fixed]: fixed,
          [classes.withDivider]: withDivider,
          [classes.tight]: tight,
        })}
        style={
          fixed
            ? {}
            : {
                ...(basis && !isMobile() ? { flexBasis: basis } : {}),
                ...style,
              }
        }
        ref={this.onContainerRef}
      >
        {fixed ? (
          <div
            style={{
              ...(top === null ? {} : { top: 0, bottom: 0, paddingTop: top }),

              ...style,
            }}
          >
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    )
  }
}

export default injectSheet(styles)(Column)
