import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import TransparentButton from '../Button/TransparentButton'
import styles from './styles'
import { getAriaProps } from '../../lib/props'

const Card = ({
  classes,
  className,
  style,
  hero,
  heroImageSource,
  children,
  onClick,
  href,
  ...others
}) => {
  const Tag = onClick || href ? TransparentButton : 'div'

  return (
    <Tag
      className={classnames(className, classes.card, {
        [classes.withHero]: hero || heroImageSource,
      })}
      style={style}
      onClick={onClick}
      href={href}
      {...getAriaProps(others)}
    >
      {(hero || heroImageSource) && (
        <div
          className={classes.hero}
          style={{
            backgroundImage: `url(${heroImageSource})`,
          }}
        >
          {hero}
        </div>
      )}
      <div className={classes.content}>
        {React.Children.map(children, child =>
          React.cloneElement(child, { classes })
        )}
      </div>
    </Tag>
  )
}

export default injectSheet(styles)(Card)
