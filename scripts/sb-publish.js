const fs = require('fs')

// HACK: replace "Storybook" title
const title = process.argv[2]
const replaceTitle = indexHtmlPath =>
  fs.writeFileSync(
    indexHtmlPath,
    fs
      .readFileSync(indexHtmlPath)
      .toString()
      .replace(/<title>\s*storybook\s*<\/title>/i, `<title>${title}</title>`)
  )
replaceTitle('./build/index.html')
replaceTitle('./build/iframe.html')
