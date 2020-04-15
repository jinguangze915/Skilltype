import loremIpsum from 'lorem-ipsum'

const resourceList = [
  {
    resourceType: 'video',
    title: 'Introduction to EBSCO Discovery Service',
    publishedOn: 'Yesterday',
    source: 'youtube.com',
    url: 'https://youtube.com/12345',
  },
  {
    resourceType: 'course',
    title: 'How to measure weeding projects',
    publishedOn: '6 days ago',
    source: 'librarycarpentry.org',
    url: 'https://librarycarpentry.org',
  },
].map(res => {
  res.info = loremIpsum({
    count: 2,
    format: 'text',
    units: 'sentences',
  })
  return res
})

export { resourceList }
