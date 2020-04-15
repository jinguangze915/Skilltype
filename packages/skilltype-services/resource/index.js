import { httpGet, httpPostFormData, httpDelete } from '../lib/requestApi'

export const getResource = () => httpGet('/resources')

export const getFeeds = pageNumber =>
  httpGet(`/feed?sort=publicationDate,desc&page=${pageNumber}&size=20`)

export const bulkInsertResource = data =>
  httpPostFormData(`/resources/bulk`, data)

export const getReportedResource = () => httpGet('/reported-resources')

export const removeFromReportList = id =>
  httpDelete(`/reported-resources/${id}`)
