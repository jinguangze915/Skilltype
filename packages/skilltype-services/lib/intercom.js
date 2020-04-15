export function boot({ user, ...options }) {
  window.Intercom('boot', {
    app_id: process.env.REACT_APP_INTERCOM_APPID,
    ...options,
    ...(user
      ? {
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        }
      : {}),
  })
}
export function shutdown() {
  window.Intercom('shutdown')
  boot({})
}

export function show() {
  window.Intercom('show')
}
