import React from 'react'
import { string, func } from 'prop-types'
import { withNotifyContext } from '../Notify/NotifyProvider'
import CopyIcon from '../../assets/copy.svg'
import { write } from '../../lib/clipboard'
//
// const InvisibleTextArea = React.forwardRef((_, ref) => (
//   <textarea
//     ref={ref}
//     style={{
//       /*
//        * Source: https://stackoverflow.com/a/30810322
//        *
//        * *** This styling is an extra step which is likely not required. ***
//        *
//        * Why is it here? To ensure:
//        * 1. the element is able to have focus and selection.
//        * 2. if element was to flash render it has minimal visual impact.
//        * 3. less flakyness with selection and copying which **might** occur if
//        * the textarea element is not visible.
//        *
//        * The likelihood is the element won't even render, not even a flash, so some
//        * of these are just precautions. However in Internet Explorer the element is
//        * visible whilst the popup box asking the user for permission for the web
//        * page to copy to the clipboard.
//        *
//        */

//       // Place in top-left corner of screen regardless of scroll position.
//       position: 'fixed',
//       top: 0,
//       left: 0,

//       // Ensure it has a small width and height. Setting to 1px / 1em
//       // doesn't work as this gives a negative w/h on some browsers.
//       width: '2em',
//       height: '2em',

//       // We don't need padding, reducing the size if it does flash render.
//       padding: 0,

//       // Clean up any borders.
//       border: 'none',
//       outline: 'none',
//       boxShadow: 'none',

//       // Avoid flash of white box if rendered for any reason.
//       background: 'transparent',
//     }}
//   />
// ))

/**
 * The ClipboardCopy component takes artbitrary text as propsa and renders a
 * Copy Icon from the Material UI icon library. When the icon is clicked, the
 * provided text is copied to the user's clipboard.
 */
class ClipboardCopy extends React.Component {
  static propTypes = {
    /**
     * The text to copy to the clipboard.
     */
    text: string.isRequired,
    /**
     * Optional success message to display to the user in a toast popup (uses withNotifyContext)
     */
    successMessage: string,
    /**
     * Optional error message to display to the user in a toast popup (uses withNotifyContext)
     */
    errorMessage: string,
    notify: func,
    notifyError: func,
    notifyClose: func,
  }

  static defaultProps = {
    successMessage: 'Copied to clipboard',
    errorMessage: 'Unable to clopy to clipboard',
  }

  handleClick = () => {
    write(this.props.text)
      .then(() => {
        this.props.notify(this.props.successMessage)
        this.props.notifyClose(1500)
      })
      .catch(() => {
        this.props.notifyError(this.props.errorMessage)
        this.props.notifyClose(1500)
      })
  }

  render() {
    return (
      <React.Fragment>
        <CopyIcon onClick={this.handleClick} />
      </React.Fragment>
    )
  }
}

export default withNotifyContext(ClipboardCopy)
