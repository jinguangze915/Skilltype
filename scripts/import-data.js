const fs = require('fs')
const path = require('path')
const csv = require('csvtojson')

const dataPaths = {
  // Shared
  products: ['packages/skilltype-data/data/products.json'],
  // User
  affiliations: ['packages/skilltype-data/data/affiliations.json'],
  skills: ['packages/skilltype-data/data/skills.json'],
  // Organization
  memberships: ['packages/skilltype-data/data/memeberships.json'],
  teams: ['packages/skilltype-data/data/teams.json'],
  strategicDirections: [
    'packages/skilltype-data/data/strategicDirections.json',
  ],
}

const args = process.argv.slice(2)
if (args.length !== 2) {
  console.error(
    'Please provide arguments: import-data.js (affiliations|skills|products) path-to-csv'
  )
}
const dataType = args[0]
const csvPath = args[1]
const writeDestinations = dataPaths[dataType]

if (!writeDestinations.length) {
  console.error(
    `Data type: ${dataType} does not have any JSON files to update in import-data.js.`
  )
}
csv({ includeColumns: /^(display|unique)/i })
  .fromFile(csvPath)
  .on('done', error => {
    if (error) console.error(error)
    console.log(`Successfully updated \n${writeDestinations.join('\n')}`)
  })
  .then(data => {
    const json = data.map(val => ({
      Title: val.Display,
      Id: val['Unique ID'],
    }))
    writeDestinations.forEach(filePath => {
      fs.writeFileSync(
        path.relative('', path.resolve(filePath)),
        JSON.stringify(json, null, 2)
      )
    })
  })
