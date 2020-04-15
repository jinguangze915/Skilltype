export function setAuthCookie(value, days = 30) {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
  document.cookie = `skilltype=${value};path=/;expires=${d.toGMTString()}`
}

export function getAuthCookie() {
  const v = document.cookie.match('(^|;) ?skilltype=([^;]*)(;|$)')
  return v ? v[2] : null
}

export function deleteAuthCookie() {
  setAuthCookie('', -1)
}

export async function login({ username, password }) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userName: username,
      password,
    }),
  })
  if (response.status === 200) {
    return response.text()
  }
  if (response.status === 401) {
    return false
  }
  const body = await response.text()
  throw new Error(body)
}

export async function signup({
  firstName,
  lastName,
  email,
  password,
  zipcode,
  inviteCode,
}) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      zipcode,
      inviteCode,
    }),
  })

  if (response.status >= 200 && response.status <= 299) {
    return response.text()
  }

  if (response.status >= 400 && response.status < 500) {
    const body = await response.text()
    throw new Error(body)
  }

  if (response.status >= 500) {
    throw new Error('An error occurred during sign up')
  }

  const body = await response.text()
  throw new Error(body)
}
