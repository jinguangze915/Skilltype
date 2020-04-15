import React from 'react'
import { bool, string, func, element, oneOfType } from 'prop-types'
import classnames from 'classnames'
import ReactModal from 'react-modal'
import ScrollLock from 'react-scrolllock'
import injectSheet from 'react-jss'
import PrimaryButton from '../Button/PrimaryButton'
import PrimaryTextButton from '../Button/PrimaryTextButton'
import SecondaryButton from '../Button/SecondaryButton'
import CloseButton from '../Button/CloseButton'
import SecondaryTextButton from '../Button/SecondaryTextButton'
import {
  getBodyScroll,
  setBodyScroll,
  lockBodyScrollToTop,
  unlockBodyScroll,
  setElementDisplayNone,
  restoreElementDisplay,
} from '../../lib/dom'
import { isMobileOrMobileOs } from '../../lib/mediaQuery'
import styles from './styles'

class Modal extends React.Component {
  static propTypes = {
    /** DOM element id to mount `ReactModal` */
    appElementId: string,
    /** Modal title. Displayed in the header */
    title: oneOfType([string, element]),
    /**
     * Define a custom button component that gets the following props
     *
     * * `onClick={props.onOk}`
     * * `disabled={okIsEnabled}`
     *
     * On mobile, the OKButton will be replaced by `<PrimaryTextButton />`
     *
     */
    OkButton: oneOfType([func]),
    /**
     * Define a custom button component that gets the following props
     *
     * * `onClick={props.onDismiss}`
     * * `disabled={cancelIsEnabled}`
     *
     * On mobile, the CancelButton will be replaced by `<SecondaryButton />`
     *
     */
    CancelButton: oneOfType([func]),
    /** Text for OkButton if `showOkButton` is enabled */
    okButtonLabel: string,
    /** Text for CancelButton if `showCancelButton` is enabled */
    cancelButtonLabel: string,
    /** Controls if `OkButton` is visible */
    showOkButton: bool,
    /** Controls if `CancelButton` is visible */
    showCancelButton: bool,
    // Callbacks
    /**
     * Callback function passed into
     *
     * * `OkButton`
     *
     */
    onOk: func,
    /**
     * Callback function passed into
     *
     * * `CancelButton`
     *
     */
    onCancel: func,
    /**
     * Callback function passed into
     *
     * * `ReactModal`
     * * `CancelButton`
     *
     */
    onDismiss: func,
    /** Controls `OkButton` disabled state */
    okIsEnabled: bool,
    /** Controls `CancelButton` disabled state */
    cancelIsEnabled: bool,
    overlayClassName: string,
    // Flags
    shouldCloseOnEsc: bool,
    hasEditableContent: bool,
    standalone: bool,
    wide: bool,
    fitContent: bool,
    prompt: bool,
    contentHandlesScroll: bool,
    okButtonWide: bool,
  }

  static defaultProps = {
    OkButton: PrimaryButton,
    CancelButton: SecondaryButton,
    okIsEnabled: true,
    cancelIsEnabled: true,
    shouldCloseOnEsc: true,
    hasEditableContent: false,
    standalone: false,
    wide: false,
    fitContent: false,
    prompt: false,
    contentHandlesScroll: false,
    okButtonWide: false,
  }

  state = {
    contentContainerRef: null,
  }

  componentWillMount() {
    if (this.props.appElementId && !this.props.standalone) {
      ReactModal.setAppElement(`#${this.props.appElementId}`)
    }
    if (this.shouldHideParent()) {
      this.bodyScrollPos = getBodyScroll()
      this.parentDisplay = setElementDisplayNone(`#${this.props.appElementId}`)
    }
    if (this.props.lockBodyScroll) {
      lockBodyScrollToTop()
    }
    this.viewportHeight = window.innerHeight
  }
  componentWillUnmount() {
    if (this.shouldHideParent()) {
      setBodyScroll(this.bodyScrollPos)
      restoreElementDisplay(`#${this.props.appElementId}`, this.parentDisplay)
    }
    if (this.props.lockBodyScroll) {
      unlockBodyScroll()
    }
    if (this.focusTrap) {
      this.focusTrap.deactivate()
    }
  }

