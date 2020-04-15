// Clipboard API wrapper functions
// Used for fallback for older browsers
//
// Documentation: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard

// In the event that the running browser does not suppor the Navigator API, we
// use document.exec('copy')
export const write = async text => {
  if (!text) return

  if (!navigator.clipboard) {
    throw new Error('Browser does not support Clipboard API')
  }

  await navigator.clipboard.writeText(text)
}

export const read = async () => {
  if (!navigator.clipboard) {
    throw new Error('Browser does not support Clipboard API')
  }

  await navigator.clipboard.readText()
}
