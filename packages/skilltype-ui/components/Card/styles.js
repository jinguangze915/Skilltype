import { macros, theme as defaultTheme } from '../../shared-styles'

export default (theme = defaultTheme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: theme.cardWidth,
    position: 'relative',
    borderRadius: theme.borderRadius,
    backgroundColor: theme.white,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    ...macros.boxShadow(theme),

    '&$withHero': {
      alignItems: 'stretch',
      justifyContent: 'flex-start',

      '& $content': {
        padding: '15px 10px',
        textAlign: 'left',
      },

      '& $cardHeading': {
        justifyContent: 'left',
      },
    },
  },
  hero: {
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    height: '130px',
    overflow: 'hidden',
  },
  content: {
    lineHeight: 'normal',
    padding: '20px 30px',
  },
  cardHeading: {
    fontFamily: theme.primaryFont,
    fontSize: theme.fontSizeL,
    color: theme.black,
    marginBottom: '5px',
    display: 'flex',
    justifyContent: 'center',
  },
  cardContent: {
    fontFamily: theme.primaryFont,
    fontSize: theme.fontSizeNormal,
    color: theme.darkGrey,

    '& + $cardContent': {
      marginTop: '5px',
    },
  },
  cardList: {
    display: 'flex',
    flexWrap: 'wrap',

    '& $card, & $cardFallback': {
      margin: '0 20px 20px 0',
    },
  },
  cardFallback: {},
  withHero: {},
})
