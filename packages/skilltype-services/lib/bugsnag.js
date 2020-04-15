import bugsnag from 'bugsnag-js'

const bugsnagClient = bugsnag({
  apiKey: process.env.REACT_APP_BUGSNAG_KEY,
  beforeSend: report => {
    report.app.releaseStage = process.env.REACT_APP_RELEASE_STAGE
  },
})

export default bugsnagClient
