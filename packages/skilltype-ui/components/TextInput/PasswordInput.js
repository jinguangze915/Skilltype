import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import TextInput from './TextInput'
import styles from './styles'

class PasswordInput extends React.Component {
  state = {
    showPassword: false,
  }
  onTogglePassword = () => {
    this.setState(p => ({ showPassword: !p.showPassword }))
  }
  render() {
    const { classes, className, children, ...others } = this.props
    const { showPassword } = this.state
    return (
      <TextInput
        className={classnames(className, classes.passwordInput)}
        inputProps={{
          type: showPassword ? 'text' : 'password',
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={this.onTogglePassword}
                tabIndex={-1}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...others}
      >
        {children}
      </TextInput>
    )
  }
}
export default injectSheet(styles)(PasswordInput)
