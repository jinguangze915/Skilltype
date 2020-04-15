import React from 'react'
import { string } from 'prop-types'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import {
  HtmlIcon,
  VideoIcon,
  PresentationIcon,
  PodcastIcon,
  PdfIcon,
} from '../../assets/resource-icons'
import styles from './styles'
import { getAriaProps } from '../../lib/props'
import Tablet from '../Responsive/Tablet'
import MobileOnly from '../Responsive/MobileOnly'

const resourceView = resourceType => {
  switch (resourceType) {
    case 'paper': {
      return {
        icon: <PdfIcon />,
        name: 'Paper',
      }
    }
    case 'podcast': {
      return {
        icon: <PodcastIcon />,
        name: 'Podcast',
      }
    }
    case 'presentation': {
      return {
        icon: <PresentationIcon />,
        name: 'Presentation',
      }
    }
    case 'video': {
      return {
        icon: <VideoIcon />,
        name: 'Video',
      }
    }
    default: {
      return {
        icon: <HtmlIcon />,
        name: 'Course',
      }
    }
  }
}

class ResourceItem extends React.Component {
  static propTypes = {
    resourceType: string,
    title: string,
    publishedOn: string,
    source: string,
    url: string,
  }

  onClick = evt => {
    evt.preventDefault()
    if (this.props.onNavigate) {
      this.props.onNavigate(evt)
    }
  }

  render() {
    const {
      resourceType,
      source,
      title,
      publishedOn,
      url,
      classes,
      className,
      style,
      ...others
    } = this.props
    const view = resourceView(resourceType)
    const children = React.Children.map(others.children, child =>
      React.cloneElement(child, { classes })
    )
    return (
      <div
        className={classnames(className, classes.resourceItem)}
        style={style}
        {...getAriaProps(others)}
      >
        <div className={classes.icon}>{view.icon}</div>
        <div className={classes.content}>
          <a className={classes.title} href={url} onClick={this.onClick}>
            {title}
          </a>

          <div className={classes.meta}>
            {view.name} · {source} · {publishedOn.toString()}
          </div>
          <MobileOnly>{children}</MobileOnly>
        </div>
        <Tablet>{children}</Tablet>
      </div>
    )
  }
}

export default injectSheet(styles)(ResourceItem)
