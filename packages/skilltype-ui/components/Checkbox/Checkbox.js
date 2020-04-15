import React from 'react'
import { string, bool, func } from 'prop-types'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import MuiCheckbox from '@material-ui/core/Checkbox'
import CheckBoxIconChecked from '@material-ui/icons/CheckBox'
import CheckBoxIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import styles from './styles'

class Checkbox extends React.Component {
  static propTypes = {
    /**
     * Will be set by FormInput if rendered as child. Unique key for the input in the FormContext. Determines the value provided to the underlying Input
     */
    id: string,
    /**
     * Name/description of the input
     */
    label: string,
    /**
     * Value from FormContext. Can be overridden
     */
    value: bool,
    /**
     * Update the FormContext value for this input. Key in the FormContext is the id
     */
    onChange: func,
    /**
     * FormContext disabled
     */
    disabled: bool,
  }

  static defaultProps = {
    onChange: () => {},
  }

  state = {
    focused: false,
  }

  onFocus = () => {
    if (this.state.focused) return
    this.setState({ focused: true })
  }

  onBlur = () => {
    if (!this.state.focused) return
    this.setState({ focused: false })
  }

  handleClick = event => {
    event.preventDefault()
  }

  render() {
    const {
      id,
      disabled,
      label,
      value,
      onChange,
      inputProps,
      labelPlacement,
      classes,
    } = this.props
    return (
      <React.Fragment>
        <FormControlLabel
          checked={value}
          disabled={disabled}
          label={label}
          labelPlacement={labelPlacement}
          classes={{
            label: classes.label,
          }}
          onChange={(e, checked) => {
            this.setState({ focused: false }, () =>
              onChange({ target: { value: checked } })
            )
          }}
          control={
            /*
              Material UI has several bugs with focus on Checkbox/Radio
              components where settings disableRipple={true} makes it
              impossible to visually set the focus state style of the
              Checkbox/Radio.

              In order to accomplish this, we need to mantain
              a ref to the underlying <input> element which rendered
              offscreen. Then setting a focus class manually allows for
              correct checkbox focus.

              Relevant props
              `disableRipple`
              `onFocus`
              `onBlur`
              `className`


              Additionally, in order to force focus on the SVG icon rather than
              the much larger wrapping component, we set `icon` and
              `checkedIcon` props with the same SVG icons that are used by
              default. This is done so the focused and disabled classes can be
              controlled manually - thus allowing us to render a focused outline
              aroudn the appropriate element.

              */
            <MuiCheckbox
              id={id}
              tabIndex={disabled ? '-1' : '0'}
              color="primary"
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onMouseDown={this.handleClick}
              disableRipple
              className={classnames({
                [classes.focused]: this.state.focused,
              })}
              classes={{
                root: classes.root,
                checked: classes.checked,
                disabled: classes.disabled,
                colorPrimary: classes.colorPrimary,
              }}
              icon={
                <CheckBoxIcon
                  tabIndex="-1"
                  className={classnames({
                    [classes.focused]: this.state.focused,
                    [classes.disabled]: disabled,
                  })}
                  classes={{
                    root: classes.icon,
                  }}
                />
              }
              checkedIcon={
                <CheckBoxIconChecked
                  tabIndex="-1"
                  className={classnames({
                    [classes.focused]: this.state.focused,
                    [classes.disabled]: disabled,
                  })}
                  classes={{
                    root: classes.checkedIcon,
                  }}
                />
              }
              {...inputProps}
            />
          }
        />
      </React.Fragment>
    )
  }
}

export default injectSheet(styles)(Checkbox)
