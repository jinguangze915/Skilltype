export const domainFromUrl = url => {
  const parts = url.split('.')
  return parts.slice(-2).join('.')
}
