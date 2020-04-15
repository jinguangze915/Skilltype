import request from './request'
import { getAuthCookie } from './auth'

export const requestApi = (path, options = { headers: {} }, responseIsJson) =>
  request(
    process.env.REACT_APP_API_URL + path,
    {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAuthCookie()}`,
      },
    },
    responseIsJson
  )

export const httpGet = path => requestApi(path)

export const httpPost = (path, body) =>
  requestApi(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })

export const httpPostFormData = (path, body) =>
  requestApi(path, {
    method: 'POST',
    body,
  })

export const httpPut = (path, body) =>
  requestApi(path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })

export const httpPatch = (path, body) =>
  requestApi(path, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })

export const httpDelete = path =>
  requestApi(path, {
    method: 'DELETE',
  })

export default httpGet
