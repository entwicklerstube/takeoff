const fs = require('fs')
const path = require('path')

const getOfficialStations = () => new Promise((resolve, reject) => {
  const stationsFolder = path.resolve(__dirname, '../stations')

  fs.readdir(stationsFolder, (err, files = []) => {
    if (err) reject(err)
    resolve(
      files
        .filter(file => !/.DS_Store|_shared/.test(file))
        .filter(file => fs.lstatSync(path.join(stationsFolder, file)).isDirectory())
      )
  })
})

module.exports = { getOfficialStations }