  onContentContainerRef = ref => {
    if (this.props.contentContainerRef && ref) {
      this.props.contentContainerRef(ref)
    }
    if (!this.state.contentContainerRef) {
      this.setState({ contentContainerRef: ref })
    }
  }
  isMobileOrMobileOs = isMobileOrMobileOs()
  shouldHideParent = () =>
    !this.props.standalone && (this.props.fullscreen || this.isMobileEditable())
  isMobileEditable = () =>
    this.isMobileOrMobileOs && this.props.hasEditableContent
  render() {
    const {
      className,
      overlayClassName,
      children,
      showCancelButton,
      showOkButton,
      okButtonLabel,
      cancelButtonLabel,
      showCloseButton,
      title,
      onOk,
      onCancel,
      onDismiss,
      okButtonWide,
      shouldCloseOnEsc,
      hasEditableContent,
      okIsEnabled,
      cancelIsEnabled,
      classes,
      standalone,
      wide,
      fitContent,
      prompt,
      contentHandlesScroll,
      modalProps,
      OkButton,
      CancelButton,
    } = this.props
    const Tag = standalone ? 'div' : ReactModal
    const modalPropsCombined = {
      isOpen: true,
      overlayClassName: classnames([overlayClassName, classes.overlay]),
      onRequestClose: onDismiss,
      shouldCloseOnEsc: shouldCloseOnEsc && cancelIsEnabled,
      shouldCloseOnOverlayClick: false,
      ...modalProps,
    }
    return (
      <Tag
        className={classnames(className, classes.modal, {
          [classes.wide]: wide,
          [classes.fitContent]: fitContent,
          [classes.prompt]: prompt,
          [classes.editable]: hasEditableContent,
          [classes.contentHandlesScroll]: contentHandlesScroll,
        })}
        {...(standalone ? {} : modalPropsCombined)}
      >
        <header className={classes.header}>
          {// only show the close text button to the left of the title
          //   if we're in mobile with editable content
          showCloseButton &&
            this.isMobileEditable() && (
              <SecondaryTextButton
                className={classes.backButton}
                onClick={onCancel || onDismiss}
                disabled={!cancelIsEnabled}
                tabIndex={showCancelButton ? -1 : 0}
              >
                {cancelButtonLabel || 'Cancel'}
              </SecondaryTextButton>
            )}
          <div role="heading" className={classes.title}>
            {title}
          </div>
          {// only show the close button to the right of the title
          //   if we're not in mobile with editable content
          showCloseButton &&
            !this.isMobileEditable() && (
              <CloseButton
                className={classes.closeButton}
                onClick={onDismiss}
                disabled={!cancelIsEnabled}
                tabIndex={showCancelButton ? -1 : 0}
              />
            )}
          {// only show the ok text button to the right of the title
          //  if we're in mobile with editable content
          showOkButton &&
            this.isMobileEditable() && (
              <PrimaryTextButton
                onClick={onOk}
                className={classes.headerPrimaryButton}
                disabled={!okIsEnabled}
              >
                {okButtonLabel || 'Ok'}
              </PrimaryTextButton>
            )}
        </header>
        <main
          className={classnames(classes.content, {
            editable: hasEditableContent,
          })}
          ref={this.onContentContainerRef}
        >
          {children}
        </main>
        <footer className={classes.footer}>
          {showCancelButton && (
            <CancelButton
              onClick={onCancel || onDismiss}
              disabled={!cancelIsEnabled}
            >
              {cancelButtonLabel || 'Cancel'}
            </CancelButton>
          )}
          {showOkButton && (
            <OkButton
              onClick={onOk}
              disabled={!okIsEnabled}
              className={classnames({
                [classes.okButtonWide]: okButtonWide && !showCancelButton,
              })}
            >
              {okButtonLabel || 'Ok'}
            </OkButton>
          )}
        </footer>
        {!this.isMobileOrMobileOs &&
          this.state.contentContainerRef && (
            <ScrollLock touchScrollTarget={this.state.contentContainerRef} />
          )}
      </Tag>
    )
  }
}

export default injectSheet(styles)(Modal)
