import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import Section from './Section'
import Raw from '../Viewport/Raw'
import styles from './styles'

const RawSection = ({ classes, className, children, ...others }) => (
  <Section className={classnames(className, classes.rawSection)} {...others}>
    {React.Children.map(children, (child, idx) => {
      if (typeof child !== 'string') {
        return child
      }
      if (idx === 0) {
        return <Raw html={child.replace(/ $/, '&nbsp')} />
      }
      if (idx === children.length - 1) {
        return <Raw html={child.replace(/^ /, '&nbsp')} />
      }
      return <Raw html={child.replace(/ $/, '&nbsp').replace(/^ /, '&nbsp')} />
    })}
  </Section>
)

export default injectSheet(styles)(RawSection)
