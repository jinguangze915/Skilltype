import colors from './colors'

export default {
  /* layout */
  mobileWidth: '600px',
  wideModalWidth: '780px',
  desktopWidth: '1024px',
  maxPageWidth: '1024px',
  maxContentWidth: '550px',
  padding: '15px',
  cardWidth: '244px',
  profileCardWidth: '200px',

  /* fonts */
  primaryFont: "'-apple-system', 'Helvetica', sans-serif",
  fontSizeNormal: '14px',
  fontSizeS: '12px',
  fontSizeM: '14px',
  fontSizeL: '16px',
  fontSizeXL: '24px',
  fontSizeXXL: '32px',
  fontSizeXXXL: '36px',
  fontSizeMobileInput: '16px',

  /* colors */
  ...colors,
  bgColorDark: colors.purple,
  bgColorLight: colors.lightGrey,
  textColorDark: colors.purple,
  textColorLight: colors.white,
  textColorDarkSecondary: colors.darkGrey,
  focusOutlineColor: colors.purple,
  focusLightOutlineColor: colors.lightPurple,
  tagBackgroundColor: colors.paleYellow,
  tagBackgroundActiveColor: colors.yellow,
  warningCalloutBackgroundColor: colors.calloutYellow,
  infoCalloutBackgroundColor: colors.lightPurple,

  /* transitions */
  transitionSlow: '800ms',
  transitionMedium: '500ms',
  transitionQuick: '300ms',
  transitionSuperQuick: '50ms',
  ease: 'ease-in-out',

  /* boxes */
  borderRadius: '3px',
  focusOutlineWidth: '5px',

  /* inputs */
  labelWidth: '120px',

  /* controls */
  controlHighlight: '#f2f2f2',
  controlHighlightFocus: colors.white,
  controlErrorColor: colors.red,
  controlErrorHighlight: 'rgba(244, 67, 54, 0.1)',
  controlErrorHighlightFocus: 'rgba(244, 67, 54, 0.05)',

  /* fallback */
  fallbackShimmerSpeed: 3,
  fallbackPrimaryColor: colors.lightGrey,
  fallbackSecondaryColor: colors.white,

  /* z-index */
  zIndex: {
    base: 100,
    profileCard: 300,
    fixedHeader: 400,
    modalOverlay: 500,
    modal: 600,
    progress: 700,
  },
}
