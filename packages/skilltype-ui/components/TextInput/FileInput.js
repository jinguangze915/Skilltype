import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import CheckSvg from '@skilltype/ui/assets/callout-icons/check.svg'
import styles from './../Button/styles'
// import styles from './styles'

const FileInput = ({
  classes,
  className,
  onChange,
  file,
  acceptedFiles,
  id,
}) => (
  <React.Fragment>
    <label
      htmlFor={id}
      style={{ margin: 'auto 10px' }}
      className={classnames([className, classes.fileInputButton])}
    >
      <i /> Upload CSV
    </label>
    {file && (
      <span style={{ margin: 'auto 30px', display: 'flex' }}>
        {file.name}
        <CheckSvg style={{ margin: '0 5px' }} />
      </span>
    )}
    <input
      id={id}
      type="file"
      style={{ display: 'none' }}
      onChange={onChange}
      accept={acceptedFiles}
    />
  </React.Fragment>
)

export default injectSheet(styles)(FileInput)
